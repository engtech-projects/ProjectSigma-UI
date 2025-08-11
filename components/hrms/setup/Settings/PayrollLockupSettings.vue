<script setup>
import { useHrmsSettingsStore } from "~/stores/hrms/setup/settings"
const settingsStore = useHrmsSettingsStore()
const { allSettings } = storeToRefs(settingsStore)
const snackbar = useSnackbar()
const nameAndDescriptions = [
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
    <div class="space-y-2 p-2">
        <template v-for="setting, index in allSettings.data">
            <div v-if="nameAndDescriptions.find((s) => s.name === setting.setting_name)" :key="setting.id" class="space-y-1">
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
                        {{ nameAndDescriptions.find((s) => s.name === setting.setting_name).description }}
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>
