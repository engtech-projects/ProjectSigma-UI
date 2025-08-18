<script setup>
import { useHrmsSettingsStore } from "~/stores/hrms/setup/settings"
const compId = useId()
const settingsStore = useHrmsSettingsStore()
onMounted(async () => {
    await settingsStore.getAllSettings()
})
</script>
<template>
    <HrmsCommonTabsMainContainer>
        <template #tab-titles>
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_setup_settings,
                ])"
                title="Payroll Lockup"
                :target-id="'tab1'+compId"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_setup_settings,
                ])"
                title="Attendance"
                :target-id="'tab2'+compId"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.SUPERADMIN,
                ])"
                title="General Account Settings"
                :target-id="'tab3'+compId"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.SUPERADMIN,
                ])"
                title="Special Accessibility"
                :target-id="'tab4'+compId"
            />
        </template>
        <template #tab-containers>
            <HrmsCommonTabsTabContainer :id="'tab1'+compId">
                <HrmsSetupSettingsPayrollLockupSettings />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer :id="'tab2'+compId">
                <HrmsSetupSettingsAttendanceSettings />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer :id="'tab3'+compId">
                <HrmsSetupSettingsGeneralAccount />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer :id="'tab4'+compId">
                <HrmsSetupSettingsSpecialAccessibility />
            </HrmsCommonTabsTabContainer>
        </template>
    </HrmsCommonTabsMainContainer>
</template>
