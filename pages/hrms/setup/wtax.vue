<script setup>

import { storeToRefs } from "pinia"
import { useWtaxStore } from "@/stores/hrms/setup/wtax"

const withholdings = useWtaxStore()
const { isEdit } = storeToRefs(withholdings)
withholdings.getWithholding()

useHead({
    title: "Withholding Tax",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_with_holding_tax,
        ])"
    >
        <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
            <HrmsSetupWtaxForm v-show="!isEdit" />
            <HrmsSetupWtaxEditForm v-show="isEdit" />
            <!-- <HrmsSetupWtaxTable /> -->
            <HrmsSetupWtaxTable />
        </div>
    </LayoutAcessContainer>
</template>
