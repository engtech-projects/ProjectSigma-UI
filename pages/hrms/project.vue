<script setup>
useHead({
    title: "Project",
    meta: [
        { name: "description", content: "" }
    ],

})

</script>

<template>
    <div class="mt-10 md:flex gap-2">
        <HrmsProjectCreateEmployee />
        <HrmsProjectAssign />
        <HrmsProjectAttendanceScheduleForm />
    </div>
</template>
