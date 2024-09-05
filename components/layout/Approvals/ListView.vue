<script setup>
defineProps({
    approvals: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="LayoutApprovalListView p-2 w-full">
        <p class="text-blue-700 text-center font-medium text-lg">
            Approvals
        </p>
        <div v-for="(apprv, index) in approvals" :key="index" class="bg-gray-50 w-full">
            <ol class="flex w-full justify-between">
                <li class="w-full p-2 text-left">
                    {{ apprv.type }}
                </li>
                <li class="w-full p-2 text-left">
                    <template v-if="apprv.employee">
                        {{ apprv.employee?.fullname_first }}
                    </template>
                    <template v-else>
                        {{ apprv.fullname_first }}
                    </template>
                </li>
                <li class="w-full p-2 text-center">
                    <template v-if="apprv.status === 'Approved'">
                        <p class="text-green-700">
                            {{ apprv.status }}
                        </p>
                        <p class="text-slate-400">
                            {{ apprv.date_approved_human }}
                        </p>
                    </template>
                    <template v-else-if="apprv.status === 'Denied'">
                        <p class="text-red-700">
                            {{ apprv.status }}
                        </p>
                        <p class="text-slate-400">
                            {{ apprv.date_denied_human }}
                        </p>
                        <p class="text-gray-700">
                            {{ apprv.remarks }}
                        </p>
                    </template>
                    <template v-else>
                        <p>
                            {{ apprv.status }}
                        </p>
                    </template>
                </li>
            </ol>
        </div>
    </div>
</template>
