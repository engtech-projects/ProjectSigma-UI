<script setup lang="ts">
import { useSalaryDisbursementStore } from "@/stores/hrms/payroll/salaryDisbursement"
const { data: userData } = useAuth()
useHead({
    title: "Payroll Summary Details",
})
const salaryDisbursementStore = useSalaryDisbursementStore()
const compId = useId()
const route = useRoute()
const salaryDisbursement = ref()
const snackbar = useSnackbar()
onMounted(async () => {
    if (route.query.id) {
        salaryDisbursement.value = await salaryDisbursementStore.getOne(route.query.id)
    }
})
const approvedRequest = async (id: any) => {
    try {
        await salaryDisbursementStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: "Successfully Approved."
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
const denyRemarks = ref("")
const denyRequest = async (id : any) => {
    try {
        await salaryDisbursementStore.denyApprovalForm(id, denyRemarks.value)
        snackbar.add({
            type: "success",
            text: "Successfully Denied"
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
const submitToAccounting = async (id: any) => {
    try {
        await salaryDisbursementStore.submitToAccounting(id)
        snackbar.add({
            type: "success",
            text: "Successfully submitted to accounting."
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_payroll_salarydisbursement_viewpayslips,
        ])"
        :comp-id="compId"
    >
        <LayoutBackOrHome v-if="!route.query.id" message="Please select a Payroll Disbursement" />
        <template v-if="salaryDisbursement?.data">
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Payroll Date: </span> <span class="text-gray-900">{{ salaryDisbursement?.data.payroll_date_human }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Payroll Type: </span> {{ salaryDisbursement?.data.payroll_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Release Type: </span> {{ salaryDisbursement?.data.release_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Requested By: </span>
                    {{ salaryDisbursement?.data.created_by_user_name }}<br>{{ salaryDisbursement?.data.created_at_human }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Request Status: </span> {{ salaryDisbursement?.data.request_status }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Disbursement Status: </span> {{ salaryDisbursement?.data.disbursement_status }}
                </div>
            </div>
            <div class="w-full">
                <HrmsPayrollSalaryDisbursementDetailsTable :data="salaryDisbursement.data" />
            </div>
            <div v-if="salaryDisbursement?.data.next_approval?.user_id === userData?.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="denyRemarks"
                    :request-id="salaryDisbursement?.data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
            <div v-if="salaryDisbursement?.data.request_status === 'Approved'">
                <LayoutFormPsButton button-title="Submit to Accounting" @click="submitToAccounting" />
            </div>
        </template>
    </LayoutAcessContainer>
</template>
