<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: false,
        default: "",
    },
    subitemgroup: {
        type: Array,
        required: false,
        default: null,
    },
})

const updateItemGroup = () => {
    return ""
}

const cancelUpdateItemGroup = () => {
    return ""
}

</script>
<template>
    <InventoryCommonTableItemAppend @addItem="updateItemGroup" @hideItem="cancelUpdateItemGroup" :subitemholder="subitemgroup" />
    <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="save-control">
            <button class="text-emerald-700 font-medium rounded-lg text-lg hover:text-white hover:bg-emerald-700 px-2 py-1" @click="updateItemGroup">
                <Icon name="mdi:plus" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
        <div class="cancel-control">
            <button
                class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1"
                @click="cancelUpdateItemGroup"
            >
                <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
    </td>
</template>
