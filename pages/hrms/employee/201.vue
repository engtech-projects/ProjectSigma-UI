<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-10 md:mt-0">
            Employees Record
        </div>
        <hr>
        <div>
            <SearchBar class="md:w-1/3 mt-4 mb-4 flex flex-col justify-end ml-auto " />
        </div>
        <div>
            <TabComp />
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
