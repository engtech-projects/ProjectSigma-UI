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
        <HrmsReportsSssRemittanceSummary
            v-show="selectedReport==='Report1'"
        />
        <HrmsReportsSssRemittanceGroup
            v-show="selectedReport==='Report2'"
        />
        <HrmsReportsSssRemittanceEmployee
            v-show="selectedReport==='Report3'"
        />
        <HrmsReportsLoanReportsTemplate
            v-show="selectedReport==='Report4'"
        />
        <HrmsReportsOtherDeductionsReportsTemplate
            v-show="selectedReport==='Report5'"
        />
        <HrmsReportsPhicRemittanceSummary
            v-show="selectedReport==='Report6'"
        />
        <HrmsReportsPhicRemittanceGroup
            v-show="selectedReport==='Report7'"
        />
        <HrmsReportsPhicRemittanceEmployee
            v-show="selectedReport==='Report8'"
        />
        <HrmsReportsHdmfRemittanceSummary
            v-show="selectedReport==='Report9'"
        />
        <HrmsReportsHdmfRemittanceGroup
            v-show="selectedReport==='Report10'"
        />
        <HrmsReportsHdmfRemittanceEmployee
            v-show="selectedReport==='Report11'"
        />
        <HrmsReportsSalaryMonitoring
            v-show="selectedReport==='Report15'"
        />
        <HrmsReportsPortalMonitoringTemplate
            v-show="selectedReport==='Report16'"
        />
        <HrmsReportsAdministrativeReportsTemplate
            v-show="selectedReport==='Report19'"
        />
    </div>
</template>
<style scoped>
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
