<script setup lang="ts">
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
import { useApprovalStore, APPROVAL_NEW_ITEM_PROFILE } from "@/stores/inventory/setup/approvals"

const profileStore = useItemProfileStore()
const { newItemProfile, formItemProfile, addItemProfile, uom, itemProfile, uomVolume, uomLength, uomWeight, uomArea, uomForce, uomDimension } = storeToRefs(profileStore)
const approvalsStore = useApprovalStore()
formItemProfile.value.approvals = await approvalsStore.getApprovalByName(APPROVAL_NEW_ITEM_PROFILE)

defineProps({
    actions: {
        type: Object,
        required: false,
        default: null,
    },
})
const showAppend = ref(false)
const snackbar = useSnackbar()
const boardLoading = ref(false)
const uomTypes = ref({
    allType: uom,
    lengthType: uomLength,
    weightType: uomWeight,
    volumeType: uomVolume,
    areaType: uomArea,
    forceType: uomForce,
    dimensionType: uomDimension,
})

const inventoryTypes = ref(
    [
        {
            id: "Inventoriable",
            name: "Inventoriable",
        },
        {
            id: "Inventoriable",
            name: "Non-Inventoriable",
        },
    ]
)
const doAddItemProfile = (item:any) => {
    showAppend.value = false
    addItemProfile.value = []
    newItemProfile.value.push(item)
}
const doStoreItemProfile = async () => {
    try {
        if (newItemProfile.value.length >= 1) {
            formItemProfile.value.item_profiles = newItemProfile.value
            await profileStore.storeItemProfile()
            if (profileStore.successMessage) {
                snackbar.add({
                    type: "success",
                    text: profileStore.successMessage
                })
                newItemProfile.value = []
                profileStore.reset()
                profileStore.getMyApprovals()
                profileStore.approvalReset()
            } else if (profileStore.errorMessage) {
                snackbar.add({
                    type: "error",
                    text: profileStore.errorMessage
                })
            }
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
const doEditItem = (index: number) => {
    if (newItemProfile.value.length >= 1) {
        newItemProfile.value[index] = itemProfile.value ? itemProfile.value : null
        newItemProfile.value[index].is_edit = false
        profileStore.reset()
    }
}

const getTypeUom = (id: number) => {
    const index = id - 1
    return index
}

const showItemProfile = () => {
    addItemProfile.value = []
    addItemProfile.value.push(itemProfile.value)
    showAppend.value = true
}
const hideItemProfile = () => {
    showAppend.value = false
    addItemProfile.value = []
}
const removeItemProfile = (id: number) => {
    newItemProfile.value.splice(id, 1)
}
const showEditItemProfile = async (index: number) => {
    const getItem = await newItemProfile.value[index]
    itemProfile.value = getItem
    getItem.is_edit = true
}
const hideEditItem = async (index: number) => {
    const getItem = await newItemProfile.value[index]
    getItem.is_edit = false
    profileStore.reset()
}
</script>
<template>
    <InventoryCommonLayoutItemProfileBoards title="New Profile" class="w-full" :loading="boardLoading" @action="showItemProfile">
        <div class="pb-2 text-gray-500 overflow-x-auto mb-4">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <InventoryCommonTableItemTh title="SKU" />
                        <InventoryCommonTableItemTh title="Item description" />
                        <InventoryCommonTableItemTh title="Thickness" />
                        <InventoryCommonTableItemTh title="Length" />
                        <InventoryCommonTableItemTh title="Width" />
                        <InventoryCommonTableItemTh title="Height" />
                        <InventoryCommonTableItemTh title="Outside diameter" />
                        <InventoryCommonTableItemTh title="Inside diameter" />
                        <InventoryCommonTableItemTh title="Specification" />
                        <InventoryCommonTableItemTh title="Volume" />
                        <InventoryCommonTableItemTh title="Grade" />
                        <InventoryCommonTableItemTh title="Color" />
                        <InventoryCommonTableItemTh title="UOM" />
                        <InventoryCommonTableItemTh title="Inventory Type" />
                        <InventoryCommonTableItemTh title="Item Approved" />
                        <InventoryCommonTableItemTh title="Status" />
                        <InventoryCommonTableItemTh title="Action" />
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="showAppend" class="border-b-2 border-gray-300">
                        <InventoryItemProfileItemAppend :append-item-profile="addItemProfile" :inventory-types="inventoryTypes" :uom-types="uomTypes" @add-item="doAddItemProfile" @hide-item="hideItemProfile" />
                    </tr>
                    <tr v-for="dataValue, index in newItemProfile" :key="index" class="bg-white border-b">
                        <template v-if="dataValue.is_edit">
                            <InventoryItemProfileItemEdit :item-profile="itemProfile" :inventory-types="inventoryTypes" :uom-types="uomTypes" @do-edit-item="doEditItem(index)" @do-hide-edit-item="hideEditItem(index)" />
                        </template>
                        <template v-if="!dataValue.is_edit">
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.sku }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.item_description }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.thickness_val }}
                                {{ getTypeUom(dataValue.thickness_uom) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.length_val }}
                                {{ dataValue.length_uom }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.width_val }}
                                {{ dataValue.width_uom }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.height_val }}
                                {{ dataValue.height_uom }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.outside_diameter_val }}
                                {{ dataValue.outside_diameter_uom }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.inside_diameter_val }}
                                {{ dataValue.inside_diameter_uom }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.specification }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.volume }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.grade }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.color }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.uom }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.inventory_type }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.is_approved }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.active_status }}
                            </td>
                        </template>
                        <td v-if="!dataValue.is_edit" class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                            <button
                                class="text-blue-500 bg-transparent font-medium rounded-lg text-sm py-2.5 me-2 mb-2"
                                @click="showEditItemProfile(index)"
                            >
                                <Icon name="ion:pencil" class="h-5 w-5 lg:h-5 lg:w-5" />
                            </button>
                            <button
                                class="text-red-700 bg-transparent font-medium rounded-lg text-sm py-2.5 me-2 mb-2"
                                @click="removeItemProfile(index)"
                            >
                                <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex w-full">
            <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white"> Approval:</label>
                <HrmsSetupApprovalsList
                    v-for="(approv, apr) in formItemProfile.approvals"
                    :key="'hrmsetupapprovallist' + apr"
                    v-model="formItemProfile.approvals[apr]"
                />
            </div>
        </div>
        <div class="flex justify-end w-full">
            <button type="submit" class="flex-1 text-white p-2 rounded-lg bg-teal-600 content-center mt-5 max-w-max" @click="doStoreItemProfile">
                Submit Form
            </button>
        </div>
    </InventoryCommonLayoutItemProfileBoards>
</template>
