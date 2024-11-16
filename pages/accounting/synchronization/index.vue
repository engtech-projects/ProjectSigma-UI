<script setup>
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_SYNCHRONIZATION,
        ])"
    >
        <div class="p-8 min-h-screen bg-white shadow rounded-md">
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-2xl font-bold">
                    Data Synchronization
                </h1>
                <!-- <button
                    class="border border-2-green-600 rounded-md px-3 py-2 flex items-center gap-2 bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-500"
                    @click="sync"
                >
                    <Icon name="iconoir:cloud-sync" />
                    <span class="text-xs">
                        Ultra Sync Pro Max
                    </span>
                </button> -->
            </div>
            <div class="flex flex-col gap-8">
                <sync-group name="HRMS" url="https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/hrms/sync-all">
                    <sync-item
                        name="Employees"
                        url="https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/hrms/sync-employee"
                    />
                    <sync-item
                        name="Departments"
                        url="https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/hrms/sync-department"
                    />
                </sync-group>

                <sync-group name="PROJECT" url="https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/project/sync-all">
                    <sync-item
                        name="Projects"
                        url="https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/project/sync-project"
                    />
                </sync-group>

                <sync-group name="INVENTORY" url="https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/inventory/sync-all">
                    <sync-item
                        name="Suppliers"
                        url="https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/inventory/sync-supplier"
                    />
                </sync-group>
            </div>
        </div>
    </LayoutAcessContainer>
</template>

<style>

</style>
