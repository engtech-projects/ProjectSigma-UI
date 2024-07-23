<script setup>
import { useMain } from "@/stores/hrms/setup/settings"

const mains = useMain()
mains.getAll()

useHead({
    title: "Settings",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_settings,
        ])"
    >
        <div class="flex flex-col gap-3">
            <HrmsSetupSettingsEditSettingsForm />
        </div>
    </LayoutAcessContainer>
</template>
