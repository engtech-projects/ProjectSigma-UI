<script setup>
useHead({
    title: "Department Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
            Department Schedule
        </div>
        <hr>
        <div>
            <HrmsScheduleDept />
        </div>
    </div>
</template>
