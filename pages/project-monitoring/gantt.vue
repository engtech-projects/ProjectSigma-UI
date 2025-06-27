<template>
    <div class="mb-12">
        <div v-if="!print">
            <ProjectsGanttChart />
            <ProjectsGanttEquipment />
            <ProjectsGanttManpower />
        </div>
        <div v-if="!print" class="flex justify-end mb-6">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="print = true">
                <Icon name="iconoir:printer" /> Print
            </button>
        </div>
        <LayoutPrint v-else>
            <ProjectsGanttPrintMain />
        </LayoutPrint>
    </div>
</template>

<script setup lang="ts">
const print = ref(false)
</script>

<style>
#app {
}
</style>
