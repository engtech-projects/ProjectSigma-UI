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

const showAddApplicant = ref(false)

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_manpower_request_open_positions,
        ])"
    >
        <div class="w-full flex flex-row gap-4">
            <HrmsEmployeeJobHiringDetails v-model:showAddApplicant="showAddApplicant" :manpower-data="manpower" class="w-full" />
            <HrmsEmployeeJobAddApplicant
                v-if="showAddApplicant"
                v-model:hideAddApplicant="showAddApplicant"
                class="w-full"
            />
        </div>
    </LayoutAcessContainer>
</template>
