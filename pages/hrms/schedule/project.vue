<script setup>
import { initFlowbite, initTabs } from "flowbite"

onMounted(() => {
    initFlowbite()
    initTabs()
})

useHead({
    title: "Project Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
            Project Schedule
        </div>
        <hr>
        <div>
            <HrmsScheduleProject />
        </div>
    </div>
</template>
