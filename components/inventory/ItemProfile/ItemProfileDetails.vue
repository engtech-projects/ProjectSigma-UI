<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

defineProps({
    title: {
        type: String,
        required: true,
    },
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    data: {
        type: Array<any>,
        required: true,
    },
    request: {
        type: Object,
        required: true,
    },
})

const { data: userData } = useAuth()

const profileStore = useItemProfileStore()

const snackbar = useSnackbar()
const boardLoading = ref(false)

const { remarks, uom } = storeToRefs(profileStore)
const getTypeUOM = (id:number) => {
    if (uom.value.length >= 1) {
        const symbol = uom.value.map((data: any) => {
            return data.id === id ? data.name : null
        }).filter((num:any): num is number => num !== null)

        return symbol ? symbol[0] : null
    }
    return null
}

const approvedRequest = async (id:number) => {
    try {
        boardLoading.value = true
        await profileStore.approveApprovalForm(id)
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
            navigateTo({
                path: "/inventory/item-profile/new-profile",
                replace: true
            })
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
const denyRequest = async (id:any) => {
    try {
        boardLoading.value = true
        await profileStore.denyApprovalForm(id)
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
            navigateTo({
                path: "/inventory/item-profile/new-profile",
                replace: true
            })
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
</script>
<template>
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <div id="headline mb-4">
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-between border-b rounded-t">
                    <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                        {{ title }}
                    </h3>
                </div>
            </div>
            <LayoutPrint>
                <div id="itemDetails">
                    <div id="content" class="overflow-auto">
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="dataValue, index in data" :key="index" class="bg-white border-b">
                                    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                        <div class="flex flex-row justify-center gap-2">
                                            <template v-if="dataValue.similar_items.length >= 1">
                                                <InventoryCommonItemProfileSimilarItems :datas="dataValue.similar_items" />
                                            </template>
                                            <div class="context">
                                                {{ dataValue.item_code }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                        {{ dataValue.item_description }}
                                    </td>
                                    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                        {{ dataValue.thickness }}
                                    </td>
                                    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                        {{ dataValue.length }}
                                    </td>
                                    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                        {{ dataValue.width }}
                                    </td>
                                    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                        {{ dataValue.height }}
                                    </td>
                                    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                        {{ dataValue.outside_diameter }}
                                    </td>
                                    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                        {{ dataValue.inside_diameter }}
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="approvals" class="w-full">
                        <LayoutApprovalsListView :approvals="request.approvals" />
                    </div>
                </div>
            </LayoutPrint>
            <div id="footer">
                <div v-if="request.next_approval?.user_id === userData?.id" class="flex gap-2 p-2 justify-end relative">
                    <HrmsCommonApprovalDenyButton
                        v-model:deny-remarks="remarks"
                        :request-id="request.id"
                        @approve="approvedRequest"
                        @deny="denyRequest"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
