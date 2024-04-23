<script setup lang="ts">
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"
import { useEnumsStore } from "@/stores/hrms/enum"

const cashadvances = useCashadvanceStore()
// const { isEdit } = storeToRefs(cashadvances)
cashadvances.getMyRequests()
cashadvances.getMyApprovalRequests()
cashadvances.getCA()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getUserEmployeeEnums()
enums.getDepartmentEnums()
enums.getProjectEnums()
enums.getPositionEnums()

useHead({
    title: "Cash Advance",

})
</script>

<template>
    <!-- <div>
        <HrmsCashadvanceForm />
        <HrmsCashadvanceTabs />
    </div> -->
    <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div>
            <HrmsCashadvanceForm />
        </div>
        <div>
            <HrmsCashadvanceTabs />
        </div>
    </div>
</template>
