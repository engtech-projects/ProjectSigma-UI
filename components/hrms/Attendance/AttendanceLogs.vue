<script setup>
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"

const attendancePortal = useAttendancePortal()
attendancePortal.getSearchAttedanceLog()

const { attendanceLogList, pagination, getParams } = storeToRefs(attendancePortal)
const headers = [
    { name: "Employee Name", id: "employee.fullname_first" },
    { name: "Date", id: "date" },
    { name: "Time", id: "time" },
    { name: "Description", id: "attendance_type" },
]
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
const setEmployee = (emp) => {
    getParams.value.employee_id = emp.id
}
const clearFilter = () => {
    getParams.value.date = null
    getParams.value.employee_id = null
}
</script>
<template>
    <div class="w-full bg-white p-2">
        <p class="text-3xl">
            Attendance Log information
        </p>
        <div class="w-full md:flex gap-2 md:justify-between p-4">
            <SearchBar class="w-full" @search-changed="setEmployee" />
            <div class="w-full">
                <input v-model="getParams.date" type="date" class="w-full rounded py-2">
            </div>
            <div class="w-full">
                <button class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="clearFilter">
                    Clear Filter
                </button>
            </div>
        </div>
        <div class="w-full p-4">
            <p class="w-full py-4 text-xl text-gray-500">
                ATTENDANCE LOG INFORMATION
            </p>
            <LayoutPsTable
                id="listTable"
                :header-columns="headers"
                :datas="attendanceLogList"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination
                    v-if="attendanceLogList.length"
                    :links="pagination"
                    @change-params="changePaginate"
                />
            </div>
        </div>
    </div>
</template>
