<script setup lang="ts">
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
import { useApprovalStore, APPROVAL_NEW_ITEM_PROFILE } from "@/stores/inventory/setup/approvals"

const profileStore = useItemProfileStore()
const { newItemProfile, formItemProfile, addItemProfile, uom, uomVolume, uomLength, uomWeight, uomArea, uomForce, uomDimension, itemgroup, subitemgroup } = storeToRefs(profileStore)
const approvalsStore = useApprovalStore()
formItemProfile.value.approvals = await approvalsStore.getApprovalByName(APPROVAL_NEW_ITEM_PROFILE)

defineProps({
    actions: {
        type: Object,
        required: false,
        default: null,
    },
})
const snackbar = useSnackbar()
const boardLoading = ref(false)
const getType = (id:number) => {
    if (uom.value.length >= 1) {
        const symbol = uom.value.map((data: any) => {
            return data.id === id ? data.symbol : null
        }).filter((num:any): num is number => num !== null)
        return symbol ? symbol[0] : null
    }
    return null
}

const getSubItemGroup = (id:number) => {
    if (subitemgroup.value.length >= 1) {
        const symbol = subitemgroup.value.map((data: any, index: any) => {
            return index === id ? data.name : null
        }).filter((num:any): num is number => num !== null)
        return symbol ? symbol[0] : null
    }
    return null
}

const getItemGroup = (id:number) => {
    if (itemgroup.value.length >= 1) {
        const symbol = itemgroup.value.map((data: any) => {
            return data.id === id ? data.name : null
        }).filter((num:any): num is number => num !== null)
        return symbol ? symbol[0] : null
    }
    return null
}

const AllTypes = ref({
    allType: uom,
    lengthType: uomLength,
    weightType: uomWeight,
    volumeType: uomVolume,
    areaType: uomArea,
    forceType: uomForce,
    dimensionType: uomDimension,
    itemGroup: itemgroup,
    subItemGroup: subitemgroup,
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
const doAddItemProfile = (item: any, id: number) => {
    newItemProfile.value.push(item)
    addItemProfile.value.splice(id, 1)
}
const doStoreItemProfile = async () => {
    try {
        if (newItemProfile.value.length >= 1) {
            formItemProfile.value.item_profiles = newItemProfile.value
            await profileStore.storeItemProfile()
            snackbar.add({
                type: "success",
                text: profileStore.successMessage
            })
            newItemProfile.value = []
            profileStore.reset()
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
const doEditItem = (data:any, index: number) => {
    if (newItemProfile.value.length >= 1) {
        newItemProfile.value[index] = data
        newItemProfile.value[index].is_edit = false
        profileStore.reset()
    }
}
const showItemProfile = () => {
    addItemProfile.value.push(
        {
            id: null,
            sku: "",
            item_description: "",
            thickness_val: null,
            thickness_uom: null,
            length_val: null,
            length_uom: null,
            width_val: null,
            width_uom: null,
            height_val: null,
            height_uom: null,
            outside_diameter_val: null,
            outside_diameter_uom: null,
            inside_diameter_val: null,
            inside_diameter_uom: null,
            specification: "",
            volume: null,
            volume_uom: null,
            grade: "",
            color: "",
            uom: null,
            uom_group_id: "",
            item_group: null,
            sub_item_group: null,
            uom_conversion_value: null,
            inventory_type: "",
            active_status: "Inactive",
            is_approved: false,
            is_edit: false,
        }
    )
}
const removeAppendItemProfile = (id: number) => {
    addItemProfile.value.splice(id, 1)
}
const removeItemProfile = (id: number) => {
    newItemProfile.value.splice(id, 1)
}
const showEditItemProfile = async (index: number) => {
    const getItem = await newItemProfile.value[index]
    getItem.is_edit = true
}
const hideEditItem = async (index: number) => {
    const getItem = await newItemProfile.value[index]
    getItem.is_edit = false
    profileStore.reset()
}
const doGetSubItemGroup = async (id: number) => {
    await profileStore.getSubItemGroups(id)
}
</script>
<template>
    <InventoryCommonLayoutItemProfileBoards title="New Profile" class="w-full" :loading="boardLoading" @action="showItemProfile">
        <div class="pb-2 text-gray-500 overflow-x-auto mb-4">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <InventoryCommonTableItemTh title="Item Code" />
                        <InventoryCommonTableItemTh title="Item description" />
                        <InventoryCommonTableItemTh title="Thickness" />
                        <InventoryCommonTableItemTh title="Length" />
                        <InventoryCommonTableItemTh title="Width" />
                        <InventoryCommonTableItemTh title="Height" />
                        <InventoryCommonTableItemTh title="Outside diameter" />
                        <InventoryCommonTableItemTh title="Inside diameter" />
                        <InventoryCommonTableItemTh title="Volume" />
                        <InventoryCommonTableItemTh title="Specification" />
                        <InventoryCommonTableItemTh title="Grade" />
                        <InventoryCommonTableItemTh title="Color" />
                        <InventoryCommonTableItemTh title="UOM" />
                        <InventoryCommonTableItemTh title="Sub Item Group" />
                        <InventoryCommonTableItemTh title="Item Group" />
                        <InventoryCommonTableItemTh title="Inventory Type" />
                        <InventoryCommonTableItemTh title="Actions" />
                    </tr>
                </thead>
                <tbody>
                    <InventoryCommonTableItemProfileAppend
                        :append-item-profile="addItemProfile"
                        :inventory-types="inventoryTypes"
                        :uom-types="AllTypes"
                        @add-item="doAddItemProfile"
                        @remove-item="removeAppendItemProfile"
                        @item-group-item="doGetSubItemGroup"
                    />
                    <tr v-for="dataValue, index in newItemProfile" :key="index" class="bg-white border-b">
                        <template v-if="dataValue.is_edit">
                            <InventoryCommonTableItemProfileEdit
                                :item-profile="dataValue"
                                :inventory-types="inventoryTypes"
                                :uom-types="AllTypes"
                                @do-edit-item="doEditItem(dataValue, index)"
                                @do-hide-edit-item="hideEditItem(index)"
                                @item-group-item="doGetSubItemGroup"
                            />
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
                                {{ getType(dataValue.thickness_uom) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.length_val }}
                                {{ getType(dataValue.length_uom) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.width_val }}
                                {{ getType(dataValue.width_uom) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.height_val }}
                                {{ getType(dataValue.height_uom) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.outside_diameter_val }}
                                {{ getType(dataValue.outside_diameter_uom) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.inside_diameter_val }}
                                {{ getType(dataValue.inside_diameter_uom) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.volume }}
                                {{ getType(dataValue.volume_uom) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.specification }}
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
                                {{ getSubItemGroup(dataValue.sub_item_group) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ getItemGroup(dataValue.item_group) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.inventory_type }}
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
