<script setup>
import { storeToRefs } from "pinia"
import { useAllowanceStore } from "@/stores/hrms/setup/allowance"

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

const submitAllowance = async (positionAllowance) => {
    try {
        boardLoading.value = true
        allowance.value = positionAllowance

        if (positionAllowance.id) {
            await allowances.editAllowance()
        } else {
            await allowances.createAllowance()
        }

        if (allowances.errorMessage) {
            snackbar.add({
                type: "error",
                text: allowances.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: allowances.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: "An error occurred while processing the allowance."
        })
    } finally {
        allowances.clearMessages()
        boardLoading.value = false
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
                        <td class="p-2 items-center flex justify-around">
                            <!-- {{ pos.name + ' ' + pos.id }} -->
                            {{ pos.dpt_name + ' - ' + pos.position_type }}({{ pos.name }})
                        </td>
                        <td class="flex gap-4 p-2 rounded-md">
                            <input
                                v-model="pos.amount"
                                class="rounded-md"
                                type="number"
                                step=".01"
                                min="0"
                                required
                            >

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
        <p hidden class="text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
    </LayoutBoards>
</template>
