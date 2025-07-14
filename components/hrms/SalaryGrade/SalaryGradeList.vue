<script lang="ts" setup>
import { useSalaryGradeStore } from "~/stores/hrms/setup/salarygrade"
import { useModalStore } from "~/stores/modal"
const modalStore = useModalStore()
const salaryGradeStore = useSalaryGradeStore()
await salaryGradeStore.getSalaryGrade()
const snackbar = useSnackbar()
const toDelete = ref({})

function setEdit (sg: any) {
    salaryGradeStore.salaryGrade = sg
    salaryGradeStore.isEdit = true
}

const deleteSalaryGrade = async () => {
    modalStore.hideModal()
    try {
        salaryGradeStore.isLoading = true
        await salaryGradeStore.deleteSalaryGrade(toDelete.value.id)
        snackbar.add({
            type: "success",
            text: salaryGradeStore.successMessage
        })
    } finally {
        salaryGradeStore.isLoading = false
    }
}
function setDelete (_sg: any) {
    snackbar.add({
        type: "warning",
        text: "Delete has been temporarily disabled."
    })
    // toDelete.value = _sg
    // modalStore.showModal()
}
</script>
<template>
    <div>
        <LayoutBoards title="Salary Grade List" :loading="salaryGradeStore.isLoading" class="w-full h-fit">
            <table class="table w-full border">
                <thead>
                    <th class="text-left p-2 w-16">
                        Salary Grade
                    </th>
                    <th class="text-left p-2">
                        STEP 1
                    </th>
                    <th class="text-left p-2">
                        STEP 2
                    </th>
                    <th class="text-left p-2">
                        STEP 3
                    </th>
                    <th class="text-left p-2">
                        STEP 4
                    </th>
                    <th class="text-left p-2">
                        STEP 5
                    </th>
                    <th class="text-left p-2">
                        STEP 6
                    </th>
                    <th />
                </thead>
                <tbody>
                    <tr v-for="sg in salaryGradeStore.list" :key="sg.id" class="border">
                        <td class="p-2 w-16 text-center border">
                            {{ sg.salary_grade_level }}
                        </td>
                        <td v-for="st in sg.salary_grade_step" :key="st.id" class="p-2 text-left border">
                            {{ useFormatCurrency(st.monthly_salary_amount) }}
                        </td>
                        <td>
                            <div class="flex gap-2 items-center pl-2">
                                <Icon
                                    name="iconoir:edit"
                                    class="text-xl text-green-500 cursor-pointer hover:text-green-700"
                                    @click="setEdit(sg)"
                                />
                                <Icon
                                    v-show="false"
                                    name="iconoir:bin-minus-in"
                                    class="text-red-500 cursor-pointer hover:text-red-700"
                                    @click="setDelete(sg)"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!salaryGradeStore.list.length">
                        <td class="text-center">
                            No data available
                        </td>
                    </tr>
                </tbody>
            </table>
        </LayoutBoards>
        <ModalContainer size="modal-sm">
            <div class="flex flex-col gap-6">
                <center class="text-xl">
                    Do you want to delete this salary grade?
                </center>
                <div class="flex gap-3 justify-end">
                    <button class="px-4 py-2 text-white bg-slate-500 hover:bg-slate-600" @click="modalStore.hideModal">
                        Cancel
                    </button>
                    <button class="px-4 py-2 text-white bg-teal-500 hover:bg-teal-600" @click="deleteSalaryGrade()">
                        Proceed
                    </button>
                </div>
            </div>
        </ModalContainer>
    </div>
</template>

<style scoped></style>
