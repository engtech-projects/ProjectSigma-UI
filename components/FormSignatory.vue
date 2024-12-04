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
        <span>{{ label }}:</span>
        <div class="flex gap-8">
            <div v-if="!signatories" class="flex flex-col items-center gap-1">
                <span class="font-bold uppercase flex-1 border-b-2 border-black" :class="signatory?.name.length === 0 ? 'min-w-36' : '' ">
                    {{ signatory?.name }}
                </span>
                <span>
                    {{ signatory?.title }}
                </span>
            </div>
            <div v-for="s, i in signatories" v-else :key="i" class="flex flex-col items-center gap-1">
                <span class="font-bold uppercase flex-1 border-b-2 border-black" :class="signatory?.name.length === 0 ? 'min-w-36' : '' ">
                    {{ s?.name }}
                </span>
                <span class="">
                    {{ s?.title }}
                </span>
            </div>
        </div>
    </div>
</template>
