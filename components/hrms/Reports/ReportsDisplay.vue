<script setup lang="ts">
defineProps({
    selectedReport: {
        type: String,
        default: null,
    }
})
</script>
<template>
    <div id="printContent">
        <HrmsReportsSssContribution
            v-show="selectedReport==='Report1'"
        />
        <HrmsReportsSssProjectRemittance
            v-show="selectedReport==='Report2'"
        />
        <HrmsReportsSssEmployeeRemittance
            v-show="selectedReport==='Report3'"
        />
        <HrmsReportsSssLoanPaymentSummary
            v-show="selectedReport==='Report4'"
        />
        <HrmsReportsSssLoanPayment
            v-show="selectedReport==='Report5'"
        />
        <HrmsReportsPhicSummaryReport
            v-show="selectedReport==='Report6'"
        />
        <HrmsReportsPhicProjectRemittance
            v-show="selectedReport==='Report7'"
        />
        <HrmsReportsPhicEmployeeRemittance
            v-show="selectedReport==='Report8'"
        />
        <HrmsReportsHdmfSummary
            v-show="selectedReport==='Report9'"
        />
        <HrmsReportsHdmfProjectRemittance
            v-show="selectedReport==='Report10'"
        />
        <HrmsReportsHdmfEmployeeRemittance
            v-show="selectedReport==='Report11'"
        />
        <HrmsReportsHdmfLoanPaymentSummary
            v-show="selectedReport==='Report12'"
        />
        <HrmsReportsHdmfProjectRemittance
            v-show="selectedReport==='Report13'"
        />
        <HrmsReportsSalaryMonitoring
            v-show="selectedReport==='Report15'"
        />
    </div>
</template>
<style>
    #printContainer {
        display: none;
    }
    @media print {
        .printTable {
            max-width: none;
            width: 100%;
            table-layout: fixed;
        }
        .no-print {
            display: none!important;
        }
        #printContainer {
            display: block!important;
        }
    }
</style>
