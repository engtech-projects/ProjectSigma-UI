<script setup>
import { useHrmsSettingsStore } from "~/stores/hrms/setup/settings"
const compId = useId()
const settingsStore = useHrmsSettingsStore()
const { allSettings } = storeToRefs(settingsStore)
const snackbar = useSnackbar()
onMounted(async () => {
    await settingsStore.getAllSettings()
})
const payrollLockupGroupAndDescription = [
    {
        name: HrmsSetupSettingsEnums.PAYROLL_20TH_LOCKUP_DAY_LIMIT,
        description: "The days before this day will be locked for 20th Payroll Lockup",
    },
    {
        name: HrmsSetupSettingsEnums.PAYROLL_20TH_LOCKUP_SCHEDULE_DAY_OF_MONTH,
        description: "The day of the month to schedule 20th Payroll Lockup",
    },
    {
        name: HrmsSetupSettingsEnums.PAYROLL_20TH_LOCKUP_SCHEDULE_TIME_OF_DAY,
        description: "The time of day to schedule 20th Payroll Lockup",
    },
    {
        name: HrmsSetupSettingsEnums.PAYROLL_5TH_LOCKUP_DAY_LIMIT,
        description: "The days before this day will be locked for 5th Payroll Lockup",
    },
    {
        name: HrmsSetupSettingsEnums.PAYROLL_5TH_LOCKUP_SCHEDULE_DAY_OF_MONTH,
        description: "The day of the month to schedule 5th Payroll Lockup",
    },
    {
        name: HrmsSetupSettingsEnums.PAYROLL_5TH_LOCKUP_SCHEDULE_TIME_OF_DAY,
        description: "The time of day to schedule 5th Payroll Lockup",
    },
]
const attendanceGroupAndDescription = [
    {
        name: HrmsSetupSettingsEnums.EARLY_LOGIN,
        description: "Hours early an employee can login before employee's scheduled login time",
    },
    {
        name: HrmsSetupSettingsEnums.LATE_LOGOUT,
        description: "Hours late an employee can logout after employee's scheduled logout time",
    },
    {
        name: HrmsSetupSettingsEnums.LATE_ALLOWANCE,
        description: "Minutes late allowed before being considered late.",
    },
    {
        name: HrmsSetupSettingsEnums.LATE_ABSENT,
        description: "Minutes late allowed before being considered absent.",
    },
]
const specialAccessibilityGroupAndDescription = [
    {
        name: HrmsSetupSettingsEnums.USER_201_EDITOR,
        description: "User accounts that can edit 201 data.",
    },
    {
        name: HrmsSetupSettingsEnums.USER_SALARY_GRADE_SETTER,
        description: "User accounts that can set salary grade.",
    },
]
const updateSetting = async (id, value) => {
    try {
        await settingsStore.updateSetting(id, value)
        snackbar.add({
            type: "success",
            text: "Setting updated successfully",
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "Something went wrong",
        })
    }
}
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
                title="Special Accessibility"
                :target-id="'tab3'+compId"
            />
        </template>
        <template #tab-containers>
            <HrmsCommonTabsTabContainer :id="'tab1'+compId">
                <div class="space-y-2 p-2">
                    <template v-for="setting, index in allSettings.data">
                        <div v-if="payrollLockupGroupAndDescription.find((s) => s.name === setting.setting_name)" :key="setting.id" class="space-y-1">
                            <span class="text-sm font-medium">{{ setting.setting_name }}</span>
                            <div class="flex flex-col">
                                <div class="flex flex-row gap-2">
                                    <input
                                        v-if="[
                                            HrmsSetupSettingsEnums.PAYROLL_20TH_LOCKUP_DAY_LIMIT,
                                            HrmsSetupSettingsEnums.PAYROLL_20TH_LOCKUP_SCHEDULE_DAY_OF_MONTH,
                                            HrmsSetupSettingsEnums.PAYROLL_5TH_LOCKUP_DAY_LIMIT,
                                            HrmsSetupSettingsEnums.PAYROLL_5TH_LOCKUP_SCHEDULE_DAY_OF_MONTH,
                                        ].includes(setting.setting_name)"
                                        v-model="allSettings.data[index].value"
                                        type="number"
                                        class="input rounded-lg w-1/3"
                                        min="0"
                                        max="23"
                                        @focusin="allSettings.data[index].focus = true"
                                        @focusout="allSettings.data[index].focus = false"
                                    >
                                    <input
                                        v-if="[
                                            HrmsSetupSettingsEnums.PAYROLL_20TH_LOCKUP_SCHEDULE_TIME_OF_DAY,
                                            HrmsSetupSettingsEnums.PAYROLL_5TH_LOCKUP_SCHEDULE_TIME_OF_DAY,
                                        ].includes(setting.setting_name)"
                                        v-model="allSettings.data[index].value"
                                        type="time"
                                        class="input rounded-lg w-1/3"
                                        step="60"
                                        pattern="[0-9]{2}:[0-9]{2}"
                                        @focusin="allSettings.data[index].focus = true"
                                        @focusout="allSettings.data[index].focus = false"
                                    >
                                    <button
                                        class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                        @click="updateSetting(setting.id, setting.value)"
                                    >
                                        Set
                                    </button>
                                </div>
                                <span
                                    class="text-xs text-gray-500 opacity-0 transition-opacity duration-300"
                                    :class="{ 'opacity-100': setting.focus }"
                                >
                                    {{ payrollLockupGroupAndDescription.find((s) => s.name === setting.setting_name).description }}
                                </span>
                            </div>
                        </div>
                    </template>
                </div>
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer :id="'tab2'+compId">
                <div class="space-y-2 p-2">
                    <template v-for="setting, index in allSettings.data">
                        <div v-if="attendanceGroupAndDescription.find((s) => s.name === setting.setting_name)" :key="setting.id" class="space-y-1">
                            <span class="text-sm font-medium">{{ setting.setting_name }}</span>
                            <div class="flex flex-col">
                                <div class="flex flex-row gap-2">
                                    <input
                                        v-if="[HrmsSetupSettingsEnums.EARLY_LOGIN, HrmsSetupSettingsEnums.LATE_LOGOUT].includes(setting.setting_name)"
                                        v-model="allSettings.data[index].value"
                                        type="number"
                                        class="input rounded-lg w-1/3"
                                        min="0"
                                        max="23"
                                        @focusin="allSettings.data[index].focus = true"
                                        @focusout="allSettings.data[index].focus = false"
                                    >
                                    <input
                                        v-else-if="[HrmsSetupSettingsEnums.LATE_ALLOWANCE, HrmsSetupSettingsEnums.LATE_ABSENT].includes(setting.setting_name)"
                                        v-model="allSettings.data[index].value"
                                        type="number"
                                        class="input rounded-lg w-1/3"
                                        @focusin="allSettings.data[index].focus = true"
                                        @focusout="allSettings.data[index].focus = false"
                                    >
                                    <button
                                        class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                        @click="updateSetting(setting.id, setting.value)"
                                    >
                                        Set
                                    </button>
                                </div>
                                <span
                                    class="text-xs text-gray-500 opacity-0 transition-opacity duration-300"
                                    :class="{ 'opacity-100': setting.focus }"
                                >
                                    {{ attendanceGroupAndDescription.find((s) => s.name === setting.setting_name).description }}
                                </span>
                            </div>
                        </div>
                    </template>
                </div>
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer :id="'tab3'+compId">
                <div class="space-y-2 p-2">
                    <template v-for="setting, index in allSettings.data">
                        <div v-if="specialAccessibilityGroupAndDescription.find((s) => s.name === setting.setting_name)" :key="setting.id" class="space-y-1">
                            <span class="text-sm font-medium">{{ setting.setting_name }}</span>
                            <div class="flex flex-col">
                                <div class="flex flex-row justify-between">
                                    <!-- TO CHANGE INPUT TO USER MULTI SELECT/TABLE CHECKBOX -->
                                    <input
                                        v-model="allSettings.data[index].value"
                                        type="text"
                                        class="input rounded-lg w-1/3"
                                        @focusin="allSettings.data[index].focus = true"
                                        @focusout="allSettings.data[index].focus = false"
                                    >
                                    <button
                                        class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                        @click="updateSetting(setting.id, setting.value)"
                                    >
                                        Set
                                    </button>
                                </div>
                                <span
                                    class="text-xs text-gray-500 opacity-0 transition-opacity duration-300"
                                    :class="{ 'opacity-100': setting.focus }"
                                >
                                    {{ specialAccessibilityGroupAndDescription.find((s) => s.name === setting.setting_name).description }}
                                </span>
                            </div>
                        </div>
                    </template>
                </div>
            </HrmsCommonTabsTabContainer>
        </template>
    </HrmsCommonTabsMainContainer>
</template>
