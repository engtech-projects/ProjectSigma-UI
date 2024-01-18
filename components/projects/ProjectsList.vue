<script setup lang="ts">

const headers = [
    { name: "Project Name", id: "project_name" },
]

const actions = {
    edit: true,
    delete: true
}

const loading = ref(true)

// setTimeout(() => {
//     loading.value = false
// }, 5000)

const data = [
    { id: 1, project_name: "Alpha" },
    { id: 1, project_name: "Beta" },
    { id: 1, project_name: "Omega" },
    { id: 1, project_name: "Sigma" },
    { id: 1, project_name: "Theta" },
]
</script>

<template>
    <LayoutBoards title="Project List" class="w-full p-4">
        <load-screen v-if="loading" message="Please wait..." />
        <div class="pb-2 text-gray-500">
            <LayoutPsTable
                :header-columns="headers"
                :datas="data"
                :actions="actions"
            />
        </div>
        <!-- <div class="flex justify-center mx-auto">
            <CustomPagination
                :links="pagination"
                @change-params="changePaginate"
            />
        </div> -->
    </LayoutBoards>
</template>
