<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
})

</script>

<template>
    <div class="flex w-full h-full bg-gray-50">
        <table class="min-w-full table-auto text-xs sm:text-sm text-gray-800">
            <colgroup>
                <col style="width:5%">
                <col style="width:20%">
                <col style="width:15%">
                <col style="width:5%">
                <col style="width:5%">
                <col style="width:15%">
                <col style="width:15%">
                <col style="width:20%">
            </colgroup>

            <thead>
                <tr class="uppercase">
                    <th colspan="5" class="text-center">
                        requested items(s) / services
                    </th>
                    <th colspan="3" class="text-center">
                        <div>
                            <div>{{ props.data.supplier.company_name }}</div>
                            <div>{{ props.data.supplier.company_address }}</div>
                            <div>{{ props.data.supplier.contact_person_name }}</div>
                            <div>{{ props.data.supplier.contact_person_number }}</div>
                        </div>
                    </th>
                </tr>
                <tr class="uppercase bg-slate-300">
                    <th class="border-r border-gray-700">
                        item no.
                    </th>
                    <th class="border-r border-gray-700">
                        item description
                    </th>
                    <th class="border-r border-gray-700">
                        specification
                    </th>
                    <th class="border-r border-gray-700">
                        qty
                    </th>
                    <th class="border-r border-gray-700">
                        unit of measurement
                    </th>
                    <th class="border-r border-gray-700">
                        unit price
                    </th>
                    <th class="border-r border-gray-700">
                        total
                    </th>
                    <th class="border-r border-gray-700">
                        canvassed brand/quarry source
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
                    <td class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-600">
                        ₱{{ formatToCurrency(item.unit_price) }}
                    </td>
                    <td class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-600">
                        ₱{{ formatToCurrency(item.total_amount) }}
                    </td>
                    <td class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-600">
                        {{ item.remarks || '-' }}
                    </td>
                </tr>
                <tr>
                    <th colspan="5" class="border border-gray-700 text-center text-lg font-bold uppercase p-3">
                        total amount
                    </th>
                    <th colspan="5" class="border border-gray-700 text-center text-lg font-bold uppercase p-3">
                        ₱{{ formatToCurrency(props.data.grand_total_amount) }}
                    </th>
                </tr>
                <tr
                    v-for="(value, label) in {
                        'Terms and Conditions': props.data.terms_of_payment,
                        'Availability': props.data.availability,
                        'Delivery Terms': props.data.delivery_terms,
                    }"
                    :key="label"
                >
                    <th colspan="5" class="border border-gray-700 text-center text-lg uppercase p-3">
                        {{ label }}
                    </th>
                    <th colspan="5" class="border border-gray-700 text-center text-lg uppercase p-3">
                        {{ value }}
                    </th>
                </tr>
                <tr>
                    <th colspan="5" class="border border-gray-700 text-center text-lg font-bold uppercase p-3">
                        remarks
                    </th>
                    <th colspan="5" class="border border-gray-700 text-center text-lg font-bold uppercase p-3">
                        {{ props.data.remarks }}
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    td, th {
        border: 1px solid #3a3a3a;
        text-align: center;
        padding: 4px;
    }
</style>
