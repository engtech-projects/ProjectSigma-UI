<script lang="ts" setup>
import { useDataSyncStore } from "~/stores/datasync"

const props = defineProps({
    name: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
    api: {
        type: String,
        default: ""
    }
})
const dataSyncStore = useDataSyncStore()
const snackbar = useSnackbar()
const loading = ref(false)

const sync = async () => {
    try {
        loading.value = true
        dataSyncStore.url = props.url
        dataSyncStore.api = props.api.toLowerCase()
        await dataSyncStore.sync()
        if (dataSyncStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: dataSyncStore.errorMessage
            })
        }
        if (dataSyncStore.successMessage !== "") {
            snackbar.add({
                type: "success",
                text: dataSyncStore.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: "something went wrong."
        })
    } finally {
        loading.value = false
        dataSyncStore.reset()
    }
}
</script>

<template>
    <LayoutLoadingContainer :loading="loading">
        <div class="flex items-center justify-between px-6 py-2 border-b hover:bg-green-50 relative">
            <span>
                {{ props.name }}
            </span>
            <button class="p-2 border flex gap-2 items-center rounded-md text-xs hover:bg-gray-200 active:bg-white" @click="sync">
                <Icon name="iconoir:refresh-double" />
                <span>
                    Sync
                </span>
            </button>
        </div>
    </LayoutLoadingContainer>
</template>

<style>

</style>
