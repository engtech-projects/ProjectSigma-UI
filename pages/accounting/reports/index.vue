<template>
    <div class="flex flex-col gap-4 min-h-screen">
        <div class="flex gap-4 items-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">
                Reports
            </h1>
            <select id="accountType" v-model="reportType" class="rounded-lg w-1/4" required>
                <option v-for="report in reports" :key="report.value" :value="report.value">
                    {{ report.name }}
                </option>
            </select>
        </div>
        <LayoutPrint v-if="reportType">
            <component :is="reportComponent" />
        </LayoutPrint>
    </div>
</template>

<script lang="ts" setup>
import AccountingReportsBalanceSheet from "~/components/accounting/reports/BalanceSheet.vue"
import AccountingReportsBookBalance from "~/components/accounting/reports/BookBalance.vue"
import AccountingReportsIncomeStatement from "~/components/accounting/reports/IncomeStatement.vue"
import AccountingReportsStatementOfCashFlow from "~/components/accounting/reports/StatementOfCashFlow.vue"
import AccountingReportsOfficeCode from "~/components/accounting/reports/OfficeCode.vue"
import AccountingReportsOfficeHumanResource from "~/components/accounting/reports/OfficeHumanResource.vue"
import AccountingReportsMonthlyProjectExpenses from "~/components/accounting/reports/MonthlyProjectExpenses.vue"
import AccountingReportsMonthlyUnliquidatedCashAdvances from "~/components/accounting/reports/MonthlyUnliquidatedCashAdvances.vue"
import AccountingReportsExpensesfortheMonth from "~/components/accounting/reports/ExpensesfortheMonth.vue"

const reportType = ref(null)
const reports = ref([
    {
        name: "Balance Sheet",
        value: "balance-sheet",
        component: AccountingReportsBalanceSheet,
    },
    {
        name: "Book Balance",
        value: "book-balance",
        component: AccountingReportsBookBalance,
    },
    {
        name: "Income Statement",
        value: "income-statement",
        component: AccountingReportsIncomeStatement,
    },
    {
        name: "Statement of Cash Flow",
        value: "statement-of-cash-flow",
        component: AccountingReportsStatementOfCashFlow,
    },
    {
        name: "Office Code",
        value: "office-code",
        component: AccountingReportsOfficeCode,
    },
    {
        name: "Office Human Resource",
        value: "office-human-resource",
        component: AccountingReportsOfficeHumanResource,
    },
    {
        name: "Monthly Project Expenses",
        value: "monthly-project-expenses",
        component: AccountingReportsMonthlyProjectExpenses,
    },
    {
        name: "Monthly Unliquidated Cash Advances",
        value: "monthly-unliquidated-cash-advances",
        component: AccountingReportsMonthlyUnliquidatedCashAdvances,
    },
    {
        name: "Expenses for the Month",
        value: "expenses-for-the-month",
        component: AccountingReportsExpensesfortheMonth,
    },
])
const reportComponent = computed(() => {
    return reports.value.find(report => report.value === reportType.value)?.component
})
</script>

<style>

</style>
