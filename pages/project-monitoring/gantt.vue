<template>
    <div class="mb-12">
        <LayoutPrintAdvanced>
            <template #system-layout>
                <ProjectMonitoringGanttChart />
                <ProjectMonitoringGanttEquipment />
                <ProjectMonitoringGanttManpower />
            </template>
            <template #print-layout>
                <ProjectMonitoringGanttPrintMain />
            </template>
        </LayoutPrintAdvanced>
    </div>
</template>
