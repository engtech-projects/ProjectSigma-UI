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
    signature: {
        type: String,
        default: null
    },
    align: {
        type: String,
        default: "center"
    }
})
</script>
<template>
    <div class="flex flex-col gap-8 !text-xs justify-between">
        <span class="">{{ label }} :</span>
        <div class="flex gap-8 flex-1">
            <!-- <img v-if="signature" :src="signature" class="w-48 h-48 object-cover rounded-md"> -->
            <div v-if="!signatories" class="flex flex-col items-start gap-1" :class="align === 'left' ? 'items-start' : 'items-center'">
                <span class="font-bold uppercase flex-1 border-b-2 border-black" :class="signatory?.name?.length === 0 ? 'w-48' : '' ">
                    {{ signatory?.name }}
                </span>
                <span class="flex-1">
                    {{ signatory?.title }}
                </span>
                <span class="flex-1">
                    {{ signatory?.subtitle }}
                </span>
            </div>
            <div v-for="s, i in signatories" v-else :key="i" class="relative flex flex-col items-center gap-1 justify-start">
                <img v-if="s.signature" :src="s.signature" class="w-64 h-64 left-[25px] top-[-190px] rounded-md absolute">
                <span class="font-bold uppercase flex-1 border-b-2 border-black" :class="signatory?.name?.length === 0 ? 'w-48' : '' ">
                    {{ s?.name }}
                </span>
                <span class="flex-1">
                    {{ s?.title }}
                </span>
                <span class="flex-1">
                    {{ s?.subtitle }}
                </span>
            </div>
        </div>
    </div>
</template>
