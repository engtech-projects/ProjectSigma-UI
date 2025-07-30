<script setup>
useHead({
    title: "Accounting Books",
})

</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <DocumentTemplatesIsoHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-xl font-bold uppercase text-center">
                Project Monthly Expenses for Year 2024
            </h1>
        </div>
        <div class="flex flex-col">
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="border border-black">
                            Account
                        </th>
                        <th class="border border-black">
                            January
                        </th>
                        <th class="border border-black">
                            February
                        </th>
                        <th class="border border-black">
                            March
                        </th>
                        <th class="border border-black">
                            April
                        </th>
                        <th class="border border-black">
                            May
                        </th>
                        <th class="border border-black">
                            June
                        </th>
                        <th class="border border-black">
                            July
                        </th>
                        <th class="border border-black">
                            August
                        </th>
                        <th class="border border-black">
                            September
                        </th>
                        <th class="border border-black">
                            October
                        </th>
                        <th class="border border-black">
                            November
                        </th>
                        <th class="border border-black">
                            December
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-black font-bold uppercase py-1 px-2" colspan="13">
                            Direct Cost
                        </td>
                    </tr>
                    <tr v-for="index in 5" :key="index">
                        <td class="border border-black">
                            1000-0000-0000-0000
                        </td>
                        <td v-for="i in 12" :key="i" class="border border-black text-right">
                            0.00
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-black font-bold uppercase py-1 px-2" colspan="13">
                            OVERHEAD
                        </td>
                    </tr>
                    <tr v-for="index in 5" :key="index">
                        <td class="border border-black">
                            1000-0000-0000-0000
                        </td>
                        <td v-for="i in 12" :key="i" class="border border-black text-right">
                            0.00
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-black font-bold uppercase py-1 px-2">
                            TOTAL
                        </td>
                        <td v-for="i in 12" :key="i" class="border border-black font-bold py-1 px-2 text-right">
                            0.00
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
</style>
