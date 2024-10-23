<script setup>
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"
const snackbar = useSnackbar()
const boardLoading = ref(false)
const listLoader = ref(false)
const attendancePortal = useAttendancePortal()
await attendancePortal.getAttendancePortal()
const { attendancePortalParams, attendancePortalList, attendancePortalPagination } = storeToRefs(attendancePortal)
const headers = [
    { name: "NAME", id: "name_location" },
    { name: "PROJECT / DEPARTMENT", id: "name" },
    { name: "TYPE", id: "type" },
]
const cookieExpiry = new Date()
cookieExpiry.setFullYear(cookieExpiry.getFullYear() + 1)
const portalToken = useCookie("portal_token", {
    expires: cookieExpiry
})
if (portalToken.value) {
    const tokencopy = portalToken.value
    portalToken.value = "Resetting"
    setTimeout(() => {
        portalToken.value = tokencopy
    }, 100)
}
const deleteAttendancePortal = async (atype) => {
    try {
        listLoader.value = true
        await attendancePortal.deleteAttendancePortal(atype.id)
        snackbar.add({
            type: "success",
            text: attendancePortal.successMessage
        })
        await attendancePortal.getAttendancePortal()
    } finally {
        listLoader.value = false
    }
}
const setupAttendancePortal = async () => {
    boardLoading.value = true
    try {
        await attendancePortal.saveAttendancePortal()
        snackbar.add({
            type: "success",
            text: attendancePortal.successMessage
        })
        await attendancePortal.getAttendancePortal()
        portalToken.value = attendancePortal.portal_token
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
    boardLoading.value = false
}
const actions = {
    delete: true
}
const changePaginate = (pageInfo) => {
    attendancePortalParams.value.page = pageInfo.page ?? "''"
}
const addAssignment = () => {
    attendancePortalParams.value.assignments.push({
        assignment_type: "",
    })
}
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_attendance_portal,
        ])"
    >
        <div class="md:flex gap-4 justify-center">
            <div class="w-full mx-auto">
                <LayoutBoards class="rounded-lg p-2" title="Setup Attendance Portal" :loading="boardLoading">
                    <div class="w-full grid grid-cols-1 gap-4 p-2">
                        <div>
                            <label for="ipAddress" class="block text-sm font-medium text-zinc-700 py-2">Location Name</label>
                            <input v-model="attendancePortalParams.name_location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text">
                        </div>
                    </div>
                    <div class="w-full grid grid-cols-1 gap-4 p-2">
                        <label for="ipAddress" class="block text-sm font-medium text-zinc-700 py-2">Assignments</label>
                        <template v-for="(assignment, index) in attendancePortalParams.assignments" :key="index">
                            <div class="flex items-center gap-2">
                                <HrmsCommonDepartmentProjectSelector
                                    v-model:select-type="attendancePortalParams.assignments[index].assignment_type"
                                    v-model:department-id="attendancePortalParams.assignments[index].department_id"
                                    v-model:project-id="attendancePortalParams.assignments[index].project_id"
                                    title=""
                                    class="py-2 w-full"
                                />
                                <Icon name="iconoir:trash" class="text-2xl text-slate-800 hover:text-blue-500 cursor-pointer" @click="attendancePortalParams.assignments.splice(index, 1)" />
                            </div>
                        </template>
                    </div>
                    <div class="p-2 flex gap-2">
                        <Icon
                            name="iconoir:plus"
                            class="text-2xl text-slate-800 hover:text-blue-500 cursor-pointer"
                            @click="addAssignment"
                        />
                    </div>
                    <div class="flex mt-6 justify-end py-2">
                        <button type="button" class="md:w-1/3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700" @click="setupAttendancePortal">
                            Setup
                        </button>
                    </div>
                </LayoutBoards>
            </div>
            <div class="w-full py-2">
                <LayoutBoards title="Attendance Portal List" class="w-full" :loading="listLoader">
                    <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                        <LayoutPsTable
                            :header-columns="headers"
                            :actions="actions"
                            :datas="attendancePortalList"
                            @delete-row="deleteAttendancePortal"
                        />
                    </div>
                    <div class="flex justify-center mx-auto">
                        <CustomPagination :links="attendancePortalPagination" @change-params="changePaginate" />
                    </div>
                </LayoutBoards>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
