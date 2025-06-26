<script setup>
import { storeToRefs } from "pinia"
import { useSetupListsStore } from "@/stores/inventory/setup/lists"

const lists = useSetupListsStore()
lists.getUsersList()

const { usersList } = storeToRefs(lists)

const changePaginate = (newParams) => {
    if (usersList.value?.params) {
        usersList.value.params.page = newParams.page ?? 1
        lists.getUsersList()
    }
}

const headers = [
    { name: "Name", id: "name" },
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
                    <CustomPagination
                        v-if="usersList?.pagination"
                        :links="usersList.pagination"
                        @change-params="changePaginate"
                    />
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
