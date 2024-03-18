<script lang="ts">
import FullCalendar from "@fullcalendar/vue3"
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
const { token } = useAuth()
const config = useRuntimeConfig()
// const snackbar = useSnackbar()

export default {
    components: {
        FullCalendar
    },
    data () {
        return {
            calendarApi: null,
            eventsList: [],
            event: {
                title: "",
                event_type: null,
                repetition_type: null,
                with_pay: false,
                with_work: false,
                start_date: null,
                end_date: null,
                description: ""
            },
            newEvent: {
                title: "",
                eventType: "",
                description: "",
            },
            errorMessage: "",
            successMessage: "",
            isLoading: false
        }
    },

    computed: {
        calendarOptions () {
            return {
                plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth",
                },
                initialView: "dayGridMonth",
                weekends: true,
                nowIndicator: true,
                editable: true,
                selectable: true,
                events: [],
                dateClick: (info) => {
                    this.event.start_date = info.dateStr
                    this.event.end_date = info.dateStr
                },
                select: (info) => {
                    this.event.start_date = info.startStr
                    this.event.end_date = info.endStr
                },

            }
        }
    },
    watch: {
        "successMessage" () {
            this.$snackbar.add({
                type: "success",
                text: this.successMessage
            })
        },
        "errorMessage" () {
            this.$snackbar.add({
                type: "success",
                text: this.errorMessage
            })
        },
    },
    mounted () {
        this.calendarApi = this.$refs.fCalendar.getApi()
        this.getEventsList()
    },
    methods: {
        async getEventsList () {
            const { data, error } = await useFetch(
                "/api/events",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    onResponse: ({ response }) => {
                        this.eventsList = response._data.data.data
                        this.loadEvents(this.eventsList)
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async createEvent () {
            this.isLoading = true
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/events",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.event,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getEventsList()
                            this.clearForm()
                            this.clearForm()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        loadEvents (events:any) {
            events.forEach((ev:any) => {
                this.addEvent(ev)
            })
        },
        addEvent (event) {
            const newEvent = {
                title: event.title,
                start: event.start_date,
                end: event.end_date
            }
            this.calendarApi.addEvent(newEvent)
            // this.calendarOptions.events.push(newEvent)
        },
        clearForm () {
            this.event = {
                title: "",
                event_type: null,
                repetition_type: null,
                with_pay: false,
                with_work: false,
                start_date: null,
                end_date: null,
                description: ""
            }
        },
        deleteEvent (info) {
            const index = this.calendarOptions.initialEvents.findIndex(event => event.title === info.event.title)
            if (index !== -1) {
                this.calendarOptions.initialEvents.splice(index, 1)
            }
        },
        eventClick (info) {
            const newTitle = prompt("Enter a new title for the event:", info.event.title)
            if (newTitle) {
                info.event.setProp("title", newTitle)
            }
        },
    },
}
</script>

<template>
    <div class="mt-10 md:mt-0 md:flex gap-2 ">
        <LayoutBoards title="Add New Event" :loading="isLoading" class="w-1/3">
            <form action="" class="space-y-2 mt-4" @submit.prevent="createEvent">
                <div>
                    <label for="eventTitle">Event Title</label>
                    <input id="eventTitle" v-model="event.title" type="text" class="w-full rounded" required>
                </div>

                <div>
                    <label for="eventTypr">Event Type</label>
                    <select id="" v-model="event.event_type" name="" class="w-full rounded" required>
                        <option value="Holiday">
                            Holiday
                        </option>
                        <option value="Company Event">
                            Company Event
                        </option>
                    </select>
                </div>

                <div>
                    <label for="repetition_type">Repetition Type</label>
                    <select id="" v-model="event.repetition_type" name="" class="w-full rounded" required>
                        <option value="One Day">
                            One Day
                        </option>
                        <option value="Long Event">
                            Long Event
                        </option>
                        <option value="Yearly Repeat">
                            Yearly Repeat
                        </option>
                    </select>
                </div>

                <div class="flex gap-4 rounded-lg p-4 bg-slate-50">
                    <div class="flex gap-2 items-center">
                        <input id="" v-model="event.with_pay" type="checkbox" name="">
                        <label for="repetition_type" class="text-sm">With Pay</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input v-model="event.with_work" type="checkbox" name="">
                        <label for="repetition_type" class="text-sm">With Work</label>
                    </div>
                </div>

                <div>
                    <label for="start_date">Start Date</label>
                    <input id="startDate" v-model="event.start_date" type="date" class="w-full rounded" disabled="true">
                </div>

                <div>
                    <label for="end_date">End Date</label>
                    <input id="endDate" v-model="event.end_date" type="date" class="w-full rounded" disabled>
                </div>

                <div>
                    <label for="description">Description</label>
                    <textarea id="eventTitle" v-model="event.description" type="text" class="w-full rounded" placeholder="What are your thoughts?" />
                </div>

                <div class="flex justify-end">
                    <button class="flex-1 text-white p-2 rounded bg-cyan-800 content-center">
                        <Icon name="material-symbols-light:event" class="mr-2" />Save Event
                    </button>
                </div>
            </form>
        </LayoutBoards>

        <div class="p-2 bg-white border shadow-md rounded-lg w-full md:w-3/4 mb-5">
            <FullCalendar ref="fCalendar" :options="calendarOptions" class="mt-10" />
        </div>
    </div>
</template>
