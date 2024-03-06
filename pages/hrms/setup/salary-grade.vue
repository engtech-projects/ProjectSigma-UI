<script setup>
useHead({
    title: "Salary Grade",
})

</script>

<template>
    <div class="mt-10 md:flex gap-4">
        <HrmsSalaryGradeNew class="flex-1" />
        <HrmsSalaryGradeList class="flex-2" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
