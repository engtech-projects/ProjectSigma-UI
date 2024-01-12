<script setup>
import { onMounted } from "vue"
import { initFlowbite, initTabs } from "flowbite"

onMounted(() => {
    initFlowbite()
    initTabs()
})

definePageMeta({
    layout: "default",
}),
useHead({
    title: "Project Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
        Project Schedule
    </div>
    <hr>

    <div>
        <HrmsScheduleProject />
    </div>
</template>
