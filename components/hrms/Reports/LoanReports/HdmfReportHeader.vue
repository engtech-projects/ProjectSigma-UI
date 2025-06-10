<script lang="ts" setup>
const compId = useId()
</script>
<template>
    <div :for="compId" class="header flex flex-col mb-8">
        <div class="flex gap-4">
            <span class="text-md flex-1">
                Employer ID:
            </span>
            <span class="text-md font-bold flex-5">
                209658570002
            </span>
        </div>
        <div class="flex gap-4">
            <span class="text-md flex-1">
                Employer Name:
            </span>
            <span class="text-md font-bold flex-5">
                EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
            </span>
        </div>
        <div class="flex gap-4">
            <span class="text-md flex-1">
                Address:
            </span>
            <span class="text-md font-bold flex-5">
                P-1 POBLACION 1 BUENAVISTA AGUSAN DEL NORTE
            </span>
        </div>
        <div class="flex gap-4">
            <span class="text-md flex-1">
                Contact No:
            </span>
            <span class="text-md font-bold flex-5">
                09395096694
            </span>
        </div>
        <div class="flex gap-4">
            <span class="text-md flex-1">
                Email Address:
            </span>
            <span class="text-md font-bold flex-5 underline">
                evenparcorporation@gmail.com
            </span>
        </div>
    </div>
</template>
