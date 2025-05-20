<template>
    <div id="header" class="flex gap-4 items-start justify-between">
        <div class="flex flex-col gap-4">
            <div class="flex gap-4 items-center text-left">
                <img src="/evenpar_new_logo.jpg" class="relative h-[6rem]" alt="">
                <div class="flex flex-col">
                    <h1 class="text-xl font-bold text-green-500 leading-6">
                        EVENPAR CONSTRUCTION AND <br> DEVELOPMENT CORPORATION
                    </h1>
                    <p class="text-sm text-black font-normal italic">
                        General Engineering * General Building
                    </p>
                </div>
            </div>
            <div class="w-[400px] h-2 border-y-2 border-black border-dashed" />
        </div>
        <IsoCard :page="page" />
    </div>
</template>

<script lang="ts" setup>
defineProps({
    page: {
        type: Object,
        default: null
    }
})
</script>

<style scoped>

</style>
