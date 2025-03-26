<script setup>
import { useRequestStockStore, APPROVALS } from "@/stores/inventory/requeststock"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"
import { useBOMStore } from "@/stores/inventory/bom"
import { useInventoryEnumsStore } from "@/stores/inventory/enum"

const enums = useInventoryEnumsStore()
const { itemEnum } = storeToRefs(enums)

const BOMStore = useBOMStore()
const { currentBom: List } = storeToRefs(BOMStore)
const today = new Date()
const currentYear = today.getFullYear()

const mainStore = useRequestStockStore()
const { approvalList } = storeToRefs(mainStore)
mainStore.fetchRs()

const form = defineModel({ required: true, type: Object })

const approvals = useApprovalStore()
approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

const snackbar = useSnackbar()

const selectedItems = ref([])

const addNonBomItem = () => {
    if (!form.value.item_id) {
        snackbar.add({ type: "error", text: "Please select an item before adding." })
        return
    }

    const selectedItem = itemEnum.value.list.find(i => i.id === form.value.item_id)

    if (!selectedItem) {
        snackbar.add({ type: "error", text: "Invalid item selected." })
        return
    }

    if (selectedItems.value.some(i => i.item_id === selectedItem.id)) {
        snackbar.add({ type: "error", text: "Item already added!" })
        return
    }

    selectedItems.value.push({
        item_id: selectedItem.id,
        item_summary: selectedItem.item_summary || selectedItem.item_description,
        quantity: 1,
        max_quantity: Infinity,
        unit: selectedItem.uom,
        old_unit: selectedItem.uom,
        specification: "",
        preferred_brand: "",
        reason: "",
        convertable_units: selectedItem.convertable_units,
        showUomSelector: false,
    })

    selectedItems.value = [...selectedItems.value]

    // Reset selection
    form.value.item_id = null
}

const addItem = (item) => {
    const isAlreadyAdded = selectedItems.value.some(i => i.item_id === item.item_id)

    if (isAlreadyAdded) {
        snackbar.add({ type: "warning", text: "Item already in the list!" })
        return
    }

    selectedItems.value.push({
        item_id: item.item_id,
        item_summary: item.item_summary,
        quantity: 1,
        max_quantity: item.quantity,
        unit: item.uom_id,
        old_unit: item.uom_id,
        specification: "",
        preferred_brand: "",
        reason: "",
        convertable_units: item.convertable_units,
        showUomSelector: false,
    })

    selectedItems.value = [...selectedItems.value]
    itemEnum.value.params.query = ""
}

const updateField = (index, field, value) => {
    selectedItems.value[index][field] = value
}

const removeItem = (index) => {
    selectedItems.value.splice(index, 1)
}

const storeRequestForm = async () => {
    try {
        if (!selectedItems.value.length) {
            snackbar.add({
                type: "error",
                text: "Please add at least one item before submitting the request.",
            })
            return
        }
        for (const item of selectedItems.value) {
            if (!item.item_id || !item.unit || !item.quantity) {
                snackbar.add({
                    type: "error",
                    text: "Each item must have an Item, UOM, and Quantity.",
                })
                return
            }
        }

        form.value.items = selectedItems.value.map(item => ({
            item_id: item.item_id,
            quantity: item.quantity,
            unit: item.unit,
            specification: item.specification || "",
            preferred_brand: item.preferred_brand || "",
            reason: item.reason || "",
        }))

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
            selectedItems.value = []
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || error,
        })
    }
}

