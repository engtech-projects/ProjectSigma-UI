<script setup>
import { useHrmsSettingsStore } from "~/stores/hrms/setup/settings"
const settingsStore = useHrmsSettingsStore()
const { allSettings } = storeToRefs(settingsStore)
const snackbar = useSnackbar()
onMounted(async () => {
    await settingsStore.getAllSettings()
})
const nameAndDescriptions = [
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
                        {{ nameAndDescriptions.find((s) => s.name === setting.setting_name).description }}
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>
