<script lang="ts" setup>
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"
const genallowStore = useGenerateAllowanceStore()
const { getParams } = storeToRefs(genallowStore)
</script>
<template>
    <div class="overflow-y-scroll h-64 max-h-64">
        <div class="flex flex-row">
            <!-- <pre>{{ getParams }}</pre> -->
            <HrmsCommonDepartmenProjectSelector
                v-model:select-type="getParams.group_type"
                v-model:projectId="getParams.project_id"
                v-model:departmentId="getParams.department_id"
            />
        </div>
    </div>
</template>
