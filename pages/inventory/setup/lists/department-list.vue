<script setup>
import { storeToRefs } from "pinia"
import { useSetupListsStore } from "@/stores/inventory/setup/lists"

const lists = useSetupListsStore()
onMounted(() => {
    lists.getDepartmentList()
})

const { departmentList } = storeToRefs(lists)

const changePaginate = (newParams) => {
    departmentList.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Department", id: "department_name" }
]
</script>
<template>
    <div>
        <div class="pb-2 text-gray-500 ">
            <LayoutBoards title="Department List" class="w-full" :loading="departmentList.isLoading">
                <div>
                    <LayoutPsTable :header-columns="headers" :datas="departmentList.list ?? []" />
                </div>
                <div class="flex justify-center mx-auto p-2">
                    <PsCustomPagination
                        v-if="departmentList?.pagination"
                        :links="departmentList.pagination"
                        @change-params="changePaginate"
                    />
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
