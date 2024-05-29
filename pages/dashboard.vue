<script setup lang="ts">
useHead({
    title: "PROJECT SIGMA",
})
</script>

<template>
    <div class="h-full mt-10 md:flex items-center justify-center gap-10">
        <div
            class="justify-center items-center md:w-1/2 border-y-4 border-y-teal-600 p-7 bg-white rounded-lg shadow-lg"
        >
            <div class="flex justify-center bg-white mx-auto">
                <img
                    class="flex justify-center w-32 rounded-md"
                    src="/sigma.gif"
                    alt="logo"
                >
            </div>
            <p class="tracking-wide text-sm text-justify text-teal-700 italic">
                Project SIGMA , as a whole, is a comprehensive technology solution designed to enhance productivity, streamline operations, and improve overall efficiency within the construction company. It integrates various systems and processes, making it a valuable tool for construction project management.
            </p>
            <div>
                <div class="mt-2 tracking-wide text-sm text-justify text-teal-700 italic">
                    <h1>Project SIGMA, represents the idea of a virtual or digital pathway that connects and facilitates the smooth operation of these critical business functions within a single software system. It emphasizes the efficiency and connectivity provided by the software in managing various aspects of a company's administration.</h1>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-5">
            <NuxtLink
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_group,
                ])"
                to="/hrms"
                class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500"
            >
                <div>
                    <img class="w-[100px]" src="/hrms.png" alt="logo">
                    <div
                        class="flex justify-center items-center text-xs text-teal-600 font-bold mt-2"
                    >
                        HRMS
                    </div>
                </div>
            </NuxtLink>

            <NuxtLink
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_dashboard,
                ])"
                to="/"
                class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500"
            >
                <div>
                    <img class="w-[100px]" src="/inventory.png" alt="logo">
                    <div
                        class="flex justify-center items-center text-xs text-teal-600 font-bold mt-2"
                    >
                        INVENTORY
                    </div>
                </div>
            </NuxtLink>

            <NuxtLink
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_dashboard,
                ])"
                to="/"
                class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500"
            >
                <div>
                    <img class="w-[100px]" src="/accounting.png" alt="logo">
                    <div
                        class="flex justify-center items-center text-xs text-teal-600 font-bold mt-2"
                    >
                        ACCOUNTING
                    </div>
                </div>
            </NuxtLink>

            <NuxtLink
                v-if="useCheckAccessibility([
                    AccessibilityTypes.project_monitoring_dashboard,
                ])"
                to="/"
                class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500"
            >
                <div>
                    <img class="w-[100px] mx-5" src="/monitor.png" alt="logo">
                    <div
                        class="flex justify-center items-center text-xs text-teal-600 font-bold mt-2"
                    >
                        PROJECT MONITORING
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
