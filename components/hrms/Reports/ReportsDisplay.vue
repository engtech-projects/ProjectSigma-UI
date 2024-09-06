<template>
    <div>
        <div class="md:grid grid-cols-4 gap-4 mt-5 mb-16">
            <select id="report" v-model="selectedReport" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" disabled selected>
                    Select Report
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report1"
                >
                    SSS Summary
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report2"
                >
                    SSS Project Remittance
                </option>
                <option
                    v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_sssemployeeremittance])"
                    value="Report3"
                >
                    SSS Employee Remittance
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report4"
                >
                    SSS Loan Payment Summary
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report5"
                >
                    SSS Loan Payment
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report6"
                >
                    PHIC Summary
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report7"
                >
                    PHIC Project Remittance
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report8"
                >
                    PHIC Remittance
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report9"
                >
                    HDMF Summary
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report10"
                >
                    HDMF Project Remittance
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report11"
                >
                    HDMF Remittance
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report12"
                >
                    HDMF Loan Summary
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report13"
                >
                    HDMF Loan Project Remittance
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report14"
                >
                    HDMF Loan Remittance
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report15"
                >
                    Salary Monitoring
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report16"
                >
                    Overtime Monitoring
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report17"
                >
                    Project Payroll Summary
                </option>
                <option
                    v-if="useCheckAccessibility(['AdminOnly'])"
                    value="Report18"
                >
                    Employee Logs
                </option>
            </select>
        </div>
    </div>
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

<script setup lang="ts">
const selectedReport = ref(null)
</script>

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
