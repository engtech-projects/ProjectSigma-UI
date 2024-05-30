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
                <template v-if="apprv.employee">
                    <li class="w-full p-2 text-left">
                        {{ apprv.type }}
                    </li>
                    <li class="w-full p-2 text-left">
                        {{ apprv.employee.fullname_first }}
                    </li>
                    <li class="w-full p-2 text-center">
                        {{ apprv.status }} {{ (apprv.status === 'Approved') ? apprv.date_approved : "" }}
                    </li>
                </template>
                <template v-else>
                    <li class="w-full p-2 text-left">
                        {{ apprv.type }}
                    </li>
                    <li class="w-full p-2 text-left">
                        {{ apprv.fullname_first }}
                    </li>
                    <li class="w-full p-2 text-center">
                        {{ apprv.status }} {{ (apprv.status === 'Approved') ? apprv.date_approved : "" }}
                    </li>
                </template>
            </ol>
        </div>
    </div>
</template>
