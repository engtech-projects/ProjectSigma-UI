<script lang="ts" setup>
import { useTaskStore } from "~/stores/project-monitoring/task"
const taskStore = useTaskStore()
const { task } = storeToRefs(taskStore)

</script>
<template>
    <div class="bg-white">
        <LayoutPrintAdvanced>
            <template #system-layout>
                <ProjectMonitoringSharedBillOfQuantitiesDetailsTaskSystemView />
            </template>
            <template #print-layout>
                <ProjectMonitoringPrintDetailedEstimates :task="task" />
            </template>
        </LayoutPrintAdvanced>
    </div>
</template>
