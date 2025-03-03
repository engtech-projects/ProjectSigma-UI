<template>
    <div class="flex flex-col gap-4 min-h-screen">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_REPORTS_GROUP
            ])"
        >
            <div class="flex gap-4 items-center mb-8">
                <h1 class="text-2xl font-bold text-gray-800">
                    Reports
                </h1>
                <select id="accountType" v-model="reportType" class="rounded-lg w-1/4" required>
                    <template v-for="report in reports" :key="report.value">
                        <option v-if="report.show" :value="report.value">
                            {{ report.name }}
                        </option>
                    </template>
                </select>
            </div>
            <LayoutPrint v-if="reportType">
                <component :is="reportComponent" :key="reportType" />
            </LayoutPrint>
        </LayoutAcessContainer>
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
import AccountingIsoformsLiquidationForm from "~/components/accounting/reports/LiquidationForm.vue"
import AccountingIsoformsReplenishmentSummary from "~/components/accounting/reports/ReplenishmentSummary.vue"
import AccountingIsoformsCashAdvanceSummary from "~/components/accounting/reports/CashAdvanceSummary.vue"
import AccountingIsoformsMemorandumOfDeposit from "~/components/accounting/reports/MemorandumOfDeposit.vue"
import AccountingIsoformsProvisionalReceipt from "~/components/accounting/reports/ProvisionalReceipt.vue"
import AccountingIsoformsCashReturnSlip from "~/components/accounting/reports/CashReturnSlip.vue"
import AccountingIsoformsPayrollLiquidations from "~/components/accounting/reports/PayrollLiquidations.vue"

const reportType = ref(null)
const reports = ref([
    {
        name: "Balance Sheet",
        value: "balance-sheet",
        component: markRaw(AccountingReportsBalanceSheet),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_BALANCE_SHEET]),
    },
    {
        name: "Book Balance",
        value: "book-balance",
        component: markRaw(AccountingReportsBookBalance),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_BOOK_BALANCE]),
    },
    {
        name: "Income Statement",
        value: "income-statement",
        component: markRaw(AccountingReportsIncomeStatement),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_INCOME_STATEMENT]),
    },
    {
        name: "Statement of Cash Flow",
        value: "statement-of-cash-flow",
        component: markRaw(AccountingReportsStatementOfCashFlow),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_STATEMENT_OF_CASH_FLOW]),
    },
    {
        name: "Office Code",
        value: "office-code",
        component: markRaw(AccountingReportsOfficeCode),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_OFFICE_CODE]),
    },
    {
        name: "Office Human Resource",
        value: "office-human-resource",
        component: markRaw(AccountingReportsOfficeHumanResource),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_OFFICE_HUMAN_RESOURCE]),
    },
    {
        name: "Monthly Project Expenses",
        value: "monthly-project-expenses",
        component: markRaw(AccountingReportsMonthlyProjectExpenses),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_MONTHLY_PROJECT_EXPENSES]),
    },
    {
        name: "Monthly Unliquidated Cash Advances",
        value: "monthly-unliquidated-cash-advances",
        component: markRaw(AccountingReportsMonthlyUnliquidatedCashAdvances),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_MONTHLY_UNLIQUIDATED_CASH_ADVANCES]),
    },
    {
        name: "Expenses for the Month",
        value: "expenses-for-the-month",
        component: markRaw(AccountingReportsExpensesfortheMonth),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_EXPENSES_FOR_THE_MONTH]),
    },
    {
        name: "Liquidation Form",
        value: "liquidation-form",
        component: markRaw(AccountingIsoformsLiquidationForm),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_LIQUIDATION_FORM]),
    },
    {
        name: "Replenishment Summary",
        value: "replenishment-summary",
        component: markRaw(AccountingIsoformsReplenishmentSummary),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_REPLENISHMENT_SUMMARY]),
    },
    {
        name: "Cash Advance Summary",
        value: "cash-advance-summary",
        component: markRaw(AccountingIsoformsCashAdvanceSummary),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_CASH_ADVANCE_SUMMARY]),
    },
    {
        name: "Memorandum of Deposit",
        value: "memorandum-of-deposit",
        component: markRaw(AccountingIsoformsMemorandumOfDeposit),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_MEMORANDUM_OF_DEPOSIT]),
    },
    {
        name: "Provisional Receipt",
        value: "provisional-receipt",
        component: markRaw(AccountingIsoformsProvisionalReceipt),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_PROVISIONAL_RECEIPT]),
    },
    {
        name: "Cash Return Slip",
        value: "cash-return-slip",
        component: markRaw(AccountingIsoformsCashReturnSlip),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_CASH_RETURN_SLIP]),
    },
    {
        name: "Payroll Liquidations",
        value: "payroll-liquidations",
        component: markRaw(AccountingIsoformsPayrollLiquidations),
        show: useCheckAccessibility([AccessibilityTypes.ACCOUNTING_REPORTS_PAYROLL_LIQUIDATIONS]),
    }
])
const reportComponent = computed(() => {
    return reports.value.find(report => report.value === reportType.value)?.component
})
</script>

<style>

</style>
