<script setup lang="ts">
const a = defineProps({
    nameholder: {
        type: String,
        required: true,
    },
    subitemgroup: {
        type: Array,
        required: true,
    },
})
const itemname = ref([{ name: a.nameholder }])
const emit = defineEmits(["hideEdit", "updateItemgroup"])
const doHideEdit = () => {
    emit("hideEdit")
}
const doUpdateItemGroup = (data: object) => {
    emit("updateItemgroup", data.name)
}
</script>

<template>
    <InventoryCommonTableEditItemAppend :nameholder="itemname" :subitemgroup="a.subitemgroup" />
    <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="save-control">
            <button class="text-emerald-700 font-medium rounded-lg text-lg hover:text-white hover:bg-emerald-700 px-2 py-1" @click="doUpdateItemGroup(itemname[0])">
                <Icon name="mdi:plus" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
        <div class="cancel-control">
            <button
                class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1"
                @click="doHideEdit"
            >
                <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
    </td>
</template>
