<script setup>
import { useSetupListsStore } from "@/stores/inventory/setup/lists"
const lists = useSetupListsStore()
const { warehouseList } = storeToRefs(lists)
onMounted(() => {
    lists.getWarehouseList()
})
const changePaginate = (newParams) => {
    warehouseList.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "Warehouse Name", id: "name" },
    { name: "Location", id: "location" },
    { name: "Project", id: "owner_name" },
]
</script>
<template>
    <div>
        <div class="pb-2 text-gray-500 ">
            <LayoutBoards title="Projects List" class="w-full">
                <div>
                    <LayoutPsTable :header-columns="headers" :datas="warehouseList.list?? [] " :loading="warehouseList.isLoading" />
                </div>
                <div class="flex justify-center mx-auto p-2">
                    <PsCustomPagination
                        v-if="warehouseList?.pagination"
                        :links="warehouseList.pagination"
                        @change-params="changePaginate"
                    />
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
