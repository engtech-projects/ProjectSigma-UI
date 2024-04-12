<script lang="ts" setup>
import { ref, onMounted } from "vue"
import FullCalendar from "@fullcalendar/vue3"
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
// import VueDatePicker from "@vuepic/vue-datepicker"
import { useDepartmentStore } from "~/stores/hrms/setup/departments"
import "@vuepic/vue-datepicker/dist/main.css"
const utils = useUtilities()
const departmentStore = useDepartmentStore()
departmentStore.getDepartment()
const snackbar = useSnackbar()
const { token } = useAuth()
const config = useRuntimeConfig()
const calendarApi = ref(null)
const daysOfWeek = ref([false, false, false, false, false, false, false])
const newEvent = ref({
    id: 1,
    groupType: "department",
    department_id: 1,
    project_id: null,
    employee_id: null,
    scheduleType: "Regular",
    daysOfWeek: [],
    startTime: "",
    endTime: "",
    startRecur: null,
    endRecur: null
})
const events = ref([])
const errorMessage = ref("")
const successMessage = ref("")
const isLoading = ref(false)
const isCalendarLoading = ref(false)
const isEdit = ref(false)
const calendarOptions = ref({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    initialView: "dayGridMonth",
    weekends: true,
    nowIndicator: true,
    editable: true,
    selectable: true,
    dateClick: (info) => {
        // alert("clicked " + info.dateStr)
        newEvent.value.startRecur = info.dateStr
    },
    select: (info) => {
        if (newEvent.value.scheduleType === "Irregular") {
            // newEvent.value.endRecur = info.start.clone().add(1, "day")
        } else {
            newEvent.value.startRecur = info.startStr
            newEvent.value.endRecur = info.endStr
        }

        // alert("selected " + newEvent.startRecur + " to " + newEvent.endRecur)
    },
    eventContent: function (info) {
        const startTimeStr = info.event.start.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
        const endTimeStr = info.event.end.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
        return {
            html: `<div  class="event-container flex flex-col justify-between items-center p-1 event-container bg-blue-600 text-[10px] overflow-hidden text-white rounded-md">
                        ${startTimeStr + " - " + endTimeStr}
                        <div class="flex gap-[5px]">
                            <i class="fa fa-edit text-slate-200 hover:text-white text-[10px] event-edit edit-${info.event.id}" data-event="${info.event.id}"></i>
                            <i class="fa fa-trash text-slate-200 hover:text-white text-[10px] event-trash delete-${info.event.id}" data-event="${info.event.id}"></i>
                        </div>
                    </div>`
        }
    },
})

async function fetchSchedules () {
    isCalendarLoading.value = true
    await useFetch(
        "/api/schedule",
        {
            baseURL: config.public.HRMS_API_URL,
            method: "GET",
            headers: {
                Authorization: token.value + "",
                Accept: "application/json"
            },
            watch: false,
            onResponse: ({ response }) => {
                isCalendarLoading.value = false
                if (response.status !== 200) {
                    errorMessage.value = response._data.message
                } else {
                    events.value = []
                    response._data.data.forEach((ev) => {
                        if (ev.groupType === "department") {
                            ev.daysOfWeek = JSON.parse(ev.daysOfWeek)
                            events.value.push(ev)
                        }
                    })
                    loadEvents()
                }
            },
        }
    )
}
function loadEvents () {
    removeEvents()
    events.value.forEach((ev) => {
        if (ev.department_id.toString() === newEvent.value.department_id.toString()) {
            const event = JSON.parse(JSON.stringify(ev))
            if (ev.scheduleType === "Irregular") {
                event.daysOfWeek = null
            }
            calendarApi.value.addEvent(event)
        }
    })
}
function setEdit (id) {
    daysOfWeek.value = [false, false, false, false, false, false, false]
    const regularTab = document.getElementById("regular-tab")
    const irregularTab = document.getElementById("irregular-tab")
    events.value.forEach((ev) => {
        if (parseInt(ev.id) === parseInt(id)) {
            ev.daysOfWeek.forEach((d) => {
                daysOfWeek.value[d] = true
            })
            if (ev.scheduleType === "Irregular") {
                irregularTab.click()
            } else {
                regularTab.click()
            }
            newEvent.value = ev
            isEdit.value = true
        }
    })
}
async function deleteSchedule (id) {
    await useFetch(
        "/api/schedule/" + id,
        {
            baseURL: config.public.HRMS_API_URL,
            method: "DELETE",
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
                } else {
                    removeEvents()
                    successMessage.value = response._data.message
                    fetchSchedules()
                }
            },
        }
    )
}
function removeEvents () {
    calendarApi.value.getEvents().forEach((event: { remove: () => any }) => event.remove()) // Remove all event sources
}
function resetEvents () {
    isEdit.value = false
    daysOfWeek.value = [false, false, false, false, false, false, false]
    newEvent.value = {
        id: 1,
        groupType: "department",
        department_id: 1,
        project_id: null,
        employee_id: null,
        scheduleType: "Regular",
        daysOfWeek: [],
        startTime: "",
        endTime: "",
        startRecur: null,
        endRecur: null
    }
}
async function handleSubmit () {
    for (const i in daysOfWeek.value) {
        if (daysOfWeek.value[i]) {
            newEvent.value.daysOfWeek.push(i.toString())
        }
    }
    const url = isEdit.value ? "/api/schedule/" + newEvent.value.id : "/api/schedule"
    newEvent.value.startTime = utils.value.formatTime(newEvent.value.startTime)
    newEvent.value.endTime = utils.value.formatTime(newEvent.value.endTime)
    isLoading.value = true
    if (newEvent.value.daysOfWeek.length === 0) {
        newEvent.value.scheduleType = "Irregular"
    } else {
        newEvent.value.scheduleType = "Regular"
    }
    if (newEvent.value.scheduleType === "Irregular") {
        newEvent.value.endRecur = utils.value.addOneDay(newEvent.value.startRecur)
    }
    await useFetch(
        url,
        {
            baseURL: config.public.HRMS_API_URL,
            method: isEdit.value ? "PUT" : "POST",
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
                } else {
                    removeEvents()
                    successMessage.value = response._data.message
                    resetEvents()
                    fetchSchedules()
                }
            },
        }
    )
}
const departmentsList = computed(() => {
    return departmentStore.list
})

