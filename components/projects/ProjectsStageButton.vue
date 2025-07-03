<template>
    <button class="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 select-none text-white rounded-lg text-sm w-36 h-10" @click="changeStatus">
        {{ nextStatus }}
    </button>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
const props = defineProps({
    status: {
        type: String,
        default: ""
    }
})
const nextStatus = computed(() => {
    let finalStatus = ""
    if (props.status.toLowerCase() !== projectStore.statusList[projectStore.statusList.length - 1].toLowerCase()) {
        for (const i in projectStore.statusList) {
            if (projectStore.statusList[i].toLowerCase() === props.status.toLowerCase()) {
                finalStatus = projectStore.statusList[parseInt(i) + 1]
            }
        }
    }
    return finalStatus
})
const changeStatus = () => {
    return 1
}
</script>

<style>

</style>
