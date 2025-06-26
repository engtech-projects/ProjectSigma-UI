<script setup>
import { storeToRefs } from "pinia"
import { useSetupListsStore } from "@/stores/inventory/setup/lists"

const lists = useSetupListsStore()
lists.getEmployeeList()

const { employeeList } = storeToRefs(lists)

const changePaginate = (newParams) => {
    if (employeeList.value?.params) {
        employeeList.value.params.page = newParams.page ?? 1
        lists.getEmployeeList()
    }
}

const headers = [
    { name: "Employee", id: "fullname_last" }
]
</script>
<template>
    <div>
        <div class="pb-2 text-gray-500 ">
            <LayoutBoards title="Employee List" class="w-full">
                <div>
                    <LayoutPsTable :header-columns="headers" :datas="employeeList.list ?? [] " :loading="employeeList.isLoading" />
                </div>
                <div class="flex justify-center mx-auto p-2">
                    <CustomPagination
                        v-if="employeeList?.pagination"
                        :links="employeeList.pagination"
                        @change-params="changePaginate"
                    />
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
