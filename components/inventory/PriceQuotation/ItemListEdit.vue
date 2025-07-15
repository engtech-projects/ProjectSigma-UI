<script setup>
const items = defineModel({ required: true, type: Array })
</script>

<template>
    <div class="overflow-x-auto rounded-lg shadow-md bg-white">
        <table class="min-w-full text-sm text-left border border-gray-200">
            <thead class="bg-gray-100">
                <tr>
                    <th class="p-3 border-b font-medium">
                        Item Description
                    </th>
                    <th class="p-3 border-b font-medium">
                        Specification
                    </th>
                    <th class="p-3 border-b font-medium">
                        QTY
                    </th>
                    <th class="p-3 border-b font-medium">
                        UOM
                    </th>
                    <th class="p-3 border-b font-medium">
                        Preferred Brand
                    </th>
                    <th class="p-3 border-b font-medium">
                        Actual Brand
                    </th>
                    <th class="p-3 border-b font-medium">
                        Unit Price
                    </th>
                    <th class="p-3 border-b font-medium">
                        Remarks
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in items"
                    :key="index"
                    class="border-b hover:bg-gray-50 transition"
                >
                    <td class="p-2 text-center">
                        {{ item.item_description }}
                    </td>
                    <td class="p-2 text-center">
                        {{ item.specification }}
                    </td>
                    <td class="p-2 text-center">
                        {{ item.qty }}
                    </td>
                    <td class="p-2 text-center">
                        {{ item.unit }}
                    </td>
                    <td class="p-2 text-center">
                        {{ item.preferred_brand }}
                    </td>

                    <td class="p-2">
                        <LayoutFormPsTextInput
                            v-model="item.brand"
                            :required="true"
                            class="w-full"
                            placeholder="Enter Brand"
                        />
                    </td>
                    <td class="p-2">
                        <LayoutFormPsNumberInput
                            v-model="item.price"
                            :required="true"
                            class="w-full"
                            placeholder="Enter Price"
                        />
                    </td>
                    <td class="p-2">
                        <textarea
                            v-model="item.remarks"
                            placeholder="Remarks"
                            rows="2"
                            class="w-full px-3 py-1.5 border border-slate-400 rounded-md text-sm resize-none focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
