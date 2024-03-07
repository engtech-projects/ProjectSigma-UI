<script lang="ts" setup>
import { useSalaryGradeStore } from "~/stores/hrms/salarygrade"

const salaryGradeStore = useSalaryGradeStore()
const boardLoading = ref(false)
const snackbar = useSnackbar()
const salaryGradeStepInput = ref("")

async function handleSubmit () {
    if (salaryGradeStore.salaryGrade.salary_grade_step.length > 5) {
        try {
            boardLoading.value = true
            await salaryGradeStore.createSalaryGrade()
            if (salaryGradeStore.errorMessage !== "") {
                snackbar.add({
                    type: "error",
                    text: salaryGradeStore.errorMessage
                })
            } else {
                snackbar.add({
                    type: "success",
                    text: salaryGradeStore.successMessage
                })
            }
        } catch (error) {
            salaryGradeStore.errorMessage = errorMessage
            snackbar.add({
                type: "error",
                text: salaryGradeStore.errorMessage
            })
        } finally {
            salaryGradeStore.reset()
            boardLoading.value = false
        }
    } else {
        snackbar.add({
            type: "error",
            text: "6 salary grade steps are needed to proceed."
        })
    }
}
function addStep () {
    if (salaryGradeStore.salaryGrade.salary_grade_step.length < 6) {
        salaryGradeStore.salaryGrade.salary_grade_step.push({ step_name: salaryGradeStepInput.value })
        salaryGradeStepInput.value = ""
    } else {
        snackbar.add({
            type: "error",
            text: "Cannot exceed step 6."
        })
    }
}
function formatCurrency (number:number, locale = "en-US") {
    const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
    })

    return formatter.format(number)
}
function removeStep (step:any) {
    salaryGradeStore.salaryGrade.salary_grade_step = salaryGradeStore.salaryGrade.salary_grade_step.filter(st => st !== step)
}
</script>

<template>
    <LayoutBoards title="Create Salary Grade" :loading="boardLoading" class="w-full h-fit">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="salary_grade"
                        class="text-xs italic"
                    >Salary Grade Level</label>
                    <input
                        id="salaryGradeLevel"
                        v-model="salaryGradeStore.salaryGrade.salary_grade_level"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div class="flex gap-2 items-end">
                    <div class="flex-1">
                        <label
                            for="salary_grade_step"
                            class="text-xs italic"
                        >Step {{ salaryGradeStore.salaryGrade.salary_grade_step.length + 1 }}</label>
                        <input
                            id="salaryGradeStep"
                            v-model="salaryGradeStepInput"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <span v-if="salaryGradeStepInput !== '' && salaryGradeStore.salaryGrade.salary_grade_step.length < 6" class="cursor-pointer hover:bg-green-600 flex items-center justify-center w-10 h-10 bg-green-500 rounded text-white font-bold text-2xl pb-1" @click="addStep">+</span>
                    <span v-else class="flex items-center justify-center w-10 h-10 bg-slate-500 rounded text-white font-bold text-2xl pb-1">+</span>
                </div>
                <div class="flex flex-col gap-1">
                    <div v-for="sg,i in salaryGradeStore.salaryGrade.salary_grade_step" :key="i" class="flex justify-between bg-yellow-100 px-2 py-1">
                        <span>
                            STEP {{ i + 1 }}
                        </span>
                        <div class="flex gap-2 items-center">
                            <span>
                                {{ formatCurrency(sg.step_name) }}
                            </span>
                            <Icon name="iconoir:xmark" class="text-red-500 text-2xl font-bold cursor-pointer hover:text-red-700" @click="removeStep(sg)" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Salary Grade
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
