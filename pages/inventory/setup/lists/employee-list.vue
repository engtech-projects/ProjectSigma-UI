<script setup>
import { storeToRefs } from "pinia"
import { useSetupListsStore } from "@/stores/inventory/setup/lists"
const lists = useSetupListsStore()
const { employeeList } = storeToRefs(lists)
onMounted(() => {
    lists.getEmployeeList()
})
const changePaginate = (newParams) => {
    employeeList.value.params.page = newParams.page ?? ""
    lists.getEmployeeList()
}
const headers = [
    { name: "Employee", id: "fullname_last" },
    { name: "Sex", id: "sex" },
    { name: "Date of Birth", id: "date_of_birth" },
    { name: "Age", id: "age" },
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
                    <PsCustomPagination
                        v-if="employeeList?.pagination"
                        :links="employeeList.pagination"
                        @change-params="changePaginate"
                    />
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
