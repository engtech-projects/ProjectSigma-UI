<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-10 md:mt-0">
            Employees Record
        </div>
        <div>
            <HrmsEmployee201TabComp />
        </div>
    </div>
</template>

<script setup>
import { initFlowbite } from "flowbite"

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite()
})
useHead({
    title: "201",
})
</script>
