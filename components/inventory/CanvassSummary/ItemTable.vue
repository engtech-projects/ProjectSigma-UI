<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
})

</script>

<template>
    <div class="flex w-full" />
    <div class="flex w-full h-full bg-gray-50">
        <div class="w-full lg:w-1/2 border-r bg-white overflow-hidden">
            <div class="overflow-hidden max-h-96 lg:max-h-full">
                <table class="min-w-full table-auto text-xs sm:text-sm text-gray-800">
                    <thead class="sticky top-0 z-10 bg-white">
                        <tr class="h-20">
                            <th colspan="5" class="text-center text-lg font-bold border border-gray-700 border-r uppercase">
                                <div class="flex items-center justify-center">
                                    <div class="text-center leading-tight">
                                        requested items(s) / services
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr class="font-semibold uppercase border border-gray-700">
                            <th class="border-r border-gray-700 text-wrap w-12 text-xs">
                                item no.
                            </th>
                            <th class="border-r border-gray-700 text-xs">
                                item description
                            </th>
                            <th class="border-r border-gray-700 text-xs">
                                specification
                            </th>
                            <th class="border-r border-gray-700 w-10 text-xs">
                                qty
                            </th>
                            <th class="border-r border-gray-700 text-wrap w-12 p-1 text-xs">
                                unit of measurement
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in props.data.items"
                            :key="'item-' + index"
                            class="border border-gray-700 hover:bg-gray-25 cursor-pointer"
                        >
                            <td class="border border-gray-700 p-1 text-center font-medium text-gray-600">
                                {{ index + 1 }}
                            </td>
                            <td class="border border-gray-700 p-1 font-medium text-center">
                                <div class="truncate" :title="item.item_description">
                                    {{ item.item_description }}
                                </div>
                            </td>
                            <td class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-600 hidden md:table-cell">
                                <div class="truncate" :title="item.specification">
                                    {{ item.specification || '-' }}
                                </div>
                            </td>
                            <td class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center font-semibold text-gray-600">
                                {{ item.quantity || '-' }}
                            </td>
                            <td class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-600">
                                <div class="truncate" :title="item.unit">
                                    {{ item.unit || '-' }}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="5" class="border border-gray-700 text-center text-lg font-bold uppercase p-3">
                                total amount
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="w-1/2 overflow-auto bg-white">
            <table class="min-w-full table-fixed text-xs sm:text-sm text-gray-800">
                <thead class="sticky top-0 bg-white">
                    <tr class="h-20">
                        <th
                            colspan="3"
                            class="text-center font-bold border border-gray-700 uppercase"
                        >
                            <div class="flex items-center justify-center">
                                <div class="text-center leading-tight">
                                    <div>{{ props.data.supplier.company_name }}</div>
                                    <div>{{ props.data.supplier.company_address }}</div>
                                    <div>{{ props.data.supplier.contact_person_name }}</div>
                                    <div>{{ props.data.supplier.contact_person_number }}</div>
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr class="font-semibold uppercase border border-gray-700 h-10">
                        <th class="border-r border-gray-700 text-xs">
                            Unit Price
                        </th>
                        <th class="border-r border-gray-700 text-xs">
                            Total
                        </th>
                        <th class="border-r border-gray-700 text-xs">
                            Remarks
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in props.data.items"
                        :key="'row-' + index"
                        class="border-b border-gray-700 hover:bg-gray-25 h-12"
                    >
                        <td class="border border-gray-700 text-center font-medium">
                            ₱{{ formatToCurrency(item.unit_price) }}
                        </td>
                        <td class="border border-gray-700 text-center font-semibold">
                            ₱{{ formatToCurrency(item.total_amount) }}
                        </td>
                        <td class="border border-gray-700 text-center">
                            <div class="w-full h-full flex items-center justify-center overflow-auto text-xs text-gray-600">
                                {{ item.remarks || '-' }}
                            </div>
                        </td>
                    </tr>
                    <tr class="h-12">
                        <td colspan="3" class="border border-gray-700 p-1 text-center font-bold text-lg">
                            ₱{{ formatToCurrency(props.data.grand_total_amount) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
