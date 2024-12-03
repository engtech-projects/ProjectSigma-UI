<script setup>
import { useWorkLocationEmployees } from "@/stores/hrms/workLocationEmployees"

const workLocationStore = useWorkLocationEmployees()
onMounted(() => {
    workLocationStore.getLocationEmployees()
})
const { locationMembers } = storeToRefs(workLocationStore)
</script>
<template>
    <LayoutBoards title="Work Location Employees" class="w-full" :loading="locationMembers.isLoading">
        <div class="text-gray-500 px-2">
            <div class="pt-2">
                <input
                    id="unassigned"
                    v-model="locationMembers.params.unassigned"
                    type="checkbox"
                    class="mr-2"
                    :true-value="1"
                    :false-value="0"
                >
                <label for="unassigned">Unassigned</label>
                <HrmsCommonDepartmentProjectSelector
                    v-show="!locationMembers.params.unassigned"
                    v-model:select-type="locationMembers.params.type"
                    v-model:department-id="locationMembers.params.department_id"
                    v-model:project-id="locationMembers.params.project_id"
                    title="Work Location"
                />
            </div>
        </div>
        <div class="w-full m-2 flex justify-between">
            <p class="text-3xl font-light">
                <span class="text-sm font-thin">Location : <span class="text-cyan-700">{{ locationMembers.info.name }}</span> </span>
            </p>
        </div>
        <div class="bg-white shadow-md rounded-md overflow-hidden">
            <div class="bg-gray-100 py-2 px-4">
                <h2 class="text-xl font-semibold text-gray-800">
                    Employees
                </h2>
            </div>
            <div class="divide-gray-200 p-4">
                <div v-for="(member, index) in locationMembers.employees" :key="index" class="flex items-left">
                    <span class="text-gray-700 text-lg font-medium mr-4"> {{ index + 1 }}. </span>
                    <div class="flex-1">
                        <h3 class="text-lg font-medium text-gray-800">
                            {{ member.fullname_last }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </LayoutBoards>
</template>

<style scoped>

#overtime_form .vue3-easy-data-table__footer{
    display: none !important;
}

.add-btn-not-active, .remove-btn-not-active{
    display: none;
}
</style>
