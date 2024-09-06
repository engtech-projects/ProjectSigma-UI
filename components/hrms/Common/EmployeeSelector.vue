<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { allEmployeeEnum } = storeToRefs(enums)
onMounted(() => {
    if (!allEmployeeEnum.value.isLoaded) {
        enums.getEmployeeEnum()
    }
})
const model = defineModel({ required: false, type: Number, default: null })
</script>
<template>
    <div>
        <select
            id="users_list"
            v-model="model"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option :value="null" selected>
                --Select Employee--
            </option>
            <option
                v-for="employeeSelect, index in allEmployeeEnum.list"
                :key="index"
                :value="employeeSelect.id"
            >
                {{ employeeSelect.fullname_last }}
            </option>
        </select>
    </div>
</template>
