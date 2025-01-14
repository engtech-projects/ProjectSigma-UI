<script setup>
defineProps({
    entryData: {
        type: Object,
        required: false,
        default: null
    },
})
</script>
<template>
    <div class="p-2 py-4 flex gap-2 w-full mb-4">
        <span class="text-gray-900 text-4xl text-center w-full block flex-1">Journal Entry</span>
    </div>
    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light">Journal No.: </span>
            <span class="text-gray-900">{{ entryData?.journal_no }}</span>
        </div>
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light">Reference No.: </span>
            {{ entryData?.reference_no }}
        </div>
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light">Status: </span>
            {{ entryData?.status }}
        </div>
    </div>
    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light">Journal Date: </span>
            {{ entryData?.date_filed }}
        </div>
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light">Journal Description / Remarks: </span>
            {{ entryData?.remarks }}
        </div>
    </div>
    <div class="p-2 border border-gray-200 rounded-lg">
        <h2 class="text-xl text-gray-800 tex-center font-bold p-2">
            Journal Entry Details
        </h2>
        <div class="overflow-x-auto">
            <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <table class="min-w-full divide-y border border-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Accounts
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subsidiary
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Debit
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Credit
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="detail in entryData?.details" :key="detail.id">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">
                                    {{ detail?.account?.account_name }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">
                                    {{ detail?.stakeholder?.name }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">
                                    {{ detail?.debit }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">
                                    {{ detail?.credit }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
