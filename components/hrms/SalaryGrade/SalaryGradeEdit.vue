<script lang="ts" setup>
import { useSalaryGradeStore } from "~/stores/hrms/setup/salarygrade"

const salaryGradeStore = useSalaryGradeStore()
const boardLoading = ref(false)
const snackbar = useSnackbar()

function cancelEdit () {
    salaryGradeStore.isEdit = false
}

async function handleSubmit () {
    try {
        await salaryGradeStore.editSalaryGrade()
        snackbar.add({
            type: "success",
            text: salaryGradeStore.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: salaryGradeStore.errorMessage || "something went wrong."
        })
    } finally {
        // accountType.clearMessages()
    }
}
</script>

<template>
    <LayoutBoards
        title="Edit Salary Grade"
        :loading="boardLoading"
        class="w-full h-fit border-t-8 rounded-lg border-teal-500"
    >
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label for="salary_grade" class="text-xs italic">Salary Grade Level</label>
                    <input
                        id="salaryGradeLevel"
                        v-model="salaryGradeStore.salaryGrade.salary_grade_level"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div class="flex flex-col">
                    <label for="salary_grade" class="text-md font-bold italic">Salary Grade Steps</label>
                    <div class="flex flex-col gap-2 bg-slate-100 p-3 rounded">
                        <div
                            v-for="sg, i in salaryGradeStore.salaryGrade.salary_grade_step"
                            :key="'editSalaryGrade' + sg.id + i"
                            class="flex gap-2"
                        >
                            <div class="flex flex-col gap-1 flex-1">
                                <label for="salary_grade" class="text-xs italic">STEP {{ sg.step_name }}
                                </label>
                                <input
                                    id="salaryGradeLevel"
                                    v-model="sg.monthly_salary_amount"
                                    type="number"
                                    step=".01"
                                    min="0"
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5"
                    @click.prevent="cancelEdit"
                >
                    Cancel
                </button>
                <button type="submit" class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5">
                    Update Salary Grade
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
