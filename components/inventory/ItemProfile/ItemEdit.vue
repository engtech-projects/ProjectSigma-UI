<script setup lang="ts">
const props = defineProps({
    itemProfile: {
        type: Object,
        required: true,
    },
    uomTypes: {
        type: Object,
        required: true,
    },
    inventoryTypes: {
        type: Array,
        required: true,
    },
})
const { itemProfile, uomTypes } = props
const emit = defineEmits(["doEditItem", "doHideEditItem"])
const doEditItem = () => {
    emit("doEditItem")
}
const doHideItem = () => {
    emit("doHideEditItem")
}
</script>
<template>
    <td colspan="17" class="p-3 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-col">
            <div class="flex flex-row justify-start w-full gap-1">
                <div class="flex flex-col w-full">
                    <div class="w-full flex flex-col gap-2 py-2">
                        <div class="grid grid-cols-2 gap-2 mt-2">
                            <div class="flex-1 flex-col gap-4 p-2 mb-2 text-left">
                                <LayoutFormPsTextInput v-model="itemProfile.sku" title="SKU" />
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2 mb-2 text-left">
                                <InventoryCommonFormPsTextArea v-model="itemProfile.item_description" title="Item Description" />
                            </div>
                        </div>
                        <div class="grid grid-cols-4 gap-2">
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsNumberInput v-model="itemProfile.thickness_val" title="Thickness" />
                                </div>
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsNumberInput v-model="itemProfile.length_val" title="Length" />
                                </div>
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsNumberInput v-model="itemProfile.width_val" title="Width" />
                                </div>
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsNumberInput v-model="itemProfile.height_val" title="Height" />
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-4 gap-2">
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsNumberInput v-model="itemProfile.outside_diameter_val" title="Outside Diameter" />
                                </div>
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsNumberInput v-model="itemProfile.inside_diameter_val" title="Inside Diameter" />
                                </div>
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsTextInput v-model="itemProfile.specification" title="Specification" />
                                </div>
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsTextInput v-model="itemProfile.grade" title="Grade" />
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-5 gap-2">
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsTextInput v-model="itemProfile.volume" title="Volume" />
                                </div>
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <LayoutFormPsTextInput v-model="itemProfile.color" title="Color" />
                                </div>
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <InventoryCommonFormPsSelect v-model="itemProfile.inventory_type" title="Inventory Type" :select-list="props.inventoryTypes" />
                                </div>
                            </div>
                            <div class="flex-1 flex-col gap-4 p-2">
                                <div class="mb-2 text-left">
                                    <InventoryCommonFormPsSelect v-model="itemProfile.uom" title="UOM Type" :select-list="uomTypes.allType" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </td>
    <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="save-control">
            <button class="text-emerald-700 font-medium rounded-lg text-lg hover:text-white hover:bg-emerald-700 px-2 py-1" @click="doEditItem()">
                <Icon name="mdi:check" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
        <div class="cancel-control">
            <button
                class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1"
                @click="doHideItem"
            >
                <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
    </td>
</template>
