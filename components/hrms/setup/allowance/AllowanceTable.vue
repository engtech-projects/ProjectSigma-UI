<script setup>
import { storeToRefs } from "pinia"
import { useAllowanceStore } from "@/stores/allowance"

const allowances = useAllowanceStore()

const { allowance, getParams, pagination, errorMessage, successMessage, positionAllowances } = storeToRefs(allowances)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}

const submitAllowance = (positionAllowance) => {
    if (!positionAllowance.id) {
        boardLoading.value = true
        allowance.value = positionAllowance
        allowances.createAllowance()
        snackbar.add({
            type: "success",
            text: positions.successMessage
        })
    } else {
        boardLoading.value = false
        allowance.value = positionAllowance
        allowances.editAllowance()
        snackbar.add({
            type: "success",
            text: positions.successMessage
        })
    }
}

</script>

<template>
    <LayoutBoards title="Allowance List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr class="flex justify-between">
                        <th class="p-2">
                            Position
                        </th>
                        <th class="p-2">
                            Allowance Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pos, index in positionAllowances " :key="index" class="border flex justify-between">
                        <td class="p-2">
                            {{ pos.name }}
                        </td>
                        <td class="flex gap-4 p-2 rounded-md">
                            {{ pos.amount }}
                            <input v-model="pos.amount" class="rounded-md" type="number">
                            <button type="submit" class="rounded-md bg-green-400 p-2 text-white hover:bg-green-500" @click.prevent="submitAllowance(pos)">
                                Save Changes
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
    </LayoutBoards>
</template>
