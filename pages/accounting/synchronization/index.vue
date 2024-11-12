<script setup>
</script>

<template>
    <div class="p-8 min-h-screen bg-white shadow rounded-md">
        <h1 class="text-2xl font-bold mb-8">
            Data Synchronization
        </h1>
        <div class="flex flex-col gap-8">
            <sync-group name="HRMS" url="https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/hrms/sync-all">
                <sync-item
                    name="Employees"
                    url="https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/hrms/sync-employee"
                />
                <sync-item
                    name="Departments"
                    :border="false"
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
</template>

<style>

</style>
