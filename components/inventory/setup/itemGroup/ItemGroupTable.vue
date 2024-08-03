<script setup lang="ts">
// import { storeToRefs } from "pinia"
import { useItemStore } from "@/stores/inventory/setup/itemgroup"
const itemStore = useItemStore()
const { list: itemLis, subitemgroup, itemgroup } = storeToRefs(itemStore)

interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

defineProps({
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    datas: {
        type: Array<any>,
        required: true,
    },
    actions: {
        type: Object,
        required: false,
        default: null,
    },
})

const showItemAppend = ref(false)
const editItemGroup = ref(false)
const boardLoading = ref(false)
const itemName = ref("")

const addItemGroup = () => {
    showItemAppend.value = false
    const newSubItemGroup = []
    subitemgroup.value.forEach((element) => {
        newSubItemGroup.push(element.name)
    })
    itemgroup.value.name = itemName
    itemgroup.value.sub_groups = newSubItemGroup
    itemStore.createItemGroup()
    itemStore.getItemGroups()
}
const addSubItemGroup = () => {
    subitemgroup.value.push({ name: "" })
}
const removeSubItemGroup = (id: number) => {
    delete subitemgroup.value[id]
    subitemgroup.value = subitemgroup.value.filter(function (data) {
        return data !== undefined
    })
}
const showItemGroup = () => {
    showItemAppend.value = true
}
const showEditItemGroup = () => {
    editItemGroup.value = true
}
const hideItemGroup = () => {
    showItemAppend.value = false
    subitemgroup.value = []
}

</script>
<template>
    <InventorySetupItemGroupLayoutBoards title="Item Group" class="w-full" :loading="boardLoading" :action="showItemGroup">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th scope="col" class="p-2">
                            Item
                        </th>
                        <th scope="col" class="p-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="showItemAppend" class="border-b-2 border-gray-300">
                        <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                            <div class="flex flex-col">
                                <div class="flex flex-row justify-center gap-1">
                                    <div class="flex flex-col">
                                        <input
                                            v-model="itemName"
                                            type="text"
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                        >
                                        <div class="addSubItem">
                                            <template v-for="(wrk, index) in subitemgroup" :key="index">
                                                <div class="subItem">
                                                    <div class="pl-12 flex flex-row">
                                                        <div class="itemText">
                                                            <input
                                                                v-model="wrk.name"
                                                                type="text"
                                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                                            >
                                                        </div>
                                                        <div class="cancel-control">
                                                            <button class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1" @click="removeSubItemGroup(index)">
                                                                <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <button class="bg-transparent text-xs text-left mb-4" @click="addSubItemGroup()">
                                                + Add Sub Group
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                            <div class="save-control">
                                <button class="text-emerald-700 font-medium rounded-lg text-lg hover:text-white hover:bg-emerald-700 px-2 py-1" @click="addItemGroup">
                                    <Icon name="mdi:plus" class="h-5 w-5 lg:h-5 lg:w-5" />
                                </button>
                            </div>
                            <div class="cancel-control">
                                <button
                                    class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1"
                                    @click="hideItemGroup"
                                >
                                    <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="dataValue, index in itemLis" :key="index" class="bg-white border-b">
                        <template v-if="editItemGroup">
                            <InventorySetupItemGroupEdit />
                        </template>
                        <template v-else>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                <div class="flex flex-col gap-1 my-2">
                                    <div class="text-lg">
                                        {{ dataValue.name }}
                                    </div>
                                    <div class="flex flex-col ml-7 text-sm">
                                        <span v-for="subData, subIndex in dataValue.sub_groups" :key="subIndex">
                                            {{ subData }}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                <button
                                    class="text-blue-500 bg-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    @click="showEditItemGroup"
                                >
                                    <Icon name="mdi:pencil" class="h-5 w-5 lg:h-5 lg:w-5" />
                                </button>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </InventorySetupItemGroupLayoutBoards>
</template>
