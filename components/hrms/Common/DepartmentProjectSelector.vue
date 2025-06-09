<script setup>
const compId = useId()
const selectType = defineModel("selectType", { required: false, type: String, default: "Project" })
const projectId = defineModel("projectId", { required: false, type: Number })
const departmentId = defineModel("departmentId", { required: false, type: Number })
defineProps({
    title: {
        type: String,
        required: false,
        default: "Department/Project",
    },
    useClassChargeType: {
        type: Boolean,
        required: false,
        default: false,
    },
    showAllOption: {
        type: Boolean,
        required: false,
        default: false,
    },
})
watch(selectType, () => {
    projectId.value = null
    departmentId.value = null
})
</script>
<template>
    <div>
        <label
            :for="compId"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}
        </label>
        <div class="flex flex-row">
            <div class="w-1/3">
                <select
                    v-model="selectType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="" selected>
                        Select Type
                    </option>
                    <template v-if="!useClassChargeType">
                        <option v-if="showAllOption" value="All">
                            All
                        </option>
                        <option value="Project">
                            Project
                        </option>
                        <option value="Department">
                            Department
                        </option>
                    </template>
                    <template v-else>
                        <option value="App\Models\Project">
                            Project
                        </option>
                        <option value="App\Models\Department">
                            Department
                        </option>
                    </template>
                </select>
            </div>
            <div class="w-2/3">
                <template v-if="selectType === 'Department' || selectType === 'App\\Models\\Department'">
                    <HrmsCommonDepartmentSelector
                        v-model="departmentId"
                    />
                </template>
                <template v-if="selectType === 'Project' || selectType === 'App\\Models\\Project'">
                    <HrmsCommonProjectSelector
                        v-model="projectId"
                    />
                </template>
            </div>
        </div>
    </div>
</template>
