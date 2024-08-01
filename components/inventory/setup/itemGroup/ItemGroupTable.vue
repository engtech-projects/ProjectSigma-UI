<script setup>
// import { storeToRefs } from "pinia"
const showItemAppend = ref(false)
const itemData = ref([])
const addItemGroup = () => {
    itemData.value = null
}
const showItemGroup = () => {
    showItemAppend.value = true
}
const hideItemGroup = () => {
    showItemAppend.value = false
}
</script>
<template>
    <InventorySetupItemGroupLayoutBoards title="Item Group" class="w-full" :loading="boardLoading" :action="showItemGroup">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th scope="col" class="p-2">
                            <input type="checkbox">
                        </th>
                        <th scope="col" class="p-2">
                            Item
                        </th>
                        <th scope="col" class="p-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="showItemAppend">
                        <th scope="row" class="px-2 font-medium text-gray-900 whitespace-nowrap">
                            <input type="checkbox">
                        </th>
                        <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                            <div class="flex flex-col">
                                <div class="flex flex-row justify-center gap-1">
                                    <div class="flex flex-col">
                                        <input type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer">
                                        <div class="addSubItem">
                                            <div class="subItem">
                                                <div class="pl-12 flex flex-row">
                                                    <div class="itemText">
                                                        <input type="text" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer">
                                                    </div>
                                                    <div class="cancel-control">
                                                        <button class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1">
                                                            <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="bg-transparent text-xs text-left">
                                                + Add Sub Group
                                            </button>
                                        </div>
                                    </div>
                                    <div class="save-control">
                                        <button class="text-emerald-700 font-medium rounded-lg text-lg hover:text-white hover:bg-emerald-700 px-2 py-1" @click="addItemGroup">
                                            <Icon name="mdi:plus" class="h-5 w-5 lg:h-5 lg:w-5" />
                                        </button>
                                    </div>
                                    <div class="cancel-control">
                                        <button class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1" @click="hideItemGroup">
                                            <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                            <button class="text-blue-500 bg-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                <Icon name="mdi:pencil" class="h-5 w-5 lg:h-5 lg:w-5" />
                            </button>
                        </td>
                    </tr>
                    <tr class="bg-white border-b">
                        <th scope="row" class="px-2 font-medium text-gray-900 whitespace-nowrap">
                            <input type="checkbox">
                        </th>
                        <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                            Silver
                        </td>
                        <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                            <button class="text-blue-500 bg-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                <Icon name="mdi:pencil" class="h-5 w-5 lg:h-5 lg:w-5" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </InventorySetupItemGroupLayoutBoards>
</template>
