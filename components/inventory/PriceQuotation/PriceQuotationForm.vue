<script setup>
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"

const mainStore = usePriceQuotationStore()
// mainStore.fetchQuotations()

const form = defineModel({ required: true, type: Object })

const snackbar = useSnackbar()

const storeWithdrawalForm = async () => {
    try {
        form.value.items = mainStore.withdrawal.items

        if (!form.value.items || form.value.items.length === 0) {
            snackbar.add({
                type: "error",
                text: "Please add items before submitting the request.",
            })
            return
        }

        form.value.approvals = approvalList.value.list
        await mainStore.storeRequest()

        if (mainStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: mainStore.errorMessage,
            })
        } else {
            snackbar.add({
                type: "success",
                text: mainStore.successMessage,
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || error,
        })
    }
}
const supplierId = defineModel("supplierId", { required: false, type: Number })

defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeWithdrawalForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4">
                    <h3 v-if="title" class="pl-4 text-xl font-bold text-gray-900 p-4 tracking-wide">
                        {{ title }}
                    </h3>
                </div>
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <div class="w-full">
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsDateInput
                                        v-model="form.date"
                                        :required="true"
                                        class="w-full"
                                        title="Date"
                                    />
                                </div>
                                <div class="flex flex-row items-center gap-2">
                                    <HrmsCommonSupplierSelector
                                        v-model:select-type="form.requesting"
                                        v-model:supplier-id="supplierId"
                                        title="Supplier Name"
                                    />
                                </div>
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsTextInput v-model="form.address" :required="true" class="w-full" title="Address" />
                                </div>
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsTextInput v-model="form.contact_person" :required="true" class="w-full" title="Contact Person" />
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.quotation_no" :required="true" class="w-full" title="Quotation Number" />
                            <LayoutFormPsTextInput v-model="form.conso_reference_no" :required="true" class="w-full" title="Conso Reference No." />
                            <LayoutFormPsTextInput v-model="form.contact_no" :required="true" class="w-full" title="Contact No." />
                        </div>
                    </div>
                    <div class="w-full">
                        <InventoryPriceQuotationItemList v-model="form.items" />
                    </div>
                    <div class="w-full p-4 bg-white rounded-lg">
                        <p class="text-sm font-medium text-gray-900">
                            Your promptness in giving us the price quotation of the above mentioned items is highly appreciated.
                        </p>
                    </div>
                    <div class="flex w-full justify-end items-center gap-4 no-print">
                        <button
                            type="submit"
                            class=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
@media print {
    .no-print {
    display: none !important;
    }
}
</style>
