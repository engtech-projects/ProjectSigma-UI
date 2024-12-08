<script setup lang="ts">
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const { attachments } = storeToRefs(mainStore)
const config = useRuntimeConfig()
const snackbar = useSnackbar()
const boardLoading = ref(false)
const updateAttachmentIndex = ref(null)
const showModalAttachment = ref(false)
const headers = [
    { name: "Attachment" },
    { name: "Action" },
]
const removeUploadsAttachment = (index:any) => {
    updateAttachmentIndex.value = index
    showModalAttachment.value = true
}
const cancelDeleteAttachment = () => {
    showModalAttachment.value = false
}
const doDeleteAttachment = async () => {
    try {
        await mainStore.deleteAttachment(updateAttachmentIndex.value)
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
        showModalAttachment.value = false
        updateAttachmentIndex.value = null
    } catch (error) {
        snackbar.add({
            type: "error",
            text: mainStore.errorMessage
        })
        showModalAttachment.value = false
    }
}

</script>
<template>
    <PsModal v-model:show-modal="showModalAttachment" :is-loading="boardLoading" title="Delete Attachment">
        <template #body>
            <div class="flex flex-col gap-4 justify-center items-center h-full mt-5">
                <div class="flex justify-center h-full">
                    <h2 class="text-lg">
                        Are your sure you want to delete the attachment?
                    </h2>
                </div>
                <div class="p-2 flex flex-row gap-4">
                    <button type="button" @click="doDeleteAttachment">
                        <Icon name="material-symbols:check" class="hover:border-green-600 bg-green-600 h-8 w-8 p-1 text-white" />
                    </button>
                    <button type="button" @click="cancelDeleteAttachment">
                        <Icon name="material-symbols:close" color="white" class="bg-red-500 rounded h-8 w-8 p-1 text-white" />
                    </button>
                </div>
            </div>
        </template>
    </PsModal>
    <div class="flex flex-col full gap-2 max-w-5xl">
        <label class="block mb-1 text-sm font-medium text-gray-900">Attachments:</label>
        <InventorySuppliersSupplierAttachmentForm />
    </div>
    <div class="pb-2 text-gray-500 overflow-x-auto mb-4">
        <LayoutBoards class="w-full" :loading="attachments.isLoading">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th v-for="(dataHeader, index) in headers" :key="index" scope="col" class="p-2 border-0 border-b text-sm">
                            {{ dataHeader.name }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data, index in attachments.data" :key="index" class="border text-center">
                        <td class="p-3">
                            {{ data.attachment_name }}
                        </td>
                        <td class="p-2 flex gap-2 justify-center">
                            <div class="flex flex-row gap-2">
                                <a target="_blank" :href="config.public.INVENTORY_API_URL + attachments.data[index].file_location" class="block text-sm font-medium text-gray-100 text-center cursor-pointer border rounded">
                                    <Icon name="mage:file-download-fill" class="hover:border-green-600 bg-green-600 h-8 w-8 p-1" />
                                </a>
                                <button type="button" @click="removeUploadsAttachment(attachments.data[index].id)">
                                    <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </LayoutBoards>
    </div>
</template>
