<script setup lang="ts">
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
const print = ref(false)
const activeCost = ref(null)
const activeCostValue = ref(0)
const resetActiveCost = (event: Event) => {
    if ((event.target as HTMLElement).tagName !== "INPUT") {
        activeCost.value = null
    }
}
const changePrint = () => {
    print.value = !print.value
}
const activateCost = (event: Event, index: string, item: any) => {
    activeCost.value = index
    activeCostValue.value = item.unit_cost

    nextTick(() => {
        // Find the newly rendered input inside the parent div
        const target = event.currentTarget as HTMLElement
        const inputChild = target.querySelector("input")

        if (inputChild) {
            (inputChild as HTMLInputElement).focus()
            inputChild.select()
        }
    })
}
const isLoading = ref(false)
const snackbar = useSnackbar()
const updateCost = async (item: any) => {
    if (activeCostValue.value) {
        try {
            isLoading.value = true
            await projectStore.editRates(
                {
                    ids: item.ids,
                    unit_cost: activeCostValue.value,
                }
            )
            snackbar.add({
                type: "success",
                text: projectStore.successMessage
            })
        } catch {
            snackbar.add({
                type: "error",
                text: projectStore.errorMessage || "something went wrong."
            })
        } finally {
            item.unit_cost = activeCostValue.value
            isLoading.value = false
            activeCost.value = null
        }
    } else {
        activeCostValue.value = item.unit_cost
    }
}
</script>
<template>
    <div>
        <div v-if="!print" class="flex flex-col" @click="resetActiveCost($event)">
            <AccountingLoadScreen :is-loading="isLoading" />
            <h1 class="text-2xl text-black uppercase font-semibold text-center mb-6">
                Summary of Rates
            </h1>
            <div v-for="sr,i in projectStore.information.summary_of_rates" :key="i" class="flex flex-col gap-2">
                <h3 class="text-gray-500 uppercase text-md text-center">
                    Cost of {{ i }}
                </h3>
                <div class="flex flex-col border-t border-blue-500 border-dashed p-2">
                    <table>
                        <tbody>
                            <tr v-for="(item, index) in sr" :key="index">
                                <td>
                                    {{ index }}
                                </td>
                                <td class="w-3/12">
                                    <div class="flex flex-between w-full" @dblclick="activateCost($event, index, item)">
                                        <input v-if="activeCost === index" v-model="activeCostValue" type="number" class="border-0 bg-gray-100 h-7 w-24 text-right" @keyup.enter="updateCost(item)">
                                        <span v-else class="flex-1 text-right">{{ accountingCurrency(item.unit_cost) }}</span>
                                        <span class="flex-1 text-center">/</span>
                                        <span class="flex-1 text-left">{{ item.unit }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <LayoutPrint v-if="print">
            <ProjectsPrintSummaryofRates />
        </LayoutPrint>
        <projectsCommonPrintButton :print="print" @change-print="changePrint" />
    </div>
</template>
