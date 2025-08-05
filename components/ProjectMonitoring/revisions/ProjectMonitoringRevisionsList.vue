<template>
    <LayoutBoards title="Project Revisions">
        <div class="text-gray-500 flex flex-col gap-4 p-2">
            <BasicSearchBar v-model:searchInput="searchInput" class="w-full my-2" />
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th
                            class="p-2 uppercase text-left bg-gray-100 text-xs"
                        >
                            Project Code
                        </th>
                        <th
                            class="p-2 uppercase text-left bg-gray-100 text-xs"
                        >
                            Project Name
                        </th>
                        <th
                            class="p-2 uppercase text-left bg-gray-100 text-xs"
                        >
                            Version
                        </th>
                        <th class="p-2 uppercase text-left bg-gray-100 text-xs">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td :colspan="4" class="text-center p-2">
                            NO DATA
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </LayoutBoards>
</template>

<script lang="ts" setup>
const searchInput = ref("")
</script>

<style>
</style>
