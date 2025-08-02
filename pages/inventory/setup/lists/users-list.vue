<script setup>
import { storeToRefs } from "pinia"
import { useSetupListsStore } from "@/stores/inventory/setup/lists"
const lists = useSetupListsStore()
const { usersList } = storeToRefs(lists)
onMounted(() => {
    lists.getUsersList()
})
const changePaginate = (newParams) => {
    usersList.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "Employee Name", id: "employee_name" },
    { name: "Username", id: "name" },
    { name: "Email", id: "email" }
]
</script>
<template>
    <div>
        <div class="pb-2 text-gray-500 ">
            <LayoutBoards title="Users List" class="w-full">
                <div>
                    <LayoutPsTable
                        :header-columns="headers"
                        :datas="usersList.list ?? [] "
                        :loading="usersList.isLoading"
                    />
                </div>
                <div class="flex justify-center mx-auto p-2">
                    <PsCustomPagination
                        v-if="usersList?.pagination"
                        :links="usersList.pagination"
                        @change-params="changePaginate"
                    />
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
