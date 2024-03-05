<script setup>
import { useMain } from "@/stores/hrms/settings"

const mains = useMain()
mains.getAll()

useHead({
    title: "Settings",
})

</script>

<template>
    <div class="flex flex-col gap-3">
        <HrmsSetupSettingsEditSettingsForm />
    </div>
</template>
