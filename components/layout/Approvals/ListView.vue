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
                <template v-if="apprv.employee">
                    <li class="w-full p-2 text-left">
                        {{ apprv.type }}
                    </li>
                    <li class="w-full p-2 text-left">
                        {{ apprv.employee.full_name }}
                    </li>
                    <li class="w-full p-2 text-center">
                        {{ apprv.status }}
                    </li>
                </template>
                <template v-else>
                    <li class="w-full p-2 text-left">
                        {{ apprv.type }}
                    </li>
                    <li class="w-full p-2 text-left">
                        {{ apprv.name }}
                    </li>
                    <li class="w-full p-2 text-center">
                        {{ apprv.status }}
                    </li>
                </template>
            </ol>
        </div>
    </div>
</template>
