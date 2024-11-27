<script setup lang="ts">
import { useSupplierStore } from "@/stores/inventory/suppliers"

interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

defineProps({
    title: {
        type: String,
        required: true,
    },
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    datas: {
        type: Object,
        required: true,
    },
})

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
                path: "/inventory/bom",
                replace: true
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
                path: "/inventory/bom",
                replace: true
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
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <div id="headline mb-4">
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-between border-b rounded-t mb-4">
                    <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                        {{ title }}
                    </h3>
                </div>
            </div>
            <LayoutPrint>
                <div id="itemDetails">
                    <div id="content" class="overflow-auto">
                        <table class="table-auto w-full border-collapse">
                            <thead>
                                <tr>
                                    <th v-for="(dataHeader, index) in headerColumns" :key="index" scope="col" class="p-2 border-0 border-b text-sm">
                                        {{ dataHeader.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.supplier_code }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.company_name }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.company_address }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.company_contact_number }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.company_email }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.contact_person_name }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.contact_person_number }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.contact_person_designation }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.type_of_ownership }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.nature_of_business }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.products_services }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.classification }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.tin }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.terms_and_conditions }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.filled_by }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.filled_designation }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.filled_date }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.requirements_complete }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.remarks ? datas.remarks : "" }}
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    <div v-for="dataValue, index in datas.uploads" :key="index" class="flex flex-col gap-10">
                                        <div class="flex flex-row gap-2 justify-start items-center">
                                            <a target="_blank" :href="config.public.INVENTORY_API_URL + dataValue.file_location" class="hover:text-green-600 max-w-sm hover:bg-gray-100 hover:border-green-600 block mb-2 text-sm font-medium text-gray-100 text-center bg-green-600 px-2 py-3 cursor-pointer border rounded">
                                                <Icon name="mage:file-download-fill" class="h-5 w-5 lg:h-5 lg:w-5" />
                                                Download
                                            </a>
                                            <div>
                                                {{ dataValue.attachment_name }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ datas.request_status }}
                                </td>
                            </tbody>
                        </table>
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
    </div>
</template>
