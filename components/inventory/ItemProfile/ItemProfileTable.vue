<script setup lang="ts">
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const profileStore = useItemProfileStore()
const { newItemProfile, uom, itemProfile, uomVolume, uomLength, uomWeight, uomArea, uomForce, uomDimension } = storeToRefs(profileStore)

defineProps({
    actions: {
        type: Object,
        required: false,
        default: null,
    },
})
const showAppend = ref(false)
const showEdit = ref(false)
const boardLoading = ref(false)
// const snackbar = useSnackbar()

const uomTypes = ref({
    allType: uom,
    lengthType: uomLength,
    weightType: uomWeight,
    volumeType: uomVolume,
    areaType: uomArea,
    forceType: uomForce,
    dimensionType: uomDimension,
})

const addItemProfile = (item: any) => {
    showAppend.value = false
    newItemProfile.value.push(item)
}

// const updateItemGroup = async (id: number, name: string, group: any) => {
//     const newSubItemGroup: any[] = []
//     group.forEach((element) => {
//         newSubItemGroup.push(element.name)
//     })
//     itemgroup.value.name = name
//     itemgroup.value.sub_groups = newSubItemGroup
//     showEdit.value = false
//     await itemStore.updateItemGroup(id)

//     if (errorMessage.value !== "",) {
//         snackbar.add({
//             type: "error",
//             text: errorMessage.value
//         })
//     } else {
//         snackbar.add({
//             type: "success",
//             text: successMessage.value
//         })
//         newItemProfile.value.map(function (itemname: any) {
//             if (itemname.id === id) {
//                 itemname.name = name
//                 itemname.sub_groups = newSubItemGroup
//                 itemname.edit = false
//             }
//             return itemname
//         })
//     }
// }

const showItemProfile = () => {
    showAppend.value = true
}
const hideItemProfile = () => {
    showAppend.value = false
}
const removeItemProfile = (id: number) => {
    newItemProfile.value.splice(id, 1)
}
const showEditItemProfile = async (index: number) => {
    const getItem = await newItemProfile.value[index]
    if (getItem) {
        if (newItemProfile.value[index].is_edit) {
            newItemProfile.value[index].is_edit = false
        } else {
            newItemProfile.value[index].is_edit = true
        }
    }
    showEdit.value = true
}
</script>
<template>
    <InventoryCommonLayoutInventoryBoards title="New Profile" class="w-full" :loading="boardLoading" @action="showItemProfile">
        <div class="pb-2 text-gray-500">
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
                        <InventoryCommonTableItemTh title="UOM value" />
                        <InventoryCommonTableItemTh title="Inventory Type" />
                        <InventoryCommonTableItemTh title="Status" />
                        <InventoryCommonTableItemTh title="Approved" />
                        <InventoryCommonTableItemTh title="Action" />
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="showAppend" class="border-b-2 border-gray-300">
                        <InventoryItemProfileItemAppend :item-profile="itemProfile" :uom-types="uomTypes" @add-item="addItemProfile" @hide-item="hideItemProfile" />
                    </tr>
                    <tr v-for="dataValue, index in newItemProfile" :key="index" class="bg-white border-b">
                        <template v-if="dataValue.is_edit">
                            <span>edit</span>
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
                                {{ dataValue.thickness_uom }}
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
                                {{ dataValue.uom_conversion_value }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.inventory_type }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.active_status }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.is_approved }}
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
        <div class="flex justify-end w-full">
            <button type="submit" class="flex-1 text-white p-2 rounded-lg bg-teal-600 content-center mt-5 max-w-max">
                Submit Form
            </button>
        </div>
        <!-- <InventorySetupItemGroupEdit :data="dataValue" @update-itemgroup="updateItemGroup" @hide-edit="hideEditItemGroup(dataValue)" /> -->
    </InventoryCommonLayoutInventoryBoards>
</template>
