<template>
    <div id="header" class="flex px-4 gap-4 items-center justify-between mb-8">
        <div class="flex flex-col gap-4">
            <div class="flex gap-4 items-center">
                <img src="/evenpar.jpg" class="relative h-[70px]" alt="">
                <div class="flex flex-col">
                    <h1 class="text-xl font-bold text-green-500 leading-6">
                        EVENPAR CONSTRUCTION AND <br> DEVELOPMENT CORPORATION
                    </h1>
                    <h4 class="text-md text-black italic">
                        General Engineering * General Building
                    </h4>
                </div>
            </div>
            <div class="w-[400px] h-2 border-y-2 border-black border-dashed" />
        </div>
        <IsoCard />
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
@media print {
    #header {
        top: 0;
        position: fixed;
        width:90%;
        margin-top: 24px;
    }
}
</style>
