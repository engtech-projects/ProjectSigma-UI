<script setup>
import { useHrmsSettingsStore } from "~/stores/hrms/setup/settings"
const settingsStore = useHrmsSettingsStore()
const { allSettings } = storeToRefs(settingsStore)
const snackbar = useSnackbar()
const nameAndDescriptions = [
    {
        name: HrmsSetupSettingsEnums.LOGOUT_CHANGE_PASSWORD,
        description: "Logout all other sessions when a user changes their password.",
    },
    {
        name: HrmsSetupSettingsEnums.SINGLE_DEVICE_LOGIN,
        description: "Only one instance of the application can be logged in at a time.",
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
                    <div class="flex flex-row">
                        <!-- TO CHANGE INPUT TO USER MULTI SELECT/TABLE CHECKBOX -->
                        <select
                            v-model="allSettings.data[index].value"
                            class="input rounded-lg w-1/3"
                            @focusin="allSettings.data[index].focus = true"
                            @focusout="allSettings.data[index].focus = false"
                        >
                            <option :value="true">
                                True
                            </option>
                            <option :value="false">
                                False
                            </option>
                        </select>
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
