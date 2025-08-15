<script setup>
import * as JSGantt from "jsgantt-improved"
import "jsgantt-improved/dist/jsgantt.css"

const taskModalShow = ref(false)
const schedModalShow = ref(false)
const currentItemId = ref(null)
const editSched = ref(false)

onMounted(() => {
    const g = new JSGantt.GanttChart(
        document.getElementById("GanttChartDIV"),
        "day"
    )

    g.setMinDate(new Date(2025, 7, 1))
    g.setMaxDate(new Date(2025, 8, 30))

    window.setSchedule = (pID) => {
        currentItemId.value = pID
        schedModalShow.value = true
    }
    window.editSchedule = (pID) => {
        taskModalShow.value = true
        currentItemId.value = pID
        editSched.value = true
    }
    // g.AddTaskItemObject(useGanttData().gantt[0])
    // useGanttData().gantt.forEach((task) => {
    //     task.action = `<span onClick="addTask(${task.pID})" class="text-green-500 cursor-pointer hover:underline">+ Add</span>`

    //     g.AddTaskItemObject(task)
    // })
    const dummyData = ref([
        // Part A
        { pID: 1, pName: "Part A", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 1, pParent: 0, pOpen: 1, pType: "part" },
        { pID: 2, pName: "Item 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 1, pParent: 1, pOpen: 1, pType: "item" },
        { pID: 3, pName: "Task 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 0, pParent: 2, pOpen: 1, pType: "task" },
        { pID: 4, pName: "Task 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 0, pParent: 2, pOpen: 1, pType: "task" },
        { pID: 5, pName: "Task 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 0, pParent: 2, pOpen: 1, pType: "task" },
        { pID: 6, pName: "Item 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 1, pParent: 1, pOpen: 1, pType: "item" },
        { pID: 7, pName: "Task 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 0, pParent: 6, pOpen: 1, pType: "task" },
        { pID: 8, pName: "Task 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 0, pParent: 6, pOpen: 1, pType: "task" },
        { pID: 9, pName: "Task 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 0, pParent: 6, pOpen: 1, pType: "task" },
        { pID: 10, pName: "Item 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 1, pParent: 1, pOpen: 1, pType: "item" },
        { pID: 11, pName: "Task 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 0, pParent: 10, pOpen: 1, pType: "task" },
        { pID: 12, pName: "Task 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 0, pParent: 10, pOpen: 1, pType: "task" },
        { pID: 13, pName: "Task 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "John", pComp: 0, pGroup: 0, pParent: 10, pOpen: 1, pType: "task" },

        // Part B
        { pID: 14, pName: "Part B", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 1, pParent: 0, pOpen: 1, pType: "part" },
        { pID: 15, pName: "Item 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 1, pParent: 14, pOpen: 1, pType: "item" },
        { pID: 16, pName: "Task 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 0, pParent: 15, pOpen: 1, pType: "task" },
        { pID: 17, pName: "Task 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 0, pParent: 15, pOpen: 1, pType: "task" },
        { pID: 18, pName: "Task 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 0, pParent: 15, pOpen: 1, pType: "task" },
        { pID: 19, pName: "Item 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 1, pParent: 14, pOpen: 1, pType: "item" },
        { pID: 20, pName: "Task 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 0, pParent: 19, pOpen: 1, pType: "task" },
        { pID: 21, pName: "Task 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 0, pParent: 19, pOpen: 1, pType: "task" },
        { pID: 22, pName: "Task 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 0, pParent: 19, pOpen: 1, pType: "task" },
        { pID: 23, pName: "Item 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 1, pParent: 14, pOpen: 1, pType: "item" },
        { pID: 24, pName: "Task 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 0, pParent: 23, pOpen: 1, pType: "task" },
        { pID: 25, pName: "Task 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 0, pParent: 23, pOpen: 1, pType: "task" },
        { pID: 26, pName: "Task 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Anna", pComp: 0, pGroup: 0, pParent: 23, pOpen: 1, pType: "task" },

        // Part C
        { pID: 27, pName: "Part C", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 1, pParent: 0, pOpen: 1, pType: "part" },
        { pID: 28, pName: "Item 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 1, pParent: 27, pOpen: 1, pType: "item" },
        { pID: 29, pName: "Task 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 0, pParent: 28, pOpen: 1, pType: "task" },
        { pID: 30, pName: "Task 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 0, pParent: 28, pOpen: 1, pType: "task" },
        { pID: 31, pName: "Task 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 0, pParent: 28, pOpen: 1, pType: "task" },
        { pID: 32, pName: "Item 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 1, pParent: 27, pOpen: 1, pType: "item" },
        { pID: 33, pName: "Task 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 0, pParent: 32, pOpen: 1, pType: "task" },
        { pID: 34, pName: "Task 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 0, pParent: 32, pOpen: 1, pType: "task" },
        { pID: 35, pName: "Task 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 0, pParent: 32, pOpen: 1, pType: "task" },
        { pID: 36, pName: "Item 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 1, pParent: 27, pOpen: 1, pType: "item" },
        { pID: 37, pName: "Task 1", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 0, pParent: 36, pOpen: 1, pType: "task" },
        { pID: 38, pName: "Task 2", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 0, pParent: 36, pOpen: 1, pType: "task" },
        { pID: 39, pName: "Task 3", pClass: "gtaskblue", pLink: "", pMile: 0, pRes: "Mark", pComp: 0, pGroup: 0, pParent: 36, pOpen: 1, pType: "task" }
    ])

    dummyData.value.forEach((task) => {
        if (task.pType === "item") {
            task.pName += `<span onclick="setSchedule(${task.pID})" class="bg-green-500 text-white text-xs w-full text-right rounded ml-6 cursor-pointer hover:bg-green-600 !p-1">Set Schedule</span>`
        }
        if (task.pType === "task") {
            task.pName += `<span onclick="editSchedule(${task.pID})" class="bg-white text-red-600 border border-red-600 text-xs w-full text-right rounded ml-6 cursor-pointer hover:bg-red-600 hover:text-white !p-2">Edit</span>`
        }
        g.AddTaskItemObject(task)
    })

    g.Draw()
})
const addTask = () => {
    taskModalShow.value = true
    editSched.value = false
}
</script>

<template>
    <div class="mb-6 bg-white p-6">
        <div class="flex justify-between items-center mb-8">
            <div class="flex items-center flex-1 gap-8">
                <h1 class="text-2xl font-bold text-left">
                    Timeline Planner
                </h1>
                <ProjectMonitoringSharedProjectSelectSearch />
            </div>
            <button
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                @click="addTask"
            >
                + Create Task
            </button>
        </div>
        <div id="GanttChartDIV" />
        <ProjectMonitoringModalsWorkScheduleTaskCreate :show-modal="taskModalShow" :title="editSched ? 'Edit Task' : 'Create Task'" :is-edit="editSched" @hide-modal="taskModalShow = false" />
        <ProjectMonitoringModalsWorkScheduleCreate :show-modal="schedModalShow" @hide-modal="schedModalShow = false" />
    </div>
</template>
