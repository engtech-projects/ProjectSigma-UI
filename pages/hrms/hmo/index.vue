<script setup lang="ts">
import { useModalStore } from "~/stores/modal"
import { useHMOStore } from "@/stores/hrms/setup/hmo"
const hmoStore = useHMOStore()
hmoStore.getHmo()
const modalStore = useModalStore()
const snackbar = useSnackbar()
const currentHmo = ref({})
const isLoading = ref(false)

const setDelete = (hmo:any) => {
    currentHmo.value = hmo
    modalStore.showModal()
}

const deleteHmo = async () => {
    try {
        modalStore.hideModal()
        isLoading.value = true
        await hmoStore.deleteHmo(currentHmo.value.id)
        snackbar.add({
            type: "success",
            text: hmoStore.successMessage
        })
    } finally {
        await hmoStore.getHmo()
        isLoading.value = false
    }
}
</script>
<template>
    <div
        class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto"
    >
        <AccountingLoadScreen :is-loading="isLoading" />
        <div class="flex justify-between">
            <label
                for=""
                class="text-xl font-semibold text-gray-900"
            >HMO
            </label>
            <NuxtLink
                to="/hrms/hmo/create"
                class="text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
            >
                <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
                <span>New HMO</span>
            </NuxtLink>
        </div>
        <table class="table w-full text-left mt-4">
            <thead class="border-b">
                <th class="py-2 font-light text-gray-500">
                    Name
                </th>
                <th class="py-2 font-light text-gray-500">
                    From
                </th>
                <th class="py-2 font-light text-gray-500">
                    To
                </th>
                <th class="py-2 font-light text-gray-500">
                    Employer Share
                </th>
                <th class="py-2 font-light text-gray-500">
                    Employee Share
                </th>
                <th class="py-2 font-light text-gray-500">
                    Actions
                </th>
            </thead>
            <tbody>
                <tr v-for="hmo in hmoStore.hmolist" :key="hmo.id">
                    <td>
                        {{ hmo.hmo_name }}
                    </td>
                    <td>
                        {{ hmo.hmo_start }}
                    </td>
                    <td>
                        {{ hmo.hmo_end }}
                    </td>
                    <td>
                        {{ useFormatCurrency(hmo.employer_share) }}
                    </td>
                    <td>
                        {{ useFormatCurrency(hmo.employee_share) }}
                    </td>
                    <td class="py-2">
                        <div class="flex gap-3 items-center">
                            <NuxtLink class="hidden" :to="'/hrms/hmo/edit?hmo_id=' + hmo.id">
                                <Icon name="ion:pencil" class="icon bg-teal-700 rounded h-8 w-8 p-1 cursor-pointer hover:bg-teal-500 text-white" />
                            </NuxtLink>
                            <div class="hidden">
                                <Icon name="ion:trash" class="icon bg-red-500 rounded h-8 w-8 p-1 cursor-pointer hover:bg-red-700 text-white hidden" @click="setDelete(hmo)" />
                            </div>
                            <NuxtLink :to="'/hrms/hmo/renew?hmo_id=' + hmo.id">
                                <Icon name="iconoir:crop-rotate-bl" class="icon bg-teal-700 rounded h-8 w-8 p-1 cursor-pointer hover:bg-teal-900 text-white" />
                            </NuxtLink>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <ModalContainer size="modal-sm">
            <div class="flex flex-col gap-6">
                <div class="text-xl mb-4 m-auto">
                    Do you want to delete this HMO?
                </div>
                <div class="flex gap-3 justify-end">
                    <button class="rounded px-4 py-2 text-white bg-slate-500 hover:bg-slate-600" @click="modalStore.hideModal">
                        Cancel
                    </button>
                    <button class="rounded px-4 py-2 text-white bg-teal-500 hover:bg-teal-600" @click="deleteHmo">
                        Proceed
                    </button>
                </div>
            </div>
        </ModalContainer>
    </div>
</template>