const fCalendar = ref()
onMounted(() => {
    calendarApi.value = fCalendar.value.getApi()
    const ffCalendar = document.getElementById("fCalendar")
    ffCalendar.addEventListener("click", (e) => {
        if (e.target.classList.contains("event-edit")) {
            setEdit(e.target.dataset.event)
        }
        if (e.target.classList.contains("event-trash")) {
            deleteSchedule(e.target.dataset.event)
        }
    })
    fetchSchedules()
    departmentStore.getDepartmentList()
})
watch(successMessage, (msg) => {
    if (msg !== "") {
        snackbar.add({
            type: "success",
            text: successMessage.value
        })
        successMessage.value = ""
    }
})
watch(errorMessage, (msg) => {
    if (msg !== "") {
        snackbar.add({
            type: "error",
            text: errorMessage.value
        })
        errorMessage.value = ""
    }
})
</script>

<template>
    <div class="md:flex gap-4">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        </head>
        <div class="w-full md:w-1/2 justify-start border border-teal-100 shadow-md rounded-lg mt-5 relative">
            <div v-if="isLoading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center z-50">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <div class="p-4" :class="isEdit? 'border-t-8 border-green-500 rounded-md' : ''">
                <select id="schedule" v-model="newEvent.department_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required @change="loadEvents">
                    <option value="" disabled selected>
                        -- SELECT --
                    </option>
                    <option v-for="d in departmentsList" :key="d.id" :value="d.id">
                        {{ d.department_name }}
                    </option>
                </select>
            </div>

            <div class="p-4">
                <details class="group p-2 rounded-lg bg-slate-50 " open>
                    <summary
                        class="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-gray-900 bg-teal-100 rounded-sm"
                    >
                        <label for="" class="text-lg font-medium p-2">Set Schedule</label>

                        <div class="text-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="black"
                                class="block h-5 w-5 transition-all duration-300 group-open:rotate-180 m-2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </summary>

                    <div class="pb-2 text-black text-md font-medium border border-slate-100 rounded-b-lg p-3">
                        <form @submit.prevent="handleSubmit">
                            <div>
                                <div class="border-b w-full h-[14px] text-center p-3 mb-4">
                                    <span class="text-sm bg-slate-50 text-black px-10 italic">
                                        Schedule Time
                                    </span>
                                </div>
                            </div>

                            <div class="flex md:flex justify-center mx-auto">
                                <div class="p-2  gap-4 items-center">
                                    <label for="eventTitleIn" class="block text-xs text-center italic">In</label>
                                    <input
                                        id="eventTitleIn"
                                        v-model="newEvent.startTime"
                                        type="time"
                                        step="1"
                                        class="w-36 md:w-32 rounded-lg"
                                        required
                                    >
                                </div>
                                <div class="p-2  gap-4 items-center">
                                    <label for="eventTitleOut" class="block text-xs text-center italic">Out</label>
                                    <input
                                        id="eventTitleOut"
                                        v-model="newEvent.endTime"
                                        type="time"
                                        step="1"
                                        class="w-36 md:w-32 rounded-lg"
                                        required
                                    >
                                </div>
                            </div>

                            <div>
                                <div class="border-b w-full h-[14px] text-center p-3 mt-4 mb-2">
                                    <span class="text-sm bg-gray-50 text-black px-10 italic">
                                        Schedule Type
                                    </span>
                                </div>
                            </div>
                            <div class=" mb-4 dark:border-gray-700">
                                <ul id="default-tab" class="flex flex-wrap justify-center -mb-px text-sm font-medium text-center" data-tabs-toggle="#default-tab-content" role="tablist">
                                    <li class="mr-2" role="presentation">
                                        <button
                                            id="regular-tab"
                                            class="inline-block p-4 border-b-2 rounded-t-lg"
                                            data-tabs-target="#regular"
                                            type="button"
                                            role="tab"
                                            aria-controls="regular"
                                            aria-selected="false"
                                        >
                                            Regular
                                        </button>
                                    </li>
                                    <li class="mr-2" role="presentation">
                                        <button
                                            id="irregular-tab"
                                            class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                            data-tabs-target="#irregular"
                                            type="button"
                                            role="tab"
                                            aria-controls="irregular"
                                            aria-selected="false"
                                        >
                                            Irregular
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div id="default-tab-content">
                                <div id="regular" class=" p-1 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="regular-tab">
                                    <div class="border-b w-full h-[14px] text-center p-3 mb-2">
                                        <span class="text-sm bg-slate-50 text-black px-10 italic">
                                            Days
                                        </span>
                                    </div>

                                    <div class="grid grid-cols-3 gap-y-2 md:flex-1 mx-auto justify-center items-center mt-5 md:gap-4 p-2 rounded-md">
                                        <div class="flex">
                                            <input id="monday" v-model="daysOfWeek[1]" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label for="monday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monday</label>
                                        </div>
                                        <div class="flex">
                                            <input id="tuesday" v-model="daysOfWeek[2]" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label for="tuesday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tuesday</label>
                                        </div>
                                        <div class="flex">
                                            <input id="wednesday" v-model="daysOfWeek[3]" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label for="wednesday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wednesday</label>
                                        </div>
                                        <div class="flex">
                                            <input id="thursday" v-model="daysOfWeek[4]" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label for="thursday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thursday</label>
                                        </div>
                                        <div class="flex">
                                            <input id="friday" v-model="daysOfWeek[5]" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label for="friday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Friday</label>
                                        </div>
                                        <div class="flex">
                                            <input id="saturday" v-model="daysOfWeek[6]" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label for="saturday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saturday</label>
                                        </div>
                                        <div class="flex">
                                            <input id="sunday" v-model="daysOfWeek[0]" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label for="sunday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sunday</label>
                                        </div>
                                    </div>

                                    <div class="border-b w-full h-[14px] text-center p-3 mb-2" />

                                    <div class="flex md:flex justify-center mx-auto">
                                        <div class="p-2  gap-4 items-center">
                                            <label for="dateStart" class="block text-xs text-center italic">Date Start</label>
                                            <input id="dateStart" v-model="newEvent.startRecur" type="date" class="w-36 md:w-32 rounded-lg" required>
                                        </div>
                                        <div class="p-2  gap-4 items-center">
                                            <label for="dateEnd" class="block text-xs italic ml-3">Date End <b class="text-orange-500"> (optional)</b></label>
                                            <input id="dateEnd" v-model="newEvent.endRecur" type="date" class="w-36 md:w-32 rounded-lg">
                                        </div>
                                    </div>
                                </div>

                                <div id="irregular" class=" p-1 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="irregular-tab">
                                    <div class="border-b w-full h-[14px] text-center p-3 mb-5">
                                        <span class="text-sm bg-slate-50 text-black px-10 italic">
                                            Schedule Dates
                                        </span>
                                    </div>

                                    <input id="scheduledDates" v-model="newEvent.startRecur" type="date" class="w-full rounded-lg">
                                    <!-- <VueDatePicker v-model="date" multi-dates multi-dates-limit="3" class="rounded-lg hidden" /> -->
                                </div>
                                <div class="flex justify-end mt-4">
                                    <button v-if="isEdit" type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
                                        Update
                                    </button>
                                    <button v-else type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
                                        Submit
                                    </button>
                                    <button type="reset" class="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded-md" @click="resetEvents">
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </details>
            </div>
        </div>

        <div class="w-full md:w-3/4 justify-start border border-teal-100 shadow-md rounded-lg mt-5">
            <div class="border-t-4 border-teal-400 p-2 rounded-md bg-white relative">
                <div v-if="isCalendarLoading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center z-50">
                    <img
                        class="flex justify-center w-28 rounded-md"
                        src="/loader.gif"
                        alt="logo"
                    >
                </div>
                <FullCalendar id="fCalendar" ref="fCalendar" :options="calendarOptions" class="mt-10 text-xs flex md:flex md:text-sm" />
            </div>
        </div>
    </div>
</template>

<style>
.event-container {
    height: 23px!important;
    transition: all .3s;
}
.event-container:hover {
    height: 39px!important
}
</style>
