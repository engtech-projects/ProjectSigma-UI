<script setup>
import { useSupplierStore, APPROVALS } from "@/stores/inventory/suppliers"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"
const mainStore = useSupplierStore()
const { approvalList, editRequest } = storeToRefs(mainStore)

const form = defineModel({ required: true, type: Object })

const approvals = useApprovalStore()
approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

const snackbar = useSnackbar()
const route = useRoute()
const validKey = ref(false)
const config = useRuntimeConfig()

if (route.query.key) {
    await mainStore.editOne(route.query.key)
    editRequest.value.form = editRequest.value.details
    editRequest.value.form.attachments = []
    validKey.value = true
} else {
    validKey.value = false
}

// const handleDocumentUpload = (event, data) => {
//     try {
//         const file = event.target.files[0]
//         data.file = file
//     } catch (error) {
//         snackbar.add({
//             type: "error",
//             text: error
//         })
//     }
// }

const addAttachment = () => {
    form.value.attachments.push(
        {
            attachment_name: null,
            file: null,
        }
    )
}
// const removeAttachment = (index) => {
//     form.value.attachments.splice(index, 1)
// }

const storeRequestForm = async () => {
    try {
        const formData = new FormData()
        form.value.approvals = approvalList.value.list
        formData.append("supplier_code", form.value.supplier_code)
        formData.append("company_name", form.value.company_name)
        formData.append("company_address", form.value.company_address)
        formData.append("company_email", form.value.company_email)
        formData.append("contact_person_name", form.value.contact_person_name)
        formData.append("contact_person_number", form.value.contact_person_number)
        formData.append("contact_person_designation", form.value.contact_person_designation)
        formData.append("type_of_ownership", form.value.type_of_ownership)
        formData.append("nature_of_business", form.value.nature_of_business)
        formData.append("products_services", form.value.products_services)
        formData.append("classification", form.value.classification)
        formData.append("terms_and_conditions", form.value.terms_and_conditions)
        formData.append("filled_by", form.value.filled_by)
        formData.append("filled_designation", form.value.filled_designation)
        formData.append("filled_date", form.value.filled_date)
        formData.append("requirements_complete", form.value.requirements_complete)
        formData.append("remarks", form.value.remarks)
        formData.append("company_contact_number", String(form.value.company_contact_number))
        formData.append("contact_person_number", String(form.value.contact_person_number))
        formData.append("tin", String(form.value.tin))
        formData.append("tin", String(form.value.tin))
        form.value.approvals.forEach((item, index) => {
            formData.append(`approvals[${index}][type]`, item.type)
            formData.append(`approvals[${index}][user_id]`, item.user_id)
            formData.append(`approvals[${index}][status]`, item.status)
            formData.append(`approvals[${index}][date_approved]`, item.date_approved)
            formData.append(`approvals[${index}][remarks]`, item.remarks)
        })

        if (validKey.value) {
            form.value.attachments.forEach((item, index) => {
                formData.append(`attachments[${index}][attachment_name]`, item.attachment_name)
                formData.append(`attachments[${index}][file]`, item.file)
            })
        }

        await mainStore.storeRequest(formData)
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
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: mainStore.errorMessage
        })
    }
}
</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeRequestForm">
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
                    <InventorySuppliersSupplierTypeOfOwnership v-model="form.type_of_ownership" />
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
                    <div>
                        <label
                            class="block mb-1 text-sm font-medium text-gray-900"
                        >
                            Terms and Conditions
                        </label>
                        <InventoryCommonFormPsTextAreaCommon v-model="form.terms_and_conditions" class="w-full block mb-1 text-sm font-medium text-gray-900" />
                    </div>
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
                    <div class="w-full flex flex-row gap-4">
                        <LayoutFormPsTextInput v-model="form.filled_by" class="w-full" title="Filled By" />
                        <LayoutFormPsTextInput v-model="form.filled_designation" class="w-full" title="Filled Designation" />
                        <LayoutFormPsDateInput v-model="form.filled_date" class="w-full" title="Filled Date" />
                    </div>
                    <div v-show="validKey" class="flex flex-col full gap-2">
                        <div class="flex full gap-2">
                            <label class="block mb-1 text-sm font-medium text-gray-900">Attachments:</label>
                        </div>
                        <template v-for="data, itemIndex in form.uploads" :key="data">
                            <div class="flex flex-col gap-4">
                                <div class="flex flex-row gap-2 justify-start items-center">
                                    <div>
                                        {{ form.uploads[itemIndex].attachment_name }}
                                    </div>
                                    <div class="flex flex-row justify-center items-center gap-2">
                                        <a target="_blank" :href="config.public.INVENTORY_API_URL + form.uploads[itemIndex].file_location" class="block text-sm font-medium text-gray-100 text-center cursor-pointer border rounded">
                                            <Icon name="mage:file-download-fill" class="hover:border-green-600 bg-green-600 h-8 w-8 p-1" />
                                        </a>
                                        <div class="flex cursor-pointer">
                                            <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" @click="removeAttachment(itemIndex)" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-for="data, itemIndex in form.attachments" :key="data">
                            <div class="flex flex-row gap-4 justify-center items-center">
                                <LayoutFormPsSelect
                                    v-model="form.uploads[itemIndex].attachment_name"
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
                                <LayoutFormPsTextInput v-show="form.attachments[itemIndex].attachment_name == 'OTHERS'" v-model="form.attachments[itemIndex].other_type" class="w-full" />
                                <div class="w-full">
                                    <input
                                        class="w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        aria-describedby="file_input_help"
                                        type="file"
                                        accept=".doc, .docx, .pdf"
                                        placeholder="Please Specify Attachment Type"
                                        required
                                        @change="handleDocumentUpload($event, form.attachments[itemIndex])"
                                    >
                                </div>
                                <div class="flex">
                                    <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" @click="removeAttachment(itemIndex)" />
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
                        <LayoutFormPsSelect
                            v-model="form.requirements_complete"
                            :options-list="['Yes', 'No']"
                            class="w-full"
                            title="Requirements Complete"
                        />
                    </div>
                    <div class="w-full">
                        <label
                            class="block mb-1 text-sm font-medium text-gray-900"
                        >
                            Remarks
                        </label>
                        <InventoryCommonFormPsTextAreaCommon v-model="form.remarks" title="Remarks" />
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
