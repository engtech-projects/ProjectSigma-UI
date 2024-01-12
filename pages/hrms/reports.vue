<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-0  ">
            Reports
        </div>
        <hr>
        <div>
            <HrmsReportsDisplay />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
})
useHead({
    title: "Reports",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
