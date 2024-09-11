<script setup>
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"

const attendancePortal = useAttendancePortal()
attendancePortal.getSearchAttedanceLog()

const { attendanceLogs } = storeToRefs(attendancePortal)
const headers = [
    { name: "Employee Name", id: "employee.fullname_first" },
    { name: "Assigment Designation", id: "assignment" },
    { name: "Date", id: "date" },
    { name: "Time", id: "time_human" },
    { name: "Description", id: "log_type" },
]
const changePaginate = (newParams) => {
    attendanceLogs.value.params.page = newParams.page ?? ""
}
const setEmployee = (emp) => {
    attendanceLogs.value.params.employee_id = emp.id
}
const clearFilter = () => {
    attendanceLogs.value.params.date = null
    attendanceLogs.value.params.employee_id = null
}
const grouptype = ref(null)
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_attendance_logs,
        ])"
    >
        <div class="w-full bg-white p-2">
            <p class="w-full p-4 text-xl text-gray-500">
                ATTENDANCE LOG INFORMATION
            </p>
            <div class="w-full flex flex-col md:flex-row gap-2 md:justify-between p-2">
                <SearchBar class="w-full" @search-changed="setEmployee" />
                <div class="w-full">
                    <input v-model="attendanceLogs.params.date" type="date" class="w-full rounded py-2">
                </div>
                <div class="w-full">
                    <HrmsCommonAttendanceTypeSelector
                        v-model:attendance-type="attendanceLogs.params.attendance_type"
                    />
                </div>
                <div class="w-full">
                    <button class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="clearFilter">
                        Clear Filter
                    </button>
                </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
                <HrmsCommonDepartmentProjectSelector
                    v-model:select-type="grouptype"
                    v-model:department-id="attendanceLogs.params.department_id"
                    v-model:project-id="attendanceLogs.params.project_id"
                    title="Filter Department/Project"
                />
            </div>
            <div class="w-full px-2">
                <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="attendanceLogs.list"
                />
                <div class="flex justify-center mx-auto">
                    <CustomPagination
                        v-if="attendanceLogs.list.length"
                        :links="attendanceLogs.pagination"
                        @change-params="changePaginate"
                    />
                </div>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
