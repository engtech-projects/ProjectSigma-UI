<script setup>
import { storeToRefs } from "pinia"
import { useMain } from "@/stores/settings"

const mains = useMain()
const { isEdit } = storeToRefs(mains)
mains.getAll()

useHead({
    title: "Settings",
})

</script>

<template>
    <div class="flex flex-col gap-3">
        <HrmsSettingsForm v-show="!isEdit" />
        <HrmsSettingsEditSettingsForm v-show="isEdit" />
        <HrmsSettingsList />
    </div>
</template>
