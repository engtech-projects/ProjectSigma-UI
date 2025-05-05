<script lang="ts" setup>
import { useHrmsEnumsStore } from "@/stores/hrms/enum"
const enums = useHrmsEnumsStore()
const { approvalHeadEnum } = storeToRefs(enums)
onMounted(() => {
    if (!approvalHeadEnum.value.isLoaded) {
        enums.getApprovalHeadEnums()
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
                --Select Head--
            </option>
            <option
                v-for="userSelect, userSelector in approvalHeadEnum.list"
                :key="userSelector"
                :value="userSelect.id"
            >
                {{ userSelect.employee.fullname_last }}
            </option>
        </select>
    </div>
</template>
