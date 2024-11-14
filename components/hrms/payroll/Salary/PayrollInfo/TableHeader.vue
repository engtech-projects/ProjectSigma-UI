<script setup>
defineProps({
    loans: {
        type: Array,
        required: true,
    },
    otherdeductions: {
        type: Array,
        required: true,
    },
})
</script>
<template>
    <thead
        class="text-xs text-black uppercase bg-sky-50 dark:bg-gray-950"
    >
        <tr>
            <th
                scope="col"
                rowspan="3"
                class="p-2 border-solid border border-slate-400"
            >
                No
            </th>
            <th
                scope="col"
                colspan="2"
                class="p-2 border-solid border border-slate-400 bg-sky-200"
            >
                Name
            </th>
            <th
                scope="col"
                rowspan="3"
                class="p-2 border-solid border border-slate-400 bg-sky-200"
            >
                Designation
            </th>
            <th
                scope="col"
                rowspan="3"
                class="p-4 border-solid border border-slate-400 bg-sky-200"
            >
                Salary Grade
            </th>
            <th
                scope="col"
                colspan="8"
                class="p-2 border-solid border border-slate-400 bg-sky-200"
            >
                Hrs. Worked
            </th>
            <th
                scope="col"
                :colspan="9"
                class="p-2 border-solid border border-slate-400 bg-sky-200"
            >
                Gross Pay
            </th>
            <th
                scope="col"
                rowspan="3"
                class="px-6 border-solid border border-slate-400 bg-sky-200"
            >
                Total Gross Pay
            </th>
            <th
                scope="col"
                :colspan="7 + (loans.length || 1) + (otherdeductions.length || 1)"
                class="p-2 border-solid border border-slate-400 bg-sky-200"
            >
                Salary Deduction
            </th>
            <th
                scope="col"
                rowspan="3"
                class="px-2 py-3 border-solid border border-slate-400 bg-sky-200"
            >
                Total Deduction
            </th>
            <th
                scope="col"
                rowspan="3"
                class="px-6 py-3 border-solid border border-slate-400 bg-sky-200"
            >
                Total Net Pay
            </th>
            <th
                scope="col"
                rowspan="3"
                class="px-6 py-3 border-solid border border-slate-400 bg-sky-200"
            >
                Signature
            </th>
        </tr>
        <tr>
            <th
                rowspan="2"
                class="px-8 border-solid border border-slate-400 text-xs"
            >
                Last Name
            </th>
            <th
                rowspan="2"
                class="px-8 border-solid border border-slate-400"
            >
                First Name
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Reg. Hrs
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Rest Day/Sunday
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Reg. Hol.
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Spc. Hol.
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Reg O.T
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Rest Day. O.T
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Reg. Hol. O.T
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Spc. Hol. O.T
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Reg.
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Rest Day/Sun
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Reg.Hol
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Spc. Hol.
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Reg. O.T.
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Rest Day O.T
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Reg.Hol. O.T
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Spc.Hol. O.T
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                Adjustments
            </th>
            <th
                class="px-4 border-solid border border-slate-400"
                colspan="3"
            >
                SSS
            </th>
            <th
                class="px-4 border-solid border border-slate-400"
                rowspan="2"
            >
                PHIC
            </th>
            <th
                class="px-4 border-solid border border-slate-400"
                rowspan="2"
            >
                HMDF
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                EWTC
            </th>
            <th
                rowspan="2"
                class="px-4 border-solid border border-slate-400"
            >
                CASH ADVANCE
            </th>
            <th
                :colspan="loans.length"
                class="px-4 border-solid border border-slate-400"
            >
                LOANS
            </th>
            <th
                :colspan="otherdeductions.length"
                class="px-4 border-solid border border-slate-400"
            >
                OTHER DEDUCTIONS
            </th>
        </tr>
        <tr>
            <th
                class="px-4 border-solid border border-slate-400"
            >
                Employee Contribution
            </th>
            <th
                class="px-4 border-solid border border-slate-400"
            >
                Employee Compensation
            </th>
            <th
                class="px-4 border-solid border border-slate-400"
            >
                Employee WISP
            </th>
            <th
                v-if="loans.length === 0"
                class="px-4 border-solid border border-slate-400"
            >
                -
            </th>
            <th
                v-for="loan, key in loans"
                :key="key"
                class="px-4 border-solid border border-slate-400"
            >
                {{ loan }}
            </th>
            <th
                v-if="otherdeductions.length === 0"
                class="px-4 border-solid border border-slate-400"
            >
                -
            </th>
            <th
                v-for="otherdeduction, key in otherdeductions"
                :key="key"
                class="px-4 border-solid border border-slate-400"
            >
                {{ otherdeduction }}
            </th>
        </tr>
    </thead>
</template>
