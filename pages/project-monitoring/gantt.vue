<template>
    <div class="mb-12">
        <LayoutPrintAdvanced>
            <template #system-layout>
                <ProjectsGanttChart />
                <ProjectsGanttEquipment />
                <ProjectsGanttManpower />
            </template>
            <template #print-layout>
                <ProjectsGanttPrintMain />
            </template>
        </LayoutPrintAdvanced>
    </div>
</template>

<script setup lang="ts">
</script>

<style>
</style>
