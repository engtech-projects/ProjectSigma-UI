<script setup>
defineProps({
    label: {
        type: String,
        default: ""
    },
    signatories: {
        type: Array,
        default: null
    },
    signatory: {
        type: Object,
        default: null
    },
})
</script>
<template>
    <div class="flex flex-col gap-8 !text-sm justify-between">
        <span class="">{{ label }} :</span>
        <div class="flex gap-8 flex-1">
            <div v-if="!signatories" class="flex flex-col items-center gap-1">
                <span class="font-bold uppercase flex-1 border-b-2 border-black" :class="signatory?.name.length === 0 ? 'w-48' : '' ">
                    {{ signatory?.name }}
                </span>
                <span class="flex-1">
                    {{ signatory?.title }}
                </span>
            </div>
            <div v-for="s, i in signatories" v-else :key="i" class="flex flex-col items-center gap-1 justify-start">
                <span class="font-bold uppercase flex-1 border-b-2 border-black" :class="signatory?.name.length === 0 ? 'w-48' : '' ">
                    {{ s?.name }}
                </span>
                <span class="flex-1">
                    {{ s?.title }}
                </span>
            </div>
        </div>
    </div>
</template>
