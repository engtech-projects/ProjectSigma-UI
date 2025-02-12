<script setup>
useHead({
    title: "Accounting Books",
})

</script>
<template>
    <PrintTableFormat>
        <div id="content" class="flex flex-col justify-center w-full mb-8">
            <h1 class="text-2xl font-bold uppercase text-center">
                OFFICE CODE
            </h1>
            <h4 class="text-md italic text-center">
                As of January 5, 2025
            </h4>
        </div>
        <div class="flex flex-col px-16">
            <div class="flex flex-col w-full text-sm">
                <div class="flex flex-col w-full">
                    <div class="grid grid-cols-8 border border-black px-4">
                        <span class="col-span-7 font-bold">PERSONAL SERVICES</span>
                    </div>
                    <div class="flex flex-col w-full">
                        <div class="flex justify-between px-4 pl-12">
                            <span>Salaries and Wages - Basic Pay</span>
                            <span>xxx</span>
                        </div>
                        <div class="flex justify-between px-4 pl-12">
                            <span>Overtime Pay</span>
                            <span>xxx</span>
                        </div>
                        <div class="flex justify-between px-4 pl-12">
                            <span>Other Benefits</span>
                            <span>xxx</span>
                        </div>

                        <div class="flex flex-col pl-12">
                            <div class="flex justify-between px-4 pl-12">
                                <span>Employee Benefits - 13th Month Pay</span>
                                <span>xxx</span>
                            </div>
                            <div class="flex justify-between px-4 pl-12">
                                <span>Employee Benefits - PBB</span>
                                <span>xxx</span>
                            </div>
                            <div class="flex justify-between px-4 pl-12">
                                <span>Employee Benefits - TRAVEL ALLOWANCE</span>
                                <span>xxx</span>
                            </div>
                            <div class="flex justify-between px-4 pl-12">
                                <span>Other Benefits</span>
                                <span>xxx</span>
                            </div>
                        </div>

                        <div class="flex justify-between px-4 pl-12">
                            <span>PAG-IBIG Premium</span>
                            <span>xxx</span>
                        </div>
                        <div class="flex justify-between px-4 pl-12">
                            <span>Philhealth Premium</span>
                            <span>xxx</span>
                        </div>
                        <div class="flex justify-between px-4 pl-12">
                            <span>GSIS Premium</span>
                            <span>xxx</span>
                        </div>
                        <div class="flex justify-between px-4 pl-12">
                            <span>SSS Premium</span>
                            <span>xxx</span>
                        </div>
                        <div class="grid grid-cols-8 border border-black px-4">
                            <span class="col-span-7 font-bold">TOTAL PERSONAL SERVICES</span>
                            <span class="text-right">xxx</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col w-full">
                    <div class="grid grid-cols-8 border border-black px-4 bt-none">
                        <span class="col-span-7 font-bold">XXXX SERVICES</span>
                    </div>
                    <div class="flex flex-col w-full">
                        <div v-for="i in 30" :key="i" class="flex justify-between px-4 pl-12">
                            <span>XXXXX - XXXXXX</span>
                            <span>xxx</span>
                        </div>
                        <div class="grid grid-cols-8 border border-black px-4">
                            <span class="col-span-7 font-bold">TOTAL XXXX SERVICES</span>
                            <span class="text-right">xxx</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col w-full">
                    <div class="grid grid-cols-8 border border-black px-4 bt-none">
                        <span class="col-span-7 font-bold">XXXX SERVICES</span>
                    </div>
                    <div class="flex flex-col w-full">
                        <div v-for="i in 10" :key="i" class="flex justify-between px-4 pl-12">
                            <span>XXXXX - XXXXXX</span>
                            <span>xxx</span>
                        </div>
                        <div class="grid grid-cols-8 border border-black px-4">
                            <span class="col-span-7 font-bold">TOTAL XXXX SERVICES</span>
                            <span class="text-right">xxx</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col w-full">
                    <div class="grid grid-cols-8 border border-black px-4 bt-none">
                        <span class="col-span-7 font-bold">XXXX SERVICES</span>
                    </div>
                    <div class="flex flex-col w-full">
                        <div v-for="i in 15" :key="i" class="flex justify-between px-4 pl-12">
                            <span>XXXXX - XXXXXX</span>
                            <span>xxx</span>
                        </div>
                        <div class="grid grid-cols-8 border border-black px-4">
                            <span class="col-span-7 font-bold">TOTAL XXXX SERVICES</span>
                            <span class="text-right">xxx</span>
                        </div>
                        <div class="flex justify-between px-4 mt-4">
                            <span>TOTAL SECTION EXPENSES</span>
                            <span class="text-right border-b border-black border-double pl-12">xxxxxx</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PrintTableFormat>
</template>

<style scoped>
    .border-double {
        border-style: double;
    }
    .bt-none {
        border-top: hidden;
    }
</style>
