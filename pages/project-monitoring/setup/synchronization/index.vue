<script setup>
import { useDataSyncStore } from "~/stores/datasync"
const dataSyncStore = useDataSyncStore()
const snackbar = useSnackbar()
const loading = ref(false)

const sync = async () => {
    try {
        loading.value = true
        dataSyncStore.url = "/api/sync/all"
        dataSyncStore.api = "project"
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
        dataSyncStore.reset()
        loading.value = false
    }
}
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_SYNCHRONIZATION,
        ])"
    >
        <div class="p-8 min-h-screen bg-white shadow rounded-md relative">
            <AccountingLoadScreen :is-loading="loading" class="z-50" />
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-2xl font-bold">
                    Data Synchronization
                </h1>
                <button
                    class="border border-2-green-600 rounded-md px-3 py-2 items-center gap-2 bg-green-500 text-white hover:bg-green-600 active:bg-green-500 hidden"
                    @click="sync"
                >
                    <Icon name="iconoir:cloud-sync" />
                    <span class="text-xs">
                        Sync All
                    </span>
                </button>
            </div>
            <div class="flex flex-col gap-8">
                <LayoutSyncGroup name="INVENTORY" :is-module-sync="false">
                    <LayoutSyncItem
                        name="Unit of Measurements (UOM)"
                        url="/api/sync/inventory/uom"
                        api="project"
                    />
                </LayoutSyncGroup>
            </div>
        </div>
    </LayoutAcessContainer>
</template>

<style>

</style>
