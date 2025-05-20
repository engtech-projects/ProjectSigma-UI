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
    },
    isModuleSync: {
        type: Boolean,
        default: true
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
        <div class="border bg-white rounded-md relative">
            <div class="px-6 py-3 flex justify-between items-center bg-gray-100 font-bold border">
                <h2>
                    {{ props.name }}
                </h2>
                <button
                    v-show="props.isModuleSync"
                    class="border border-2-teal-600 rounded-md px-3 py-1 flex items-center gap-2 bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-500"
                    @click="sync"
                >
                    <Icon name="iconoir:refresh-double" />
                    <span class="text-xs">
                        Sync Module
                    </span>
                </button>
            </div>
            <div>
                <slot />
            </div>
        </div>
    </LayoutLoadingContainer>
</template>
