<script setup lang="ts">
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const { attachments } = storeToRefs(mainStore)
const route = useRoute()
const snackbar = useSnackbar()
const handleDocumentUpload = (event:any, data:any) => {
    try {
        const file = event.target.files[0]
        data.form.file = file
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
const saveAttachment = async () => {
    try {
        const formData = new FormData()
        if (attachments.value.form.attachment_name === "OTHERS") {
            formData.append("attachment_name", attachments.value.form.other_type)
        } else {
            formData.append("attachment_name", attachments.value.form.attachment_name)
        }
        formData.append("file", attachments.value.form.file)
        if (route.query.key) {
            formData.append("request_supplier_id", route.query.key)
        }
        await mainStore.updateAttachments(formData)
        if (mainStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: mainStore.errorMessage
            })
        } else if (mainStore.successMessage !== "") {
            snackbar.add({
                type: "success",
                text: mainStore.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
</script>
<template>
    <div class="flex flex-row gap-4 justify-start mt-4">
        <LayoutFormPsSelect
            v-model="attachments.form.attachment_name"
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
            title="Attachment Type"
        />
        <LayoutFormPsTextInput v-show="attachments.form.attachment_name == 'OTHERS'" v-model="attachments.form.other_type" class="w-full" title="File Name" />
        <div class="w-full">
            <label class="block mb-1 text-sm font-medium text-gray-900">
                File
            </label>
            <input
                class="w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                type="file"
                accept=".doc, .docx, .pdf"
                placeholder="Please Specify Attachment Type"
                title="File"
                @change="handleDocumentUpload($event, attachments)"
            >
        </div>
        <button type="button" class="flex-1 text-white p-2 rounded-lg bg-teal-600 content-center mt-5 max-w-max" @click="saveAttachment">
            Save
        </button>
    </div>
</template>
