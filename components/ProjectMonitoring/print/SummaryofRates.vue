<template>
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
            <p class="text-sm font-bold">
                Department of Public Works and Highways
            </p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
            <div>
                <p class="text-sm">
                    Contract ID
                </p>
                <p class="text-sm">
                    Contract Name
                </p>
                <p class="text-sm">
                    Contract Location
                </p>
            </div>
            <div class="font-bold">
                <p class="text-sm">
                    {{ projectStore.information.contract_id }}
                </p>
                <p class="text-sm">
                    {{ projectStore.information.name }}
                </p>
                <p class="text-sm">
                    {{ projectStore.information.location }}
                </p>
            </div>
        </div>
        <p class="text-lg font-bold text-center uppercase mb-8">
            SUMMARY OF RATES
        </p>
        <div v-for="(rate, index) in projectStore.information?.summary_of_rates" :key="index">
            <div class="text-center mb-8">
                <p class="text-base font-bold uppercase">
                    COST OF {{ index }}
                </p>
            </div>
            <div class="space-y-1 text-sm">
                <div v-for="item,i in rate" :key="i" class="flex justify-between">
                    <span>{{ i }}</span>
                    <span>{{ item.resource_name }}</span>
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <FormSignatory
                class="mt-16"
                label="Submitted By"
                :align="'left'"
                :signatory="{
                    name: 'Angel A. Abrau',
                    title: 'Authorized Managing Officer',
                    subtitle: projectStore.information?.license , // Assuming license is a string
                }"
            />
            <div class="flex items-center text-sm gap-4 mt-16">
                <span>DATE:</span>
                <span class="underline">{{ fullDate(new Date(projectStore.information?.contract_date)) }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
</script>

<style>

</style>
