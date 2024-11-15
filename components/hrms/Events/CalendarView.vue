<script lang="ts">
import FullCalendar from "@fullcalendar/vue3"
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
// const snackbar = useSnackbar()

export default {
    components: {
        FullCalendar
    },
    data () {
        return {
            showModal: false,
            calendarApi: null,
            eventsList: [],
            selectedEventId: null,
            toEditEvent: {},
            isEdit: false,
            event: {
                title: "",
                event_type: null,
                repetition_type: null,
                with_pay: false,
                with_work: false,
                start_date: null,
                end_date: null,
                description: "",
                attendance_date: null,
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
                    // right: "dayGridMonth",
                },
                initialView: "dayGridMonth",
                weekends: true,
                dayGridMonth: true,
                nowIndicator: true,
                editable: true,
                selectable: true,
                events: [],
                eventClick: (info) => {
                    this.selectedEventId = info.event.id
                    this.showModal = true
                },
                dateClick: (info) => {
                    this.event.start_date = info.dateStr
                    this.event.end_date = info.dateStr
                },
                select: (info) => {
                    this.event.start_date = info.startStr
                    this.event.end_date = info.endStr
                },

            }
        },
        selectEvent () {
            let event = {}
            if (this.selectedEventId) {
                this.eventsList.forEach((el) => {
                    if (parseInt(el.id) === parseInt(this.selectedEventId)) {
                        if (el.with_work) {
                            el.with_work = true
                        } else {
                            el.with_work = false
                        }
                        if (el.with_pay) {
                            el.with_pay = true
                        } else {
                            el.with_pay = false
                        }
                        event = el
                    }
                })
            }
            return event
        }
    },
    watch: {
        "successMessage" () {
            if (this.successMessage) {
                this.$snackbar.add({
                    type: "success",
                    text: this.successMessage
                })
            }
        },
        "errorMessage" () {
            if (this.errorMessage) {
                this.$snackbar.add({
                    type: "success",
                    text: this.errorMessage
                })
            }
        },
    },
    mounted () {
        this.calendarApi = this.$refs.fCalendar.getApi()
        this.getEventsList()
    },
    methods: {
        setEdit () {
            this.toEditEvent = JSON.parse(JSON.stringify(this.selectEvent))
            this.isEdit = true
        },
        async getEventsList () {
            await useHRMSApi(
                "/api/events",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.eventsList = response._data.data.data
                            this.loadEvents(this.eventsList)
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async createEvent () {
            this.isLoading = true
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                "/api/events",
                {
                    method: "POST",
                    body: this.event,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.clearForm()
                            this.getEventsList()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async editEvent () {
            this.isLoading = true
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/events/" + this.toEditEvent.id,
                {
                    method: "PUT",
                    body: this.toEditEvent,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.successMessage = response._data.message
                            this.clearForm()
                            this.getEventsList()
                            this.isEdit = false
                            this.showModal = false
                        }
                    },
                }
            )
        },
        async deleteEvent () {
            this.isLoading = true
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/events/" + this.selectedEventId,
                {
                    method: "DELETE",
                    body: this.toEditEvent,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.successMessage = response._data.message
                            this.getEventsList()
                            this.isEdit = false
                            this.showModal = false
                        }
                    },
                }
            )
        },
        removeEvents () {
            this.calendarApi.getEvents().forEach((event: { remove: () => any }) => event.remove()) // Remove all event sources
        },
        loadEvents (events:any) {
            this.removeEvents()
            events.forEach((ev:any) => {
                this.addEvent(ev)
            })
        },
        addEvent (event) {
            const newEvent = {
                id: event.id,
                title: event.title,
                start: event.start_date,
                end: event.end_date
            }
            this.calendarApi.addEvent(newEvent)
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
                description: "",
                attendance_date: null,
            }
        },
        removeEvent (info) {
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
        <LayoutBoards title="Add New Event" :loading="isLoading" class="w-full md:w-1/3">
            <form action="" class="space-y-2 mt-4 p-2" @submit.prevent="createEvent">
                <div>
                    <label for="eventTitle">Event Title</label>
                    <input id="eventTitle" v-model="event.title" type="text" class="w-full rounded" required>
                </div>

                <div>
                    <label for="eventTypr">Event Type</label>
                    <select id="" v-model="event.event_type" name="" class="w-full rounded" required>
                        <option value="Company Event">
                            Company Event
                        </option>
                        <option value="Special Holiday">
                            Special Holiday
                        </option>
                        <option value="Regular Holiday">
                            Regular Holiday
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
                        <!-- <option value="Yearly Repeat">
                            Yearly Repeat
                        </option> -->
                    </select>
                </div>

                <div class="flex flex-col rounded-lg p-4 bg-slate-50">
                    <div class="flex gap-2 items-center">
                        <input id="" v-model="event.with_pay" type="checkbox" name="">
                        <label for="repetition_type" class="text-sm">With Pay</label>
                    </div>
                    <br>
                    <div class="flex gap-2 items-center">
                        <input v-model="event.with_work" type="checkbox" name="">
                        <label for="repetition_type" class="text-sm">With Work</label>
                    </div>
                    <small class="text-red-600 text-xs">
                        *FOR REGULAR EMPLOYEES ONLY.<br>
                        NON-REGULAR EMPLOYEES ARE DEFAULT TO "WITH WORK"
                    </small>
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
                    <textarea id="eventTitle" v-model="event.description" type="text" class="w-full rounded" placeholder="Event Description" />
                </div>

                <div>
                    <span v-if="event.event_type === 'Regular Holiday'" class="text-red-600">*</span>
                    <label for="start_date">Attendance Date</label>
                    <small class="text-red-600 text-xs">*FOR REGULAR HOLIDAY - NON-REGULAR EMPLOYEES ONLY</small>
                    <input id="startDate" v-model="event.start_date" type="date" class="w-full rounded" :required="event.event_type === 'Regular Holiday'">
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
        <ModalContainer title="Event Details" :loading="isLoading" :local="true" :show="showModal" @hide="showModal=false">
            <div class="flex flex-col gap-4 w-full">
                <div class="flex flex-col gap">
                    <label for="" class="text-sm text-slate-600 px-2">
                        Event Title
                    </label>
                    <span v-if="!isEdit" class="px-2 py-1 rounded-sm bg-slate-200 text-xl">
                        {{ selectEvent.title }}
                    </span>
                    <input
                        v-else
                        id="eventTitle"
                        v-model="toEditEvent.title"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required=""
                    >
                </div>
                <div class="flex gap-4">
                    <div class="flex flex-col gap-1 flex-1">
                        <label for="" class="text-sm text-slate-600 px-2">
                            Start Date
                        </label>
                        <span v-if="!isEdit" class="px-2 py-1 rounded-sm bg-slate-200 text-xl">
                            {{ selectEvent.start_date }}
                        </span>
                        <input
                            v-else
                            id="startDate"
                            v-model="toEditEvent.start_date"
                            type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required=""
                        >
                    </div>
                    <div class="flex flex-col gap-1 flex-1">
                        <label for="" class="text-sm text-slate-600 px-2">
                            End Date
                        </label>
                        <span v-if="!isEdit" class="px-2 py-1 rounded-sm bg-slate-200 text-xl">
                            {{ selectEvent.end_date }}
                        </span>
                        <input
                            v-else
                            id="endDate"
                            v-model="toEditEvent.end_date"
                            type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required=""
                        >
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex flex-col gap-1 flex-1">
                        <label for="" class="text-sm text-slate-600 px-2">
                            Event Type
                        </label>
                        <span v-if="!isEdit" class="px-2 py-1 rounded-sm bg-slate-200 text-xl">
                            {{ selectEvent.event_type }}
                        </span>
                        <select
                            v-else
                            id="eventType"
                            v-model="toEditEvent.event_type"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="Company Event">
                                Company Event
                            </option>
                            <option value="Special Holiday">
                                Special Holiday
                            </option>
                            <option value="Regular Holiday">
                                Regular Holiday
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-1 flex-1">
                        <label for="" class="text-sm text-slate-600 px-2">
                            Repition Type
                        </label>
                        <span v-if="!isEdit" class="px-2 py-1 rounded-sm bg-slate-200 text-xl">
                            {{ selectEvent.repetition_type }}
                        </span>
                        <select
                            v-else
                            id="repititionType"
                            v-model="toEditEvent.repetition_type"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="One Day">
                                One Day
                            </option>
                            <option value="Long Event">
                                Long Event
                            </option>
                            <!-- <option value="Yearly Repeat">
                                Yearly Repeat
                            </option> -->
                        </select>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex flex-col gap-1 flex-1">
                        <label for="" class="text-sm text-slate-600 px-2">
                            With Work
                        </label>
                        <span v-if="!isEdit" class="px-2 py-1 rounded-sm bg-slate-200 text-xl">
                            {{ selectEvent.with_work? "Yes" : "No" }}
                        </span>
                        <template v-else>
                            <input
                                id="withWork"
                                v-model="toEditEvent.with_work"
                                type="checkbox"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                            <small class="text-red-600 text-xs">
                                *FOR REGULAR EMPLOYEES ONLY.<br>
                                NON-REGULAR EMPLOYEES ARE DEFAULT TO "WITH WORK"
                            </small>
                        </template>
                    </div>
                    <div class="flex flex-col gap-1 flex-1">
                        <label for="" class="text-sm text-slate-600 px-2">
                            WITH PAY
                        </label>
                        <span v-if="!isEdit" class="px-2 py-1 rounded-sm bg-slate-200 text-xl">
                            {{ selectEvent.with_pay? "Yes" : "No" }}
                        </span>
                        <input
                            v-else
                            id="withPay"
                            v-model="toEditEvent.with_pay"
                            type="checkbox"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex flex-col gap-1 flex-1">
                        <label for="" class="text-sm text-slate-600 px-2">
                            Description
                        </label>
                        <span v-if="!isEdit" class="px-2 py-1 rounded-sm bg-slate-200 text-xl">
                            {{ selectEvent.description }}
                        </span>
                        <textarea
                            v-else
                            id="eventTitle"
                            v-model="toEditEvent.description"
                            type="text"
                            class="w-full rounded"
                            placeholder="Event Description"
                        />
                    </div>
                    <div class="flex flex-col gap-1 flex-1">
                        <label for="" class="text-sm text-slate-600 px-2">
                            <span v-if="toEditEvent.event_type === 'Regular Holiday'" class="text-red-600">*</span>
                            Attendance Date
                            <small class="text-red-600 text-xs">*FOR REGULAR HOLIDAY - NON-REGULAR EMPLOYEES ONLY</small>
                        </label>
                        <span v-if="!isEdit" class="px-2 py-1 rounded-sm bg-slate-200 text-xl">
                            {{ selectEvent.attendance_date ?? "-" }}
                        </span>
                        <input
                            v-else
                            id="endDate"
                            v-model="toEditEvent.attendance_date"
                            type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required=""
                        >
                    </div>
                </div>
                <div v-if="!isEdit" class="flex justify-end gap-2 pt-8">
                    <button type="submit" class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="setEdit">
                        Edit
                    </button>
                    <button type="submit" class="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="deleteEvent">
                        Delete
                    </button>
                </div>
                <div v-else class="flex justify-end gap-2 pt-8">
                    <button type="submit" class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="editEvent">
                        Save
                    </button>
                    <button type="submit" class="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" @click="isEdit=false">
                        Cancel
                    </button>
                </div>
            </div>
        </ModalContainer>
    </div>
</template>
