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
const isSidebarVisible = ref(true) // whether content is visible
const isAnimating = ref(true) // whether to keep <aside> mounted

const toggleSidebar = () => {
    if (isSidebarVisible.value) {
        isSidebarVisible.value = false
        isAnimating.value = true
    } else {
        isAnimating.value = true
        requestAnimationFrame(() => {
            isSidebarVisible.value = true
        })
    }
}

const onTransitionEnd = () => {
    if (!isSidebarVisible.value) {
        isAnimating.value = false
    }
}
const setActiveTab = (tab: any) => {
    emit("update:activeTab", tab)
}
</script>
<template>
    <div
        :class="[
            isSidebarVisible ? 'w-96' : 'w-0'
        ]"
    >
        <button
            class="text-xs absolute top-2 left-2 z-50 bg-gray-200 hover:bg-gray-300p p-1 rounded"
            @click="toggleSidebar"
        >
            {{ isSidebarVisible ? '← Hide Panel' : '→ Show Panel' }}
        </button>
        <aside
            v-show="isSidebarVisible || isAnimating"
            class="mt-4 w-full h-screen bg-white border-r shadow-md relative overflow-hidden"
        >
            <div
                class="absolute inset-0 transition-transform duration-300 ease-in-out p-2"
                :class="isSidebarVisible ? 'translate-x-0' : '-translate-x-full'"
                @transitionend="onTransitionEnd"
            >
                <ProjectMonitoringProjectVersionDropdown />
                <ProjectMonitoringProjectPanelHeader />
                <ProjectMonitoringProjectPanelList
                    :tabs="tabs"
                    :active-tab="props.activeTab"
                    @update:active-tab="setActiveTab"
                />
            </div>
        </aside>
    </div>
</template>
