<template>
    <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-3">
            <div class="flex gap-2 items-end p-0">
                <label for="" class="mb-0 leading-3 w-1/5">Contract ID:</label>
                <input type="text" class="border-0 border-b border-gray-400 flex-1 focus:ring-0 p-0">
            </div>
            <div class="flex gap-2 items-end">
                <label for="" class="mb-0 leading-3 w-1/5">Contract Name:</label>
                <input type="text" class="border-0 border-b border-gray-400 flex-1 focus:ring-0 p-0">
            </div>
            <div class="flex gap-2 items-end">
                <label for="" class="mb-0 leading-3 w-1/5">Contract Location:</label>
                <input type="text" class="border-0 border-b border-gray-400 flex-1 focus:ring-0 p-0">
            </div>
        </div>

        <h1 class="text-center font-bold text-2xl">
            BILL OF QUANTITIES
        </h1>
        <div class="flex justify-end">
            <button class="bg-gray-200 px-4 py-1 rounded-lg hover:bg-green-500 hover:text-white active:bg-green-600" @click="showModal=true">
                + Add New Section
            </button>
        </div>
        <ModalContainer
            :local="showModal"
            :show="true"
            size="modal-xxl"
            title="New Section"
            @hide="showModal=false"
        >
            <div class="flex flex-col mb-10">
                <div class="flex items-center">
                    <h4 class="w-2/12">
                        Contract ID
                    </h4>
                    <span>
                        <span class="mr-2">:</span> 23NO0140'!B2
                    </span>
                </div>
                <div class="flex items-center">
                    <h4 class="w-2/12">
                        Contract Name
                    </h4>
                    <span>
                        <span class="mr-2">:</span> Construction of flood control along Tago river, Abutment A, San Miguel, Surigao del Sur
                    </span>
                </div>
                <div class="flex items-center">
                    <h4 class="w-2/12">
                        Contract Location
                    </h4>
                    <span>
                        <span class="mr-2">:</span> San Miguel, Surigao del Sur
                    </span>
                </div>
            </div>
            <div class="flex flex-col gap-4 w-full relative">
                <div class="border-y block w-full py-2">
                    <h3 class="block text-center font-bold">
                        DETAILED ESTIMATES
                    </h3>
                </div>
                <table class="w-full">
                    <thead>
                        <th class="w-1/5">
                            Item No.
                        </th>
                        <th class="w-2/5">
                            Item Description
                        </th>
                        <th class="w-1/5">
                            Qty
                        </th>
                        <th class="w-1/5">
                            Unit
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="w-1/5">
                                <input type="text" class="border-0 bg-gray-200 w-full">
                            </td>
                            <td class="w-2/5">
                                <input type="text" class="border-0 bg-gray-200 w-full">
                            </td>
                            <td class="w-1/5">
                                <input type="text" class="border-0 bg-gray-200 w-full">
                            </td>
                            <td class="w-1/5">
                                <input type="text" class="border-0 bg-gray-200 w-full">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-center">
                    <button class="bg-green-500 text-white px-4 py-[3px] rounded-lg hover:bg-green-600 active:bg-green-500">
                        Add Item
                    </button>
                </div>
            </div>
        </ModalContainer>
    </div>
</template>

<script lang="ts" setup>
const showModal = ref(true)
</script>

<style scoped>
    input:focus {
        outline: none!important;
    }
</style>