const headers = [
    { name: "Qty", id: "quantity" },
    { name: "Unit", id: "unit" },
    { name: "Item Description", id: "item_id" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Reason For Request", id: "reason" },
]
const bomheaders = [
    { name: "Item Description", id: "item_summary" },
    { name: "Quantity", id: "quantity" },
    { name: "Warehouse", id: "" },
]
const selectType = ref(null)
onMounted(() => {
    if (form.value.section_type) {
        selectType.value = form.value.section_type
    }
})

watch([selectType, () => List.value.params.department_id, () => List.value.params.project_id], () => {
    List.value.params.effectivity = currentYear
    List.value.params.assignment_type = selectType.value

    // Assign department_id to assignment_id, then to form.section_id
    List.value.params.assignment_id = List.value.params.department_id || List.value.params.project_id
    form.value.section_type = selectType.value
    form.value.section_id = List.value.params.assignment_id

    if (selectType.value === "Department") {
        form.value.warehouse_id = 1
    }

    BOMStore.getCurrentBOM()
})

const isCheckboxChecked = ref(false)
</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeRequestForm">
            <div class="flex flex-col gap-4 w-full">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.request_for" :required="true" class="w-full" title="Request For" />
                            <div class="w-full flex gap-2">
                                <div class="w-full">
                                    <HrmsCommonDepartmentProjectSelector
                                        v-model:select-type="selectType"
                                        v-model:department-id="List.params.department_id"
                                        v-model:project-id="List.params.project_id"
                                        title="Department/Project"
                                    />
                                </div>
                                <div :class="{ 'w-full': !form.section_id, 'w-2/3': form.section_id }">
                                    <LayoutFormPsTextInput v-model="form.office_project_address" class="w-full" title="Address" />
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            {{ form.reference_no }}
                            <LayoutFormPsDateInput v-model="form.date_prepared" :required="true" class="w-full" title="Date Prepared" />
                            <LayoutFormPsDateInput v-model="form.date_needed" :required="true" class="w-full" title="Date Needed" />
                            <LayoutFormPsTextInput v-model="form.equipment_no" :required="true" class="w-full" title="Equipment No." />
                        </div>
                        <div
                            v-show="form.section_id"
                            class="w-full flex flex-col gap-2 border border-teal-500 shadow-md rounded-md h-[435px] overflow-y-auto z-0"
                        >
                            <InventoryRequestStockNonBomItemSelector
                                v-model:isCheckboxChecked="isCheckboxChecked"
                                v-model:itemId="form.item_id"
                                :section-id="form.section_id"
                                :select-type="selectType"
                                @add-non-bom-item="addNonBomItem"
                            />
                            <hr>
                            <InventoryRequestStockItemsAppend
                                :header-columns="bomheaders"
                                :datas="List.list ?? []"
                                :select-type="selectType"
                                @add-item="addItem"
                            />
                        </div>
                    </div>
                    <hr class="my-4">
                    <div class="border border-teal-200 shadow-md rounded-lg overflow-y-auto max-h-[365px]">
                        <InventoryRequestStockSelectedItems
                            title="Selected Items"
                            :header-columns="headers"
                            :data-columns="selectedItems"
                            @update-field="updateField"
                            @remove-item="removeItem"
                        />
                    </div>
                    <hr class="my-4">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.type_of_request" :required="false" class="w-full" title="Type of Request" />
                            <LayoutFormPsNumberInput v-model="form.contact_no" :required="false" class="w-full" title="Contact Number" />
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <div class="w-full">
                                <label
                                    class="block mb-1 text-sm font-medium text-gray-900"
                                >
                                    Remarks
                                </label>
                                <InventoryCommonFormPsTextAreaCommon v-model="form.remarks" title="Remarks" />
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <label
                                class="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Equipment SMR
                            </label>
                            <div class="flex">
                                <div class="w-1/2 pr-2">
                                    <LayoutFormPsTextInput v-model="form.current_smr" :required="false" class="w-full" title="Current SMR" />
                                </div>
                                <div class="w-1/2 pl-2">
                                    <LayoutFormPsTextInput v-model="form.unused_smr" :required="false" class="w-full" title="Unused SMR" />
                                </div>
                            </div>
                            <div class="flex mt-2">
                                <div class="w-1/2 pr-2">
                                    <LayoutFormPsTextInput v-model="form.previous_smr" :required="false" class="w-full" title="Previous SMR" />
                                </div>
                                <div class="w-1/2 pl-2">
                                    <LayoutFormPsTextInput v-model="form.next_smr" :required="false" class="w-full" title="Next SMR" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex w-full">
                    <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white"> Approval:</label>
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in approvalList.list"
                            :key="'hrmsetupapprovallist' + approv"
                            v-model="approvalList.list[apr]"
                        />
                    </div>
                </div>
                <div class="flex w-full items-center gap-4">
                    <button
                        type="submit"
                        class=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
