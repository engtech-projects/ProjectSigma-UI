<script setup>
// import { storeToRefs } from "pinia"
</script>
<template>
    <LayoutBoards title="Allowance List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr class="flex justify-between">
                        <th class="p-2">
                            Item
                        </th>
                        <th class="p-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Item 1
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </LayoutBoards>
</template>
