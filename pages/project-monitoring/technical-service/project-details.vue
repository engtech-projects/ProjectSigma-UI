<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useRevisionStore } from "@/stores/project-monitoring/revisions"
const revisionStore = useRevisionStore()
const route = useRoute()
const projectStore = useProjectStore()
if (route.query.id) {
    projectStore.getProject(route.query.id)
    revisionStore.getParams.project_id = route.query.id
    revisionStore.getRevisions()
}
const { revisionSelected } = storeToRefs(revisionStore)
watch(revisionSelected, (newVal) => {
    if (newVal === null) {
        projectStore.getProject(route.query.id)
    } else {
        projectStore.viewProjectRevisions(newVal)
    }
}, { immediate: true })
const activeTab = ref("project")
const tabs = [
    {
        key: "project",
        label: "PROJECT FORM",
        icon: "mdi:file-document-outline",
    },
    {
        key: "boq",
        label: "BILL OF QUANTITIES",
        icon: "mdi:file-document-outline",
    },
    {
        key: "rates",
        label: "SUMMARY OF RATES",
        icon: "mdi:file-document-outline",
    },
    {
        key: "bid",
        label: "SUMMARY OF BID",
        icon: "mdi:file-document-outline",
    },
    {
        key: "estimated",
        label: "SUMMARY OF ESTIMATED DIRECT COST",
        icon: "mdi:file-chart-outline",
        children: [
            {
                key: "estimated-detailed",
                label: "DETAILED ESTIMATES",
                icon: "mdi:file-document-outline",
            },
            {
                key: "estimated-analysis",
                label: "DIRECT COST ANALYSIS",
                icon: "mdi:file-document-outline",
            },
            {
                key: "estimated-unit-price",
                label: "DETAILED UNIT PRICE ANALYSIS",
                icon: "mdi:file-document-outline",
            },
        ]
    },
    {
        key: "materials",
        label: "BILL OF MATERIALS",
        icon: "mdi:file-document-outline",
    },
    {
        key: "cashflow",
        label: "CASH FLOW",
        icon: "mdi:file-document-outline",
    },
]
</script>

<template>
    <LayoutBoards class="w-full">
        <div class="flex flex-row gap-2">
            <ProjectMonitoringProjectPanel
                v-model:active-tab="activeTab"
                :tabs="tabs"
            />
            <div class="w-full flex flex-col">
                <ProjectMonitoringProjectPanelViewer :active-tab="activeTab">
                    <template #project>
                        <ProjectMonitoringEditProject />
                    </template>
                    <template #boq>
                        <ProjectMonitoringSharedBillOfQuantities />
                    </template>
                    <template #rates>
                        <h2>
                            SUMMARY OF RATES
                        </h2>
                    </template>
                    <template #bid>
                        <ProjectMonitoringSharedSummaryOfBid />
                    </template>
                    <template #estimated>
                        <ProjectMonitoringTssSummaryOfEstimatedDirectCost />
                    </template>
                    <template #estimated-detailed>
                        <h2>
                            DETAILED ESTIMATES
                        </h2>
                    </template>
                    <template #estimated-analysis>
                        <h2>
                            DIRECT COST ANALYSIS
                        </h2>
                    </template>
                    <template #estimated-unit-price>
                        <h2>
                            DETAILED UNIT PRICE ANALYSIS
                        </h2>
                    </template>
                    <template #materials>
                        <h2>
                            BILL OF MATERIALS
                        </h2>
                    </template>
                    <template #cashflow>
                        <h2>
                            CASH FLOW
                        </h2>
                    </template>
                </ProjectMonitoringProjectPanelViewer>
            </div>
        </div>
    </LayoutBoards>
</template>
