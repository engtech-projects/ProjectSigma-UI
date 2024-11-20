<script setup>
import { useSupplierStore, APPROVALS } from "@/stores/inventory/suppliers"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"
const mainStore = useSupplierStore()
const { approvalList, createRequest } = storeToRefs(mainStore)

const form = defineModel({ required: true, type: Object })

const approvals = useApprovalStore()
approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

const snackbar = useSnackbar()

const storeRequest = async () => {
    await mainStore.storeRequest()
    if (mainStore.errorMessage !== "") {
        snackbar.add({
            type: "error",
            text: mainStore.errorMessage
        })
    } else {
        snackbar.add({
            type: "success",
            text: mainStore.successMessage
        })
        mainStore.$reset()
    }
}

const handleDocumentUpload = (event, data) => {
    try {
        const file = event.target.files[0]
        data.value = file
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}

const addAttachment = () => {
    createRequest.value.attachments.push(
        {
            type: null,
            value: null,
        }
    )
}
const removeAttachment = (index) => {
    createRequest.value.attachments.splice(index, 1)
}
</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeRequest">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="w-full flex justify-end">
                        <LayoutFormPsTextInput v-model="form.supplier_code" title="Supplier Code" />
                    </div>
                    <div class="w-full">
                        <p class="font-bold">
                            Please accomplish this form completely and submit the required documents listed below.  The information given would serve as basis for accreditation.
                        </p>
                    </div>
                    <LayoutFormPsTextInput v-model="form.company_name" class="w-full" title="Company Name" />
                    <LayoutFormPsTextInput v-model="form.company_address" class="w-full" title="Company Address" />
                    <div class="flex flex-row items-center gap-4">
                        <LayoutFormPsNumberInput v-model="form.company_contact_number" class="w-full" title="Contact Number" />
                        <LayoutFormPsEmailInput v-model="form.company_email" class="w-full" title="Company Email" />
                    </div>
                    <div class="flex flex-row items-center gap-4">
                        <LayoutFormPsTextInput v-model="form.contact_person_name" class="w-full" title="Contact Person Name" />
                        <LayoutFormPsNumberInput v-model="form.contact_person_number" class="w-full" title="Contact Person Number" />
                        <LayoutFormPsTextInput v-model="form.contact_person_designation" class="w-full" title="Contact Person Designation" />
                    </div>
                    <LayoutFormPsSelect
                        v-model="form.type_of_ownership"
                        :options-list="['SINGLE PROPRIETORSHIP', 'PARTNERSHIP', 'CORPORATION']"
                        class="w-full"
                        title="Type of Ownership"
                    />
                    <div class="flex flex-row items-center gap-4">
                        <LayoutFormPsTextInput v-model="form.nature_of_business" class="w-full" title="Nature of Business" />
                        <LayoutFormPsTextInput v-model="form.products_services" class="w-full" title="Products/Services" />
                    </div>
                    <div class="flex flex-row items-center gap-4">
                        <LayoutFormPsSelect
                            v-model="form.classification"
                            :options-list="['VAT', 'NON-VAT']"
                            class="w-full"
                            title="Classification"
                        />
                        <LayoutFormPsNumberInput v-model="form.tin" class="w-full" title="TIN" />
                    </div>
                    <LayoutFormPsTextArea v-model="form.terms_and_conditions" class="w-full" title="Terms and Conditions" />
                    <div class="w-full">
                        <p class="font-bold">
                            I/We hereby certify that the information furnished are in all respect true and correct.  It is agreed that ECDC may inquire into the accuracy of the information submitted.  It is further agreed that these information shall remain the property of ECDC whether or not the accreditation applied for is granted
                        </p>
                    </div>
                    <div class="w-full">
                        <p class="font-bold">
                            Any information/document found to be false and incorrect shall be sufficient ground for disapproval of this application for accreditation.
                        </p>
                    </div>
                    <LayoutFormPsTextInput v-model="form.filled_by" class="w-full" title="Filled By" />
                    <LayoutFormPsTextInput v-model="form.filled_designation" class="w-full" title="Filled Designation" />
                    <LayoutFormPsDateInput v-model="form.filled_date" class="w-full" title="Filled Date" />
                    <div class="flex flex-col full gap-2">
                        <div class="flex full gap-2">
                            <label class="block mb-1 text-sm font-medium text-gray-900">Attachments:</label>
                        </div>
                        <template v-for="data, itemIndex in createRequest.attachments" :key="data">
                            <div class="flex flex-col gap-4">
                                <div class="flex flex-row gap-4 justify-center items-center">
                                    <LayoutFormPsSelect
                                        v-model="createRequest.attachments[itemIndex].type"
                                        :options-list="[
                                            'BANK DETAILS',
                                            'CERTIFICATE OF REGISTRATION WITH SEC/DTI REGISTRATION',
                                            'CITY/MUNICIPAL PERMIT',
                                            'BIR 2303 CERTIFICATE OF REGISTRATION',
                                            'CERTIFICATE OF PRODUCT/MSDS',
                                            'CERTIFICATE OF DELEARSHIP/DISTRIBUTORSHIP',
                                            'DENR PERMITS',
                                            'TRADE TEST RESULTS',
                                            'PRICE LIST/QUOTATION',
                                            'OTHERS',
                                        ]"
                                        class="w-full"
                                    />
                                    <LayoutFormPsTextInput v-show="createRequest.attachments[itemIndex].type == 'OTHERS'" v-model="createRequest.attachments[itemIndex].other_type" class="w-full" />
                                    <div class="w-full">
                                        <input
                                            class="w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            aria-describedby="file_input_help"
                                            type="file"
                                            accept=".doc, .docx, .pdf"
                                            placeholder="Please Specify Attachment Type"
                                            required
                                            @change="handleDocumentUpload($event, createRequest.attachments[itemIndex])"
                                        >
                                    </div>
                                    <div class="flex">
                                        <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" @click="removeAttachment(itemIndex)" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div>
                            <button type="button" class="px-3 py-1 bg-green-600 text-white text-xs font-bold" @click="addAttachment">
                                Add
                            </button>
                        </div>
                    </div>
                    <div class="w-full">
                        <LayoutFormPsTextInput v-model="form.requirements_complete" title="Requirements Complete" />
                    </div>
                    <div class="w-full">
                        <LayoutFormPsTextArea v-model="form.remarks" title="Remarks" />
                    </div>
                </div>
                <div class="flex w-full">
                    <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white"> Approval:</label>
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in approvalList.list"
                            :key="'hrmsetupapprovallist' + apr"
                            v-model="approvalList.list[apr]"
                        />
                    </div>
                </div>
                <div class="flex w-full items-center gap-4">
                    <button
                        type="submit"
                        class=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
