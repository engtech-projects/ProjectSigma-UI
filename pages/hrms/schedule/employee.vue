<script setup>
useHead({
    title: "Employee Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
            Employee Schedule
        </div>
        <hr>
        <div>
            <HrmsScheduleEmployee />
        </div>
    </div>
</template>
