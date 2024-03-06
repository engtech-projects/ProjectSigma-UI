<script lang="ts" setup>
import { useSalaryGradeStore } from "~/stores/hrms/salarygrade"
const salaryGradeStore = useSalaryGradeStore()
await salaryGradeStore.getSalaryGrade()
console.log(salaryGradeStore.list)
const salaryData = [
    {
        grade: 1,
        steps: [
            "9,000.00",
            "9,100.00",
            "9,200.00",
            "9,300.00",
            "9,400.00",
            "9,500.00",
        ]
    },
    {
        grade: 2,
        steps: [
            "10,000.00",
            "10,100.00",
            "10,200.00",
            "10,300.00",
            "10,400.00",
            "10,500.00",
        ]
    },
    {
        grade: 3,
        steps: [
            "11,000.00",
            "11,100.00",
            "11,200.00",
            "11,300.00",
            "11,400.00",
            "11,500.00",
        ]
    },
    {
        grade: 4,
        steps: [
            "12,000.00",
            "12,100.00",
            "12,200.00",
            "12,300.00",
            "12,400.00",
            "12,500.00",
        ]
    },
    {
        grade: 5,
        steps: [
            "13,000.00",
            "13,100.00",
            "13,200.00",
            "13,300.00",
            "13,400.00",
            "13,500.00",
        ]
    },
    {
        grade: 6,
        steps: [
            "14,000.00",
            "14,100.00",
            "14,200.00",
            "14,300.00",
            "14,400.00",
            "14,500.00",
        ]
    },
    {
        grade: 7,
        steps: [
            "15,000.00",
            "15,100.00",
            "15,200.00",
            "15,300.00",
            "15,400.00",
            "15,500.00",
        ]
    },
    {
        grade: 8,
        steps: [
            "16,000.00",
            "16,100.00",
            "16,200.00",
            "16,300.00",
            "16,400.00",
            "16,500.00",
        ]
    },
    {
        grade: 9,
        steps: [
            "17,000.00",
            "17,100.00",
            "17,200.00",
            "17,300.00",
            "17,400.00",
            "17,500.00",
        ]
    },
    {
        grade: 10,
        steps: [
            "18,000.00",
            "18,100.00",
            "18,200.00",
            "18,300.00",
            "18,400.00",
            "18,500.00",
        ]
    },
    {
        grade: 11,
        steps: [
            "19,000.00",
            "19,100.00",
            "19,200.00",
            "19,300.00",
            "19,400.00",
            "19,500.00",
        ]
    }
]
</script>

<template>
    <div>
        <LayoutBoards title="Salary Grade List" :loading="boardLoading" class="w-full h-fit">
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
                    <tr v-for="sg in salaryData" :key="sg.grade" class="border">
                        <td class="p-2 w-16 text-center border">
                            {{ sg.grade }}
                        </td>
                        <td v-for="st in sg.steps" :key="st" class="p-2 text-left border">
                            {{ st }}
                        </td>
                    </tr>
                    <!-- <tr v-if="!availableAccounts.length">
                        <td class="text-center">
                            No accounts available
                        </td>
                    </tr> -->
                </tbody>
            </table>
        </LayoutBoards>
    </div>
</template>

<style scoped></style>
