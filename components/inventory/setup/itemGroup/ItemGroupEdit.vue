<script setup lang="ts">
const main = defineProps({
    data: {
        type: Object,
        required: true,
    },
})
const emit = defineEmits(["hideEdit", "updateItemgroup"])
const subgroup = ref([])
const name = ref(main.data.name)
main.data.sub_groups.forEach((element:any) => {
    subgroup.value.push({ name: element })
})
const doHideEdit = () => {
    emit("hideEdit")
}
const doUpdateItemGroup = (id: number, name: string, subgroup: array) => {
    emit("updateItemgroup", id, name, subgroup)
}
</script>
<template>
    <InventoryCommonTableEditItemAppend v-model:name="name" :subgroup="subgroup" />
    <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="save-control">
            <button class="text-emerald-700 font-medium rounded-lg text-lg hover:text-white hover:bg-emerald-700 px-2 py-1" @click="doUpdateItemGroup(data.id, name, subgroup)">
                <Icon name="mdi:check" class="h-5 w-5 lg:h-5 lg:w-5" />
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
