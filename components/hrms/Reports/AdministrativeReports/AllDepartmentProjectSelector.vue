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
            class="block mb-1 text-sm font-medium text-gray-900"
        >
            {{ title }}
        </label>
        <div class="flex flex-row">
            <div class="w-1/3">
                <select
                    v-model="selectType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    <option value="" selected>
                        Select Type
                    </option>
                    <option value="All">
                        All
                    </option>
                    <option value="Project">
                        Project
                    </option>
                    <option value="Department">
                        Department
                    </option>
                </select>
            </div>
            <div class="w-2/3">
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
            </div>
        </div>
    </div>
</template>
