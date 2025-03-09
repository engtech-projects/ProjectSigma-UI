<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
useHead({
    title: "Position Details",
})
const manpowers = useManpowerStore()
const { manpower, isDetail } = storeToRefs(manpowers)
const route = useRoute()
const validKey = ref(false)

if (route.query.key) {
    validKey.value = true
    isDetail.value = true
    await manpowers.getOne(route.query.key)
} else {
    validKey.value = false
}

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_manpower_request_open_positions,
        ])"
    >
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <HrmsEmployeeJobHiringDetails :manpower-data="manpower" class="w-full" />
        </div>
    </LayoutAcessContainer>
</template>
