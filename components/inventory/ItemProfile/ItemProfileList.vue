<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { list: List, getParams, pagination } = storeToRefs(mains)
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Item Profile List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th class="p-2 border text-sm" rowspan="2">
                            Item Profile
                        </th>
                        <th class="p-2 border text-sm" colspan="2">
                            Stock Info
                        </th>
                    </tr>
                    <tr>
                        <th class="p-2 border text-sm">
                            Ware House
                        </th>
                        <th class="p-2 border text-sm">
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dataValue, index in List" :key="index" class="bg-white border-b">
                        <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                            <div class="flex flex-row justify-center">
                                <div class="icon">
                                    <Icon name="material-symbols:info-outline" class="text-blue-700 h-5 w-5 lg:h-5 lg:w-5" data-tooltip-target="tooltip-top" />
                                    <div id="tooltip-top" data-popover role="tooltip" class="absolute z-10 duration-300 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                                        <div class="list flex flex-col gap-2">
                                            <button class="bg-transparent cursor-pointer">
                                                Lorem Ipsum
                                                {{ dataValue.item_description }}
                                            </button>
                                        </div>
                                        <div class="tooltip-arrow" data-popper-arrow />
                                    </div>
                                </div>
                                <div class="context">
                                    {{ dataValue.item_description }}
                                </div>
                            </div>
                        </td>
                        <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                            Lorem Ipsum
                        </td>
                        <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                            Lorem Ipsum
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
