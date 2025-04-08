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
        default: false,
    }
})
watch(selectType, () => {
    projectId.value = null
    departmentId.value = null
})
</script>
<template>
    <div>
        <label
            v-if="!useClassChargeType"
            :for="compId"
            class="block mb-1 text-sm font-medium text-gray-900"
        >
            {{ title }}
        </label>
        <div class="flex flex-row gap-4">
            <div class="w-full">
                <select
                    v-model="selectType"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                    <option value="" selected>
                        Select Type
                    </option>
                    <template v-if="!useClassChargeType">
                        <option value="All">
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
            <div class="w-auto">
                <template v-if="!useClassChargeType">
                    <template v-if="selectType === 'Department'">
                        <HrmsCommonDepartmentSelector
                            v-model="departmentId"
                        />
                    </template>
                    <template v-if="selectType === 'Project'">
                        <HrmsCommonProjectSelector
                            v-model="projectId"
                        />
                    </template>
                </template>
                <template v-else>
                    <template v-if="selectType == 'App\\Models\\Department'">
                        <HrmsCommonDepartmentSelector
                            v-model="departmentId"
                        />
                    </template>
                    <template v-if="selectType == 'App\\Models\\Project'">
                        <HrmsCommonProjectSelector
                            v-model="projectId"
                        />
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>
