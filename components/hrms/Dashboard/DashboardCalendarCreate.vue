<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3"
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
const { token } = useAuth()
const config = useRuntimeConfig()
const snackbar = useSnackbar()
// await getEventsList()
const newEvent = ref({
    title: "",
    event_type: null,
    repetition_type: null,
    with_pay: false,
    with_work: false,
    start_date: null,
    end_date: null,
    description: ""
})
const eventsList = ref([])
const isLoading = ref(false)
const successMessage = ref("")
const errorMessage = ref("")
// const fCalendar = this.$refs.fullCalendar.getApi()
const calendarOptions = computed(() => {
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
        initialEvents: [
            {
                title: "Rizal Day",
                start: "2024-03-03",
                end: "2024-03-10"
            }
        ],
        dateClick: (info) => {
            newEvent.value.start_date = info.dateStr
            newEvent.value.end_date = info.dateStr
        },
        select: (info) => {
            newEvent.value.start_date = info.startStr
            newEvent.value.end_date = info.endStr
        },

    }
})
async function createEvent () {
    isLoading.value = true
    successMessage.value = ""
    errorMessage.value = ""
    await useFetch(
        "/api/events",
        {
            baseURL: config.public.HRMS_API_URL,
            method: "POST",
            headers: {
                Authorization: token.value + "",
                Accept: "application/json"
            },
            body: newEvent.value,
            watch: false,
            onResponse: ({ response }) => {
                isLoading.value = false
                if (response.status !== 200) {
                    errorMessage.value = response._data.message
                    snackbar.add({
                        type: "error",
                        text: errorMessage.value
                    })
                } else {
                    getEventsList()
                    clearForm()
                    successMessage.value = response._data.message
                    snackbar.add({
                        type: "success",
                        text: successMessage.value
                    })
                }
            },
        }
    )
}
async function getEventsList () {
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
                eventsList.value = response._data.data.data
                loadEvents(eventsList.value)
            },
        }
    )
    if (data) {
        return data
    } else if (error) {
        return error
    }
}
function clearForm () {
    newEvent.value = {
        title: "",
        event_type: null,
        repetition_type: null,
        with_pay: false,
        with_work: false,
        start_date: null,
        end_date: null,
        description: ""
    }
}
function loadEvents (events:any) {
    events.forEach((ev:any) => {
        // calendarRef.value.addEvent({
        //     title: ev.title,
        //     start: ev.start_date,
        //     end: ev.end_date
        // })
        calendarOptions.initialEvents.push({
            title: ev.title,
            start: ev.start_date,
            end: ev.end_date
        })
    })
}
onMounted(async () => {
    await getEventsList()
})
</script>

<template>
    <div class="mt-10 md:mt-0 md:flex gap-2 ">
        <LayoutBoards title="Add New Event" :loading="isLoading" class="w-1/3">
            <form action="" class="space-y-2 mt-4" @submit.prevent="createEvent">
                <div>
                    <label for="eventTitle">Event Title</label>
                    <input id="eventTitle" v-model="newEvent.title" type="text" class="w-full rounded" required>
                </div>

                <div>
                    <label for="eventTypr">Event Type</label>
                    <select id="" v-model="newEvent.event_type" name="" class="w-full rounded" required>
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
                    <select id="" v-model="newEvent.repetition_type" name="" class="w-full rounded" required>
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
                        <input id="" v-model="newEvent.with_pay" type="checkbox" name="">
                        <label for="repetition_type" class="text-sm">With Pay</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input v-model="newEvent.with_work" type="checkbox" name="">
                        <label for="repetition_type" class="text-sm">With Work</label>
                    </div>
                </div>

                <div>
                    <label for="start_date">Start Date</label>
                    <input id="startDate" v-model="newEvent.start_date" type="date" class="w-full rounded" disabled="true">
                </div>

                <div>
                    <label for="end_date">End Date</label>
                    <input id="endDate" v-model="newEvent.end_date" type="date" class="w-full rounded" disabled>
                </div>

                <div>
                    <label for="description">Description</label>
                    <textarea id="eventTitle" v-model="newEvent.description" type="text" class="w-full rounded" placeholder="What are your thoughts?" />
                </div>

                <div class="flex justify-end">
                    <button class="flex-1 text-white p-2 rounded bg-cyan-800 content-center">
                        <Icon name="material-symbols-light:event" class="mr-2" />Save Event
                    </button>
                </div>
            </form>
        </LayoutBoards>

        <div class="p-2 bg-white border shadow-md rounded-lg w-full md:w-3/4 mb-5">
            <FullCalendar ref="fcalendar" :options="calendarOptions" class="mt-10" />
        </div>
    </div>
</template>
