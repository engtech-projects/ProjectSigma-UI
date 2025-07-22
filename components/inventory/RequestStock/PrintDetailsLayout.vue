<script setup lang="ts">

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
    data: {
        type: Array<any>,
        required: true,
    },
})
const itemTableHeaders = [
    { name: "QTY", id: "quantity" },
    { name: "Unit", id: "uom_name" },
    { name: "Item Description", id: "item_description" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Reason for Request", id: "reason_for_request" },
    { name: "No. of Price Quotations", id: "price_quotation_count" },
]
</script>
<template>
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <div id="headline mb-4">
                <PrintTableFormat />
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-center border-b rounded-t mb-4">
                    <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                        {{ title }}
                    </h3>
                </div>
                <div class="flex mb-4">
                    <div class="flex-1 mr-4">
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Request For: <span class="underline">{{ data?.request_for }}</span>
                        </p>
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Office/Project: <span class="underline">{{ data?.section_type || data?.office_project }}</span>
                        </p>
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Address: <span class="underline">{{ data?.office_project_address || data?.address }}</span>
                        </p>
                    </div>
                    <div class="flex-1">
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Reference No.: <span class="underline">{{ data?.reference_no }}</span>
                        </p>
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Date Prepared: <span class="underline">{{ data?.date_prepared }}</span>
                        </p>
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Date Needed: <span class="underline">{{ data?.date_needed }}</span>
                        </p>
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Equipment No.: <span class="underline">{{ data?.equipment_no }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div id="itemDetails">
                <div id="content" class="overflow-auto">
                    <table class="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <th v-for="(dataHeader, index) in itemTableHeaders" :key="index" scope="col" class="p-2 border-0 border-b text-sm">
                                    {{ dataHeader.name }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in data?.items" :key="item.id" class="bg-white border-b">
                                <td class="px-4 py-2 border text-center">
                                    {{ item.quantity }}
                                </td>
                                <td class="px-4 py-2 border text-center">
                                    {{ item.uom_name }}
                                </td>
                                <td class="px-4 py-2 border text-center">
                                    {{ item.item_description }}
                                </td>
                                <td class="px-4 py-2 border text-center">
                                    {{ item.specification }}
                                </td>
                                <td class="px-4 py-2 border text-center">
                                    {{ item.preferred_brand }}
                                </td>
                                <td class="px-4 py-2 border text-center">
                                    {{ item.reason }}
                                </td>
                                <td class="px-4 py-2 border text-center">
                                    {{ item.location }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex mt-4">
                    <div class="flex-1 mr-4">
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Type of Request: {{ data?.type_of_request }}
                        </p>
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Contact Number: {{ data?.contact_no ?? data?.contact_number }}
                        </p>
                    </div>
                    <div class="flex-1 mr-4">
                        <p v-if="title" class="pl-4 text-md text-gray-900">
                            Remarks: {{ data?.remarks }}
                        </p>
                    </div>
                    <div class="flex-1 grid grid-rows-2 grid-cols-2 gap-4">
                        <div class="row-span-1">
                            <p v-if="title" class="pl-4 text-md text-gray-900">
                                Current SMR: {{ data?.current_smr }}
                            </p>
                        </div>
                        <div class="row-span-1">
                            <p v-if="title" class="pl-4 text-md text-gray-900">
                                Unused SMR: {{ data?.unused_smr }}
                            </p>
                        </div>
                        <div class="row-span-1">
                            <p v-if="title" class="pl-4 text-md text-gray-900">
                                Previous SMR: {{ data?.previous_smr }}
                            </p>
                        </div>
                        <div class="row-span-1">
                            <p v-if="title" class="pl-4 text-md text-gray-900">
                                Next SMR: {{ data?.next_smr }}
                            </p>
                        </div>
                    </div>
                </div>
                <div id="approvals" class="w-full mt-4">
                    <LayoutApprovalsListView :approvals="data?.approvals" :signature-view="true" />
                </div>
            </div>
        </div>
    </div>
</template>
