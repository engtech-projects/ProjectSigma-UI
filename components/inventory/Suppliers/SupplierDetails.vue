<script setup lang="ts">
import { useSupplierStore } from "@/stores/inventory/suppliers"

defineProps({
    title: {
        type: String,
        required: true,
    },
    datas: {
        type: Object,
        required: true,
    },
})

const headers = [
    { name: "Attachment" },
    { name: "Action" },
]

const { data: userData } = useAuth()
const main = useSupplierStore()
const snackbar = useSnackbar()
const { remarks } = storeToRefs(main)
const config = useRuntimeConfig()

const approvedRequest = async (id:number) => {
    try {
        await main.approveApprovalForm(id)
        if (main.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: main.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: main.successMessage
            })
            main.$reset()
            navigateTo({
                path: "/inventory/suppliers",
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
const denyRequest = async (id:any) => {
    try {
        await main.denyApprovalForm(id)
        if (main.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: main.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: main.successMessage
            })
            main.$reset()
            navigateTo({
                path: "/inventory/suppliers",
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}

</script>
<template>
    <div class="text-gray-500 p-2">
        <LayoutPrint>
            <div class="flex flex-col gap-4 pt-4 px-2 w-full">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="w-full flex justify-end">
                        <InventoryCommonFormPsLabel :value="datas.supplier_code" title="Supplier Code" />
                    </div>
                    <div class="w-full">
                        <p class="font-bold">
                            Please accomplish this form completely and submit the required documents listed below.  The information given would serve as basis for accreditation.
                        </p>
                    </div>
                    <InventoryCommonFormPsLabel :value="datas.company_name" title="Company Name" />
                    <InventoryCommonFormPsLabel :value="datas.company_address" title="Company Address" />
                    <div class="flex flex-row items-center gap-4">
                        <InventoryCommonFormPsLabel :value="datas.company_contact_number" title="Contact Number" />
                        <InventoryCommonFormPsLabel :value="datas.company_email" title="Company Email" />
                    </div>
                    <div class="flex flex-row items-center gap-4">
                        <InventoryCommonFormPsLabel :value="datas.contact_person_name" title="Contact Person Name" />
                        <InventoryCommonFormPsLabel :value="datas.contact_person_number" title="Contact Person Number" />
                        <InventoryCommonFormPsLabel :value="datas.contact_person_designation" title="Contact Person Designation" />
                    </div>
                    <InventoryCommonFormPsLabel :value="datas.type_of_ownership" title="Type of Ownership" />
                    <div class="flex flex-row items-center gap-4">
                        <InventoryCommonFormPsLabel :value="datas.nature_of_business" title="Nature of Business" />
                        <InventoryCommonFormPsLabel :value="datas.products_services" title="Products/Services" />
                    </div>
                    <div class="flex flex-row items-center gap-4">
                        <InventoryCommonFormPsLabel :value="datas.classification" title="Classification" />
                        <InventoryCommonFormPsLabel :value="datas.tin" title="TIN" />
                    </div>
                    <div>
                        <InventoryCommonFormPsLabel :value="datas.terms_and_conditions" title="Terms and Conditions" />
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
                        <InventoryCommonFormPsLabel :value="datas.filled_by" title="Filled By" />
                        <InventoryCommonFormPsLabel :value="datas.filled_designation" title="Filled Designation" />
                        <InventoryCommonFormPsLabel :value="datas.filled_date" title="Filled Date" />
                    </div>
                    <div class="flex flex-col full gap-2">
                        <table class="table-auto w-full border-collapse">
                            <thead>
                                <tr>
                                    <th v-for="(dataHeader, index) in headers" :key="index" scope="col" class="p-2 border-0 border-b text-sm">
                                        {{ dataHeader.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="dataValue, index in datas.uploads" :key="index">
                                    <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                        {{ dataValue.attachment_name }}
                                    </td>
                                    <td>
                                        <a target="_blank" :href="config.public.INVENTORY_API_URL + dataValue.file_location" class="hover:text-green-600 max-w-sm hover:bg-gray-100 hover:border-green-600 block mb-2 text-sm font-medium text-gray-100 text-center bg-green-600 px-2 py-3 cursor-pointer border rounded">
                                            <Icon name="mage:file-download-fill" class="h-5 w-5 lg:h-5 lg:w-5" />
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="w-full">
                        <InventoryCommonFormPsLabel :value="datas.requirements_complete" title="Requirements Complete" />
                    </div>
                    <div class="w-full">
                        <InventoryCommonFormPsLabel :value="datas.remarks" title="Remarks" />
                    </div>
                </div>
                <div id="approvals" class="w-full">
                    <LayoutApprovalsListView :approvals="datas.approvals" />
                </div>
            </div>
        </LayoutPrint>
        <div id="footer">
            <div v-if="datas.next_approval?.user_id === userData?.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="datas.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
        </div>
    </div>
</template>
