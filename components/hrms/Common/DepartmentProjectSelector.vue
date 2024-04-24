<script lang="ts" setup>
const selectType = defineModel({ required: true, type: String })
const projectId = defineModel({ required: true, type: Number })
const departmentId = defineModel({ required: true, type: Number })
watch(selectType, () => {
    projectId.value = null
    departmentId.value = null
})
</script>
<template>
    <div>
        <select
            v-model="selectType"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option value="" selected>
                Select Filter Type
            </option>
            <option value="Project">
                Project
            </option>
            <option value="Department">
                Department
            </option>
        </select>

        <template v-if="selectType === 'Department'">
            <HrmsCommonDepartmentSelector
                v-model="departmentId"
                :show-all="true"
            />
        </template>
        <template v-if="selectType === 'Project'">
            <HrmsCommonProjectSelector
                v-model="projectId"
                :show-all="true"
            />
        </template>
    </div>
</template>
