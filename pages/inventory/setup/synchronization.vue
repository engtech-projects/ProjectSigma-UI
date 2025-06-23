<script setup>
import { useDataSyncStore } from "~/stores/datasync"
const dataSyncStore = useDataSyncStore()
const snackbar = useSnackbar()
const loading = ref(false)

const sync = async () => {
    try {
        loading.value = true
        dataSyncStore.url = "/api/setup/sync/all"
        dataSyncStore.api = "inventory"
        await dataSyncStore.sync()
        if (dataSyncStore.successMessage !== "") {
            snackbar.add({
                type: "success",
                text: dataSyncStore.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: dataSyncStore.errorMessage
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
            AccessibilityTypes.INVENTORY_SETUP_API_SYNCHRONIZATION,
        ])"
    >
        <LayoutBoards
            title="Project Sigma Manual API Synchronization"
            :loading="loading"
        >
            <div class="p-8 min-h-screen bg-white shadow rounded-md relative">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-2xl font-bold">
                        PROJECT SIGMA
                    </h3>
                    <button
                        class="border-2 border-green-600 rounded-md px-3 py-2 flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 active:bg-green-500"
                        @click="sync"
                    >
                        <Icon name="iconoir:cloud-sync" />
                        <span class="text-xs">
                            Sync All
                        </span>
                    </button>
                </div>
                <div class="flex flex-col gap-8">
                    <LayoutSyncGroup name="HRMS" url="/api/setup/sync/hrms/all" api="inventory">
                        <LayoutSyncItem
                            name="Departments"
                            url="/api/setup/sync/hrms/departments"
                            api="inventory"
                        />
                        <LayoutSyncItem
                            name="Employees"
                            url="/api/setup/sync/hrms/employees"
                            api="inventory"
                        />
                        <LayoutSyncItem
                            name="Users"
                            url="/api/setup/sync/hrms/users"
                            api="inventory"
                        />
                    </LayoutSyncGroup>
                    <LayoutSyncGroup name="PROJECT" url="/api/setup/sync/project/all" api="inventory">
                        <LayoutSyncItem
                            name="Projects"
                            url="/api/setup/sync/project/projects"
                            api="inventory"
                        />
                    </LayoutSyncGroup>
                </div>
            </div>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>

<style>

</style>
