<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { userEmployeeEnum } = storeToRefs(enums)
// if (userEmployeeEnum.value.list?.length <= 0) {
//     enums.getUserEmployeeEnum()
// }
const model = defineModel({ required: false, type: Number, default: null })
</script>
<template>
    <div>
        <select
            id="users_list"
            v-model="model"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
        >
            <option value="" selected>
                --Select--
            </option>
            <option
                v-for="userSelect, userSelector in userEmployeeEnum.list"
                :key="userSelector"
                :value="userSelect.id"
            >
                {{ userSelect.employee.fullname_first }}
            </option>
        </select>
    </div>
</template>
