<script setup>
import { storeToRefs } from "pinia"
import { useSetupListsStore } from "@/stores/inventory/setup/lists"

const lists = useSetupListsStore()
lists.getProjectList()

const { projectList } = storeToRefs(lists)

const changePaginate = (newParams) => {
    if (projectList.value?.params) {
        projectList.value.params.page = newParams.page ?? 1
        lists.getProjectList()
    }
}

const headers = [
    { name: "Projects", id: "project_code" }
]
</script>
<template>
    <div>
        <div class="pb-2 text-gray-500 ">
            <LayoutBoards title="Projects List" class="w-full">
                <div>
                    <LayoutPsTable :header-columns="headers" :datas="projectList.list?? [] " :loading="projectList.isLoading" />
                </div>
                <div class="flex justify-center mx-auto p-2">
                    <PsCustomPagination
                        v-if="projectList?.pagination"
                        :links="projectList.pagination"
                        @change-params="changePaginate"
                    />
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
