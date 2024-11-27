<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })

const profileStore = useItemProfileStore()
const { remarks, uom } = storeToRefs(profileStore)
onMounted(() => {
    if (!uom.value.isLoaded) {
        profileStore.getUOM()
    }
})
const getTypeUOM = (id:number) => {
    const symbol = uom.value.map((data: any) => {
        return data.id === id ? data.symbol : null
    }).filter((num:any): num is number => num !== null)
    return symbol ? symbol[0] : null
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id: number) => {
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
        }
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
const denyRequest = async (id: any) => {
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
        }
        closeViewModal()
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
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="Item Profile">
        <template #body>
            <div class="grid gap-2 md:justify-between">
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dataValue, index in data.item_profile" :key="index" class="bg-white border-b">
                                <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ dataValue.item_code }}
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
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="data.approvals" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData?.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
        </template>
    </PsModal>
</template>
