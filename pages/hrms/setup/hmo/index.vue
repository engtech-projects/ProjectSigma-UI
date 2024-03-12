<script setup lang="ts">
import { useModalStore } from "~/stores/modal"
const modalStore = useModalStore()
</script>

<template>
    <div
        class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto"
    >
        <label
            for=""
            class="text-xl font-semibold text-gray-900"
        >List of HMO</label>
        <table class="table w-full text-left mt-4">
            <thead class="border-b">
                <th class="py-2">
                    Name
                </th>
                <th class="py-2">
                    From
                </th>
                <th class="py-2">
                    To
                </th>
                <th class="py-2">
                    Amount
                </th>
                <th class="py-2">
                    Actions
                </th>
            </thead>
            <tbody>
                <tr>
                    <td class="py-2">
                        Pacific Cross Inc.
                    </td>
                    <td class="py-2">
                        February 1, 2024
                    </td>
                    <td class="py-2">
                        February 29, 2024
                    </td>
                    <td class="py-2">
                        500,000.00
                    </td>
                    <td class="py-2">
                        <div class="flex gap-3 items-center">
                            <Icon name="iconoir:edit" class="icon bg-green-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-green-500" />
                            <Icon name="iconoir:trash" class="icon bg-red-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-red-500" />
                            <Icon name="iconoir:crop-rotate-bl" class="icon bg-blue-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-blue-500" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="py-2">
                        Pacific Cross Inc.
                    </td>
                    <td class="py-2">
                        February 1, 2024
                    </td>
                    <td class="py-2">
                        February 29, 2024
                    </td>
                    <td class="py-2">
                        500,000.00
                    </td>
                    <td class="py-2">
                        <div class="flex gap-3 items-center">
                            <NuxtLink :to="'/hrms/setup/hmo/edit/' + 1">
                                <Icon name="iconoir:edit" class="icon bg-green-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-green-500" />
                            </NuxtLink>
                            <Icon name="iconoir:trash" class="icon bg-red-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-red-500" @click="modalStore.showModal" />
                            <NuxtLink :to="'/hrms/setup/hmo/renew/' + 1">
                                <Icon name="iconoir:crop-rotate-bl" class="icon bg-blue-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-blue-500" />
                            </NuxtLink>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="py-2">
                        Pacific Cross Inc.
                    </td>
                    <td class="py-2">
                        February 1, 2024
                    </td>
                    <td class="py-2">
                        February 29, 2024
                    </td>
                    <td class="py-2">
                        500,000.00
                    </td>
                    <td class="py-2">
                        <div class="flex gap-3 items-center">
                            <Icon name="iconoir:edit" class="icon bg-green-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-green-500" />
                            <Icon name="iconoir:trash" class="icon bg-red-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-red-500" />
                            <Icon name="iconoir:crop-rotate-bl" class="icon bg-blue-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-blue-500" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="py-2">
                        Pacific Cross Inc.
                    </td>
                    <td class="py-2">
                        February 1, 2024
                    </td>
                    <td class="py-2">
                        February 29, 2024
                    </td>
                    <td class="py-2">
                        500,000.00
                    </td>
                    <td class="py-2">
                        <div class="flex gap-3 items-center">
                            <Icon name="iconoir:edit" class="icon bg-green-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-green-500" />
                            <Icon name="iconoir:trash" class="icon bg-red-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-red-500" />
                            <Icon name="iconoir:crop-rotate-bl" class="icon bg-blue-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-blue-500" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="py-2">
                        Pacific Cross Inc.
                    </td>
                    <td class="py-2">
                        February 1, 2024
                    </td>
                    <td class="py-2">
                        February 29, 2024
                    </td>
                    <td class="py-2">
                        500,000.00
                    </td>
                    <td class="py-2">
                        <div class="flex gap-3 items-center">
                            <Icon name="iconoir:edit" class="icon bg-green-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-green-500" />
                            <Icon name="iconoir:trash" class="icon bg-red-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-red-500" />
                            <Icon name="iconoir:crop-rotate-bl" class="icon bg-blue-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-blue-500" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="py-2">
                        Pacific Cross Inc.
                    </td>
                    <td class="py-2">
                        February 1, 2024
                    </td>
                    <td class="py-2">
                        February 29, 2024
                    </td>
                    <td class="py-2">
                        500,000.00
                    </td>
                    <td class="py-2">
                        <div class="flex gap-3 items-center">
                            <Icon name="iconoir:edit" class="icon bg-green-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-green-500" />
                            <Icon name="iconoir:trash" class="icon bg-red-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-red-500" />
                            <Icon name="iconoir:crop-rotate-bl" class="icon bg-blue-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-blue-500" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <ModalContainer size="modal-sm">
            <div class="flex flex-col gap-6">
                <center class="text-xl mb-4">
                    Do you want to delete this HMO?
                </center>
                <div class="flex gap-3 justify-end">
                    <button class="rounded px-4 py-2 text-white bg-slate-500 hover:bg-slate-600" @click="modalStore.hideModal">
                        Cancel
                    </button>
                    <button class="rounded px-4 py-2 text-white bg-teal-500 hover:bg-teal-600" @click="modalStore.hideModal">
                        Proceed
                    </button>
                </div>
            </div>
        </ModalContainer>
    </div>
</template>
