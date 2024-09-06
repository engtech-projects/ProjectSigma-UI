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
        <HrmsReportsPhicRemittance
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
    <div class="mt-5 mb-6 border-slate-300 rounded-lg p-2">
        <!-- <div class="text-2xl font-normal mb-4 mt-0 ">
            {{ selectedReport ? `${selectedReport} - ${monthNames[month.month]} - ${year}` : '' }} -->
        <!-- </div> -->
        <!-- <EasyDataTable
            class="mt-5"
            table-class-name="customize-table"
            :headers="headers"
            :items="items"
        /> -->
    </div>
    <button class="flex justify-end items-center ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="print">
        <Icon name="ic:baseline-local-printshop" class="w-4 h-4 mr-1" fill="currentColor" />Print Report
    </button>
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
