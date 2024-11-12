<template>
    <div>
        <div class="border bg-white rounded-md">
            <div class="px-6 py-3 flex justify-between items-center bg-gray-100 font-bold mb-4 border">
                <h2>
                    HRMS
                </h2>
                <button
                    class="border border-2-green-600 rounded-md px-3 py-1 flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 active:bg-green-500"
                >
                    <Icon name="iconoir:cloud-sync" />
                    <span class="text-xs">
                        Sync All
                    </span>
                </button>
            </div>
            <div class="flex flex-col">
                <div class="flex items-center justify-between px-6 py-2 border-b hover:bg-green-50">
                    <span>
                        Employees
                    </span>
                    <button class="p-2 border flex gap-2 items-center rounded-md text-xs hover:bg-gray-200 active:bg-white">
                        <Icon name="iconoir:refresh-double" />
                        <span>
                            Sync
                        </span>
                    </button>
                </div>
                <div class="flex items-center justify-between px-6 py-2 border-b hover:bg-green-50">
                    <span>
                        Department
                    </span>
                    <button class="p-2 border flex gap-2 items-center rounded-md text-xs hover:bg-gray-200 active:bg-white">
                        <Icon name="iconoir:refresh-double" />
                        <span>
                            Sync
                        </span>
                    </button>
                </div>
                <div class="flex items-center justify-between px-6 py-2 border-b hover:bg-green-50">
                    <span>
                        Projects
                    </span>
                    <button class="p-2 border flex gap-2 items-center rounded-md text-xs hover:bg-gray-200 active:bg-white">
                        <Icon name="iconoir:refresh-double" />
                        <span>
                            Sync
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
