<script setup>
defineProps({
    approvals: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="p-2 w-full">
        <p class="text-blue-700 text-center">
            Approvals
        </p>
        <div v-for="(apprv, index) in approvals" :key="index" class="bg-white w-full">
            <ol class="flex w-full justify-between">
                <li class="w-full p-2 text-left">
                    {{ apprv.type }}
                </li>
                <li class="w-full p-2 text-left">
                    {{ apprv.fullname }}
                </li>
                <li class="w-full p-2 text-center">
                    {{ apprv.status }}
                </li>
            </ol>
        </div>
    </div>
</template>
