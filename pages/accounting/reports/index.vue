<template>
    <div class="flex flex-col gap-4 min-h-screen">
        <div class="flex gap-4 items-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">
                Reports
            </h1>
            <select id="accountType" v-model="reportType" class="rounded-lg w-1/4" required>
                <template v-for="report in reports" :key="report.value">
                    <option v-if="useCheckAccessibility(report.permissions)" :value="report.value">
                        {{ report.name }}
                    </option>
                </template>
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
import AccountingReportsStatementOfCashFlow from "~/components/accounting/reports/StatementofCashFlow.vue"
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
        permissions: [AccessibilityTypes.ACCOUNTING_REPORTS_BALANCE_SHEET],
    },
    {
        name: "Book Balance",
        value: "book-balance",
        component: AccountingReportsBookBalance,
        permissions: [AccessibilityTypes.ACCOUNTING_REPORTS_BOOK_BALANCE],
    },
    {
        name: "Income Statement",
        value: "income-statement",
        component: AccountingReportsIncomeStatement,
        permissions: [AccessibilityTypes.ACCOUNTING_REPORTS_EXPENSES_FOR_THE_MONTH],
    },
    {
        name: "Statement of Cash Flow",
        value: "statement-of-cash-flow",
        component: AccountingReportsStatementOfCashFlow,
        permissions: [AccessibilityTypes.ACCOUNTING_REPORTS_INCOME_STATEMENT],
    },
    {
        name: "Office Code",
        value: "office-code",
        component: AccountingReportsOfficeCode,
        permissions: [AccessibilityTypes.ACCOUNTING_REPORTS_MONTHLY_PROJECT_EXPENSES],
    },
    {
        name: "Office Human Resource",
        value: "office-human-resource",
        component: AccountingReportsOfficeHumanResource,
        permissions: [AccessibilityTypes.ACCOUNTING_REPORTS_MONTHLY_UNLIQUIDATED_CASH_ADVANCES],
    },
    {
        name: "Monthly Project Expenses",
        value: "monthly-project-expenses",
        component: AccountingReportsMonthlyProjectExpenses,
        permissions: [AccessibilityTypes.ACCOUNTING_REPORTS_STATEMENT_OF_CASH_FLOW],
    },
    {
        name: "Monthly Unliquidated Cash Advances",
        value: "monthly-unliquidated-cash-advances",
        component: AccountingReportsMonthlyUnliquidatedCashAdvances,
        permissions: [AccessibilityTypes.ACCOUNTING_REPORTS_OFFICE_CODE],
    },
    {
        name: "Expenses for the Month",
        value: "expenses-for-the-month",
        component: AccountingReportsExpensesfortheMonth,
        permissions: [AccessibilityTypes.ACCOUNTING_REPORTS_OFFICE_HUMAN_RESOURCE],
    },
])
const reportComponent = computed(() => {
    return reports.value.find(report => report.value === reportType.value)?.component
})
</script>

<style>

</style>
