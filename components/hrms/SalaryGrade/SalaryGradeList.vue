<script lang="ts" setup>
import { useSalaryGradeStore } from "~/stores/hrms/salarygrade"
const salaryGradeStore = useSalaryGradeStore()
await salaryGradeStore.getSalaryGrade()
const utils = useUtilities()

function setEdit (sg) {
    salaryGradeStore.salaryGrade = sg
    salaryGradeStore.isEdit = true
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
                            {{ utils.formatCurrency(st.step_name) }}
                        </td>
                        <td>
                            <div class="flex gap-2 items-center pl-2">
                                <Icon name="iconoir:edit" class="text-xl text-green-500 cursor-pointer hover:text-green-700" @click="setEdit(sg)" />
                                <Icon name="iconoir:bin-minus-in" class="text-red-500 cursor-pointer hover:text-red-700" />
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
    </div>
</template>

<style scoped></style>
