<script setup lang="ts">
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const profileStore = useItemProfileStore()
const { newItemProfile, formItemProfile, addItemProfile, uom } = storeToRefs(profileStore)
defineProps({
    actions: {
        type: Object,
        required: false,
        default: null,
    },
})
const snackbar = useSnackbar()
const doAddItemProfile = (item: any, id: number) => {
    newItemProfile.value.push(item)
    addItemProfile.value.splice(id, 1)
}
const getOne = () => {
    addItemProfile.value.push(
        {
            id: null,
            item_code: "",
            item_description: "",
            thickness_val: "",
            length_val: "",
            width_val: "",
            height_val: "",
            outside_diameter_val: "",
            inside_diameter_val: "",
            angle: "",
            size: "",
            volume: "",
            weight: "",
            grade: "",
            volts: "",
            plates: "",
            part_number: "",
            color: "",
            specification: "",
            uom: null,
            uom_group_id: "",
            item_group: "",
            sub_item_group: "",
            uom_conversion_value: null,
            inventory_type: "",
            active_status: "Inactive",
            is_approved: false,
            is_edit: false,
            item_group_list: [],
            subitem_group_list: [],
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
const doEditItem = (data:any, index: number) => {
    if (newItemProfile.value.length >= 1) {
        newItemProfile.value[index] = data
        newItemProfile.value[index].is_edit = false
    }
}
const hideEditItem = async (index: number) => {
    const getItem = await newItemProfile.value[index]
    getItem.is_edit = false
}
const getTypeUOM = (id:number) => {
    if (uom.value.length >= 1) {
        const symbol = uom.value.map((data: any) => {
            return data.id === id ? data.name : null
        }).filter((num:any): num is number => num !== null)

        return symbol ? symbol[0] : null
    }
    return null
}
const doStoreItemProfile = async () => {
    try {
        if (newItemProfile.value.length >= 1) {
            formItemProfile.value.item_profiles = newItemProfile.value
            await profileStore.storeItemProfile()
            if (profileStore.errorMessage !== "") {
                snackbar.add({
                    type: "error",
                    text: profileStore.errorMessage
                })
            } else {
                snackbar.add({
                    type: "success",
                    text: profileStore.successMessage
                })
                profileStore.$reset()
            }
        } else {
            snackbar.add({
                type: "error",
                text: "No Item Request."
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
</script>
<template>
    <InventoryCommonLayoutItemProfileBoards title="New Profile" class="w-full" @action="getOne">
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
                        <InventoryCommonTableItemTh title="Angle" />
                        <InventoryCommonTableItemTh title="Size" />
                        <InventoryCommonTableItemTh title="Volume" />
                        <InventoryCommonTableItemTh title="Weight" />
                        <InventoryCommonTableItemTh title="Grade" />
                        <InventoryCommonTableItemTh title="Volts" />
                        <InventoryCommonTableItemTh title="Plates" />
                        <InventoryCommonTableItemTh title="Part Number" />
                        <InventoryCommonTableItemTh title="Color" />
                        <InventoryCommonTableItemTh title="Specification" />
                        <InventoryCommonTableItemTh title="UOM" />
                        <InventoryCommonTableItemTh title="Item Group" />
                        <InventoryCommonTableItemTh title="Sub Item Group" />
                        <InventoryCommonTableItemTh title="Inventory Type" />
                        <InventoryCommonTableItemTh title="Actions" />
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(itemProfile, index) in addItemProfile" :key="itemProfile">
                        <InventoryCommonTableItemProfileAppend
                            v-model:itemProfile="addItemProfile[index]"
                            @add-item="doAddItemProfile"
                            @remove-item="removeAppendItemProfile"
                        />
                    </template>
                    <tr v-for="dataValue, index in newItemProfile" :key="index" class="bg-white border-b">
                        <template v-if="dataValue.is_edit">
                            <InventoryCommonTableItemProfileEdit
                                v-model:itemProfile="newItemProfile[index]"
                                @do-edit-item="doEditItem(dataValue, index)"
                                @do-hide-edit-item="hideEditItem(index)"
                            />
                        </template>
                        <template v-if="!dataValue.is_edit">
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.item_code }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.item_description }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.thickness_val }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.length_val }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.width_val }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.height_val }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.outside_diameter_val }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.inside_diameter_val }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.angle }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.size }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.volume }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.weight }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.grade }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.volts }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.plates }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.part_number }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.color }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.specification }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ getTypeUOM(dataValue.uom) }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.item_group }}
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                {{ dataValue.sub_item_group }}
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
