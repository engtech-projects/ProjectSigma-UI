<script setup>
defineProps({
    approvalItem: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="bg-gray-50 w-full">
        <ol class="flex w-full justify-between">
            <li class="w-full p-2 text-left">
                {{ approvalItem.type }}
            </li>
            <li class="w-full p-2 text-left">
                {{ approvalItem.employee_name ?? approvalItem.user_name }}
                <br>
                {{ approvalItem.employee_position ?? '' }}
            </li>
            <li class="w-full p-2 text-center">
                <template v-if="approvalItem.status === 'Approved'">
                    <p class="text-green-700">
                        {{ approvalItem.status }}
                    </p>
                    <p class="text-slate-400">
                        {{ approvalItem.date_approved_human }}
                    </p>
                </template>
                <template v-else-if="approvalItem.status === 'Denied'">
                    <p class="text-red-700">
                        {{ approvalItem.status }}
                    </p>
                    <p class="text-slate-400">
                        {{ approvalItem.date_denied_human }}
                    </p>
                    <p class="text-gray-700">
                        {{ approvalItem.remarks }}
                    </p>
                </template>
                <template v-else>
                    <p>
                        {{ approvalItem.status }}
                    </p>
                </template>
            </li>
        </ol>
    </div>
</template>
