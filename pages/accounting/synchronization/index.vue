<script setup>
import { useDataSyncStore } from "~/stores/datasync"
const dataSyncStore = useDataSyncStore()
const snackbar = useSnackbar()
const loading = ref(false)

const sync = async () => {
    try {
        loading.value = true
        dataSyncStore.url = "/api/sync/all"
        dataSyncStore.api = "accounting"
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
        <LayoutBoards
            title="Project Sigma Manual API Synchronization"
        >
            <div class="p-8 min-h-screen bg-white shadow rounded-md relative">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-2xl font-bold">
                        PROJECT SIGMA
                    </h3>
                    <button
                        class="border border-2-green-600 rounded-md px-3 py-2 flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 active:bg-green-500"
                        @click="sync"
                    >
                        <Icon name="iconoir:cloud-sync" />
                        <span class="text-xs">
                            Sync All
                        </span>
                    </button>
                </div>
                <div class="flex flex-col gap-8">
                    <LayoutSyncGroup name="HRMS" url="/api/sync/hrms/all" api="accounting">
                        <LayoutSyncItem
                            name="Employees"
                            url="/api/sync/hrms/employee"
                            api="accounting"
                        />
                        <LayoutSyncItem
                            name="Users"
                            url="/api/sync/hrms/users"
                            api="accounting"
                        />
                        <LayoutSyncItem
                            name="Departments"
                            url="/api/sync/hrms/department"
                            api="accounting"
                        />
                    </LayoutSyncGroup>
                    <LayoutSyncGroup name="PROJECT" url="/api/sync/project/all" api="accounting">
                        <LayoutSyncItem
                            name="Projects"
                            url="/api/sync/project/project"
                            api="accounting"
                        />
                    </LayoutSyncGroup>
                    <LayoutSyncGroup name="INVENTORY" url="/api/sync/inventory/all" api="accounting">
                        <LayoutSyncItem
                            name="Suppliers"
                            url="/api/sync/inventory/supplier"
                            api="accounting"
                        />
                    </LayoutSyncGroup>
                </div>
            </div>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>

<style>

</style>
