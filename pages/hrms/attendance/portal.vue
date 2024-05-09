<script setup>
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"
const snackbar = useSnackbar()
const boardLoading = ref(false)
const listLoader = ref(false)
const attendancePortal = useAttendancePortal()
await attendancePortal.getAttendancePortal()
attendancePortal.getClientIPAddress()
const { attendancePortalParams, attendancePortalList, ipAddress, GROUP_TYPE_PROJECT, GROUP_TYPE_DEPARTMENT } = storeToRefs(attendancePortal)
const headers = [
    { name: "NAME", id: "name_location" },
    { name: "PROJECT / DEPARTMENT", id: "name" },
    { name: "TYPE", id: "type" },
]
const setEdit = (atype) => {
    attendancePortalParams.value.name_location = atype.name_location
    if (atype.assignment.type === GROUP_TYPE_PROJECT) {
        attendancePortalParams.value.group_type = GROUP_TYPE_PROJECT
        attendancePortalParams.value.project_id = atype.assignment.id
    }
    if (atype.assignment.type === GROUP_TYPE_DEPARTMENT) {
        attendancePortalParams.value.group_type = GROUP_TYPE_DEPARTMENT
        attendancePortalParams.value.department_id = atype.assignment.id
    }
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
        const portalToken = useCookie("portal_token", {
            maxAge: 99999999
        })
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
    edit: true,
    delete: true
}
</script>
<template>
    <div class="md:flex gap-4 justify-center">
        <div class="w-full mx-auto">
            <LayoutBoards class="rounded-lg p-2" title="Setup Attendance Portal" :loading="boardLoading">
                <div class="grid grid-cols-1 gap-4 p-2">
                    <label for="ipAddress" class="block text-sm font-medium text-zinc-700">Unique Identifier</label>
                    <p class="text-gray-700 text-xl">
                        {{ ipAddress }}
                    </p>
                </div>
                <div class="w-full grid grid-cols-1 gap-4 p-2">
                    <div>
                        <label for="ipAddress" class="block text-sm font-medium text-zinc-700 py-2">Location Name</label>
                        <input v-model="attendancePortalParams.name_location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text">
                    </div>
                </div>
                <div class="p-2">
                    <HrmsCommonDepartmentProjectSelector
                        v-model:select-type="attendancePortalParams.group_type"
                        v-model:department-id="attendancePortalParams.department_id"
                        v-model:project-id="attendancePortalParams.project_id"
                        class="py-2"
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
                        @edit-row="setEdit"
                        @delete-row="deleteAttendancePortal"
                    />
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
