<script setup lang="ts">
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"

const mainStore = usePriceQuotationStore()
const item = defineModel({ required: true, type: Object })
const isLoading = ref(false)
const failedUpdate = ref(false)

watch(item, () => {
    debouncedSubmitUpdate()
}, { deep: true })

const debouncedSubmitUpdate = useDebouncedFn(() => {
    submitUpdate()
}, 500)
const submitUpdate = async () => {
    try {
        isLoading.value = true
        failedUpdate.value = false
        await mainStore.updatePriceQuotationItem(item.value.id, {
            actual_brand: item.value.brand,
            unit_price: item.value.price,
            remarks_during_canvass: item.value.remarks
        })
    } catch (error) {
        failedUpdate.value = true
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <tr
        class="border-b hover:bg-gray-50 transition"
    >
        <td class="p-2 text-center">
            {{ item.item_description }}
        </td>
        <td class="p-2 text-center">
            {{ item.specification }}
        </td>
        <td class="p-2 text-center">
            {{ item.qty }}
        </td>
        <td class="p-2 text-center">
            {{ item.unit }}
        </td>
        <td class="p-2 text-center">
            {{ item.preferred_brand }}
        </td>

        <td class="p-2">
            <div v-show="isLoading" class="mx-auto">
                <Icon name="svg-spinners:6-dots-rotate" />
            </div>
            <LayoutFormPsTextInput
                v-model="item.brand"
                :required="true"
                class="w-full"
                placeholder="Enter Brand"
            />
        </td>
        <td class="p-2">
            <div v-show="isLoading" class="mx-auto">
                <Icon name="svg-spinners:6-dots-rotate" />
            </div>
            <LayoutFormPsNumberInput
                v-model="item.price"
                :required="true"
                class="w-full"
                placeholder="Enter Price"
            />
        </td>
        <td class="p-2">
            <div v-show="isLoading" class="mx-auto">
                <Icon name="svg-spinners:6-dots-rotate" />
            </div>
            <textarea
                v-model="item.remarks"
                placeholder="Remarks"
                rows="2"
                class="w-full px-3 py-1.5 border border-slate-400 rounded-md text-sm resize-none focus:ring focus:ring-blue-200 focus:outline-none"
            />
        </td>
    </tr>
</template>
