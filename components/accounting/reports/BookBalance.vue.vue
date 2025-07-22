<script setup>

</script>
<template>
    <div class="flex flex-col w-full gap-10 bg-white p-8 min-h-[1000px]">
        <DocumentTemplatesIsoHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full items-center mb-12">
            <h1 class="text-2xl font-bold uppercase text-center">
                BOOK BALANCE AS OF JANUARY 5, 2025
            </h1>
        </div>
        <div class="flex justify-center">
            <div class="flex flex-col px-32 acontainer flex-1">
                <div class="flex justify-between">
                    <span class="uppercase">Metrobank - Dollar Account</span>
                    <span class="text-center min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between">
                    <span class="uppercase">BDO Savings</span>
                    <span class="text-center min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between">
                    <span class="uppercase">Maybank</span>
                    <span class="text-center min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between">
                    <span class="uppercase">BDO Current</span>
                    <span class="text-center min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between">
                    <span class="uppercase">Maybank ECDC JV ME3</span>
                    <span class="text-center min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between">
                    <span class="uppercase">Metrobank - MJ0-PRVFK</span>
                    <span class="text-center min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between">
                    <span class="uppercase">DBP</span>
                    <span class="text-center min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between">
                    <span class="uppercase">Landbank - ECV9987</span>
                    <span class="text-center min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between">
                    <span class="uppercase">Landbank - ECV9987t-2Y774</span>
                    <span class="text-center min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between mb-8">
                    <span class="uppercase">Landbank - X77YT-25HG7</span>
                    <span class="text-center border-b border-black min-w-sub">xxxx</span>
                </div>
                <div class="flex justify-between mb-24">
                    <span class="total uppercase text-right font-bold">TOTAL</span>
                    <span class="text-center border-b border-black min-w-sub">xxxx</span>
                </div>
                <div class="flex flex-col gap-8">
                    <span class="uppercase">
                        Confirmed By:
                    </span>
                    <div class="flex flex-col">
                        <span class="font-bold">
                            RONALD V. FILICES
                        </span>
                        <span class="uppercase text-sm">
                            Treasury Section head
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
    .acontainer {
        max-width: 900px;
    }
    .min-w-sub {
        min-width: 100px;
    }
    .total {
        min-width: 220px;
    }
</style>
