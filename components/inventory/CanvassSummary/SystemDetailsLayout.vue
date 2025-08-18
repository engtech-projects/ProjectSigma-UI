<script setup lang="ts">
import { useCanvassSummaryStore } from "~/stores/inventory/procurement/canvassSummary"
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
})
const main = useCanvassSummaryStore()
const snackbar = useSnackbar()
const { remarks } = storeToRefs(main)
const handleRequest = async (type: "approve" | "deny", id: number) => {
    try {
        if (type === "approve") {
            await main.approveApprovalForm(id)
        } else {
            await main.denyApprovalForm(id)
        }

        snackbar.add({
            type: "success",
            text: main.successMessage
        })

        main.$reset()
        navigateTo({ path: "/inventory/procurement/canvass-summary" })
    } catch (error: any) {
        snackbar.add({
            type: "error",
            text: error?.message || "Something went wrong."
        })
    }
}
</script>
<template>
    <div class="text-gray-900 p-2">
        <div class="flex flex-col gap-4 pt-4 w-full">
            <DocumentTemplatesIsoHeader :page="{ currentPage: 1, totalPages: 1 }" />
            <div v-if="title" class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4">
                <h3 class="pl-4 text-2xl font-bold text-gray-900 p-4 uppercase">
                    {{ title }}
                </h3>
            </div>

            <div class="flex flex-col gap-4 mb-5">
                <div class="flex flex-row justify-between gap-4">
                    <div class="w-full flex flex-col">
                        <InventoryCommonFormPsFormLabel
                            v-for="(value, label) in {
                                'DATE': props.data.date,
                                'PROJECT CODE': props.data.project_code,
                                'CONSO/RS REFERENCE NUMBER': props.data.reference_number,
                            }"
                            :key="label"
                            :title="label"
                            :value="value"
                        />
                    </div>
                    <div class="w-full flex flex-col">
                        <InventoryCommonFormPsFormLabel
                            v-for="(value, label) in {
                                'CS NUMBER': props.data.cs_number,
                            }"
                            :key="label"
                            :title="label"
                            :value="value"
                        />
                    </div>
                </div>

                <div>
                    <InventoryCanvassSummaryItemTable
                        :data="props.data"
                    />

                    <div class="border border-t-0 border-gray-700 shadow-sm uppercase text-black bg-white">
                        <div
                            v-for="(value, label) in {
                                'Terms and Conditions': props.data.terms_of_payment,
                                'Availability': props.data.availability,
                                'Delivery Terms': props.data.delivery_terms,
                            }"
                            :key="label"
                            class="flex h-[60px] border-b border-gray-700 last:border-b-0"
                        >
                            <div class="w-1/2 px-4 py-4 font-medium border-r border-gray-700 flex items-center justify-center">
                                {{ label }}
                            </div>
                            <div class="w-1/4 px-4 py-4 flex items-center text-black font-semibold">
                                {{ value || '-' }}
                            </div>
                        </div>

                        <div class="flex h-[100px]">
                            <div class="w-1/2 px-4 py-4 font-medium border-r border-gray-700 flex items-center justify-center">
                                Remarks
                            </div>
                            <div class="w-1/2 px-4 py-4 font-semibold">
                                {{ props.data.remarks || 'No remarks' }}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="approvals" class="w-full mb-6">
                    <LayoutApprovalsListView :approvals="props.data?.approvals" />
                </div>
                <div id="footer" class="pb-4">
                    <div
                        v-if="props.data?.next_approval && useCheckIsCurrentUser(props.data?.next_approval?.user_id)"
                        class="flex flex-col sm:flex-row gap-2 justify-end"
                    >
                        <HrmsCommonApprovalDenyButton
                            v-model:deny-remarks="remarks"
                            :request-id="props.data?.id"
                            @approve="id => handleRequest('approve', id)"
                            @deny="id => handleRequest('deny', id)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
