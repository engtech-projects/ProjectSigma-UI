<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { itemDetails: List, getParams, pagination } = storeToRefs(mains)
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

</script>
<template>
    <LayoutBoards title="Item Profile List" class="w-full">
        <LayoutLoadingContainer class="w-full" :loading="List.isLoading">
            <div v-if="List && List.list.length > 0" class="mt-4 p-4 overflow-y-auto text-gray-500">
                <table class="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th class="p-2 border text-sm" rowspan="2">
                                Item Profile
                            </th>
                            <th class="p-2 border text-sm" colspan="2">
                                Stock Info
                            </th>
                            <th class="p-2 border text-sm" rowspan="2" colspan="1">
                                Action
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
                        <tr v-for="dataValue, index in List.list" :key="index" class="bg-white border">
                            <td class="border px-2 font-medium text-gray-900 whitespace-nowrap text-center py-1">
                                {{ dataValue.profile_summary }}
                            </td>
                            <td class="border px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                Lorem Ipsum
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                Lorem Ipsum
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                Lorem Ipsum
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <p class="text-center text-lg p-2">
                    NO DATA
                </p>
            </div>
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="pagination" @change-params="changePaginate" />
            </div>
        </LayoutLoadingContainer>
    </LayoutBoards>
</template>
