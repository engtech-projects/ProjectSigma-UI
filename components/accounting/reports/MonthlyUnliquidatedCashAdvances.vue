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
                List of Unliquidated Cash Advances for the Month of January 2024
            </h1>
        </div>
        <div class="flex flex-col">
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="border border-black py-1 bg-slate-200">
                            REFERENCE NO.
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            DATE
                        </th>
                        <th class="border border-black w-1/5 py-1 bg-slate-200">
                            PAYEE
                        </th>
                        <th class="border border-black w-1/4 py-1 bg-slate-200">
                            PARTICULARS
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            AMOUNT
                        </th>
                        <th class="border border-black w-1/6 py-1 bg-slate-200">
                            AGING(FROM DATE RELEASE)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 20" :key="index" class="h-6">
                        <td v-for="i in 6" :key="i" class="border border-black" />
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
