<template>
    <div class="w-96">
        <aside class="w-full h-screen overflow-y-auto border-r bg-white p-4">
            <ProjectMonitoringProjectVersionDropdown />
            <ProjectMonitoringProjectPanelHeader />
            <ProjectMonitoringProjectPanelList
                :tabs="tabs"
                :active-tab="props.activeTab"
                @update:active-tab="setActiveTab"
            />
        </aside>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    activeTab: {
        type: String,
        default: ""
    },
    tabs: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(["update:activeTab"])

const setActiveTab = (tab: any) => {
    emit("update:activeTab", tab)
}
</script>
