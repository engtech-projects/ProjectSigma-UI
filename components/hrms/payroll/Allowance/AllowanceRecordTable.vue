<script setup>
const prop = defineProps({
    data: {
        type: Object,
        required: true,
    },
})
const totalAllowanceAmount = () => {
    return prop.data.employee_allowances?.reduce((acc, item) => acc + item.allowance_amount, 0)
}
</script>
<template>
    <LayoutPrint class="w-full">
        <div class="text-center mb-4">
            <h1 class="text-xl font-bold">
                EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
            </h1>
            <h2 class="text-lg">
                Allowance Record
            </h2>
        </div>
        <div class="mb-2 flex justify-between">
            <div class="w-full flex gap-4">
                <span class="font-semibold text-sm">Office/Project: </span> <span class="font-light text-sm">{{ data.charge_name }}</span>
                <!-- <span class="font-semibold text-sm ml-4">Period Covered: </span> <span class="font-light text-sm">{{ data.cutoff_start_human }} - {{ data.cutoff_end_human }}</span> -->
                <span class="font-semibold text-sm ml-4">Allowance Date: </span> <span class="font-light text-sm">{{ data.allowance_date }}</span>
            </div>
        </div>
        <table class="min-w-full border border-zinc-300">
            <thead class="bg-zinc-100">
                <tr>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        NO.
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Fullname
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Position
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Allowance Rate
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Allowance Days
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Allowance Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="employee, index in data.employee_allowances" :key="index+'AllowanceRecord'">
                    <td class="border border-zinc-300 px-2 py-1">
                        {{ index + 1 }}
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        {{ employee.employee.fullname_first }}
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        {{ employee.employee.position }}
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        {{ employee.allowance_rate_formatted }}
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        {{ employee.allowance_days }}
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        {{ employee.allowance_amount_formatted }}
                    </td>
                </tr>
                <tr>
                    <td colspan="5" class="border border-zinc-300 px-2 py-1" />
                    <td colspan="1" class="border border-zinc-300 px-2 py-1">
                        TOTAL : Php {{ formatToCurrency(totalAllowanceAmount()) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </LayoutPrint>
</template>
