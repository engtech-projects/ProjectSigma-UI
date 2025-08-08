<script setup>
import { storeToRefs } from "pinia"
import { useSetupListsStore } from "@/stores/inventory/setup/lists"
const lists = useSetupListsStore()
const { setupProjectsList } = storeToRefs(lists)
onMounted(() => {
    lists.getSetupProjectsList()
})
const changePaginate = (newParams) => {
    setupProjectsList.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "Projects", id: "project_code" },
    { name: "Status", id: "status" }
]
</script>
<template>
    <div>
        <div class="pb-2 text-gray-500 ">
            <LayoutBoards title="Projects List" class="w-full">
                <div>
                    <LayoutPsTable :header-columns="headers" :datas="setupProjectsList.list?? [] " :loading="setupProjectsList.isLoading" />
                </div>
                <div class="flex justify-center mx-auto p-2">
                    <PsCustomPagination
                        v-if="setupProjectsList?.pagination"
                        :links="setupProjectsList.pagination"
                        @change-params="changePaginate"
                    />
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
