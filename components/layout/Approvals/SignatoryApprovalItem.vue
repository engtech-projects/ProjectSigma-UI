<script setup>
defineProps({
    approvalItem: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="relative flex flex-col items-center gap-1 justify-start">
        <div class="text-left w-full font-bold">
            {{ approvalItem.type }}:
        </div>
        <template v-if="approvalItem.status === 'Approved'">
            <img v-if="approvalItem.signature" :src="approvalItem.signature" class="w-64 h-64 left-[25px] top-[-190px] rounded-md absolute">
            <Icon
                v-else
                name="duo-icons:approved"
                size="64"
                color="green"
                class="absolute"
            />
            <span class="flex-1">{{ approvalItem.date_approved_human }}</span>
        </template>
        <template v-if="approvalItem.status === 'Denied'">
            <Icon
                name="teenyicons:denied-solid"
                size="64"
                color="red"
                class="absolute"
            />
            <span class="flex-1">{{ approvalItem.date_denied_human }}</span>
        </template>
        <span class="font-bold uppercase flex-1 border-b-2 border-black" :class="approvalItem.employee_name === 0 ? 'w-48' : '' ">
            {{ approvalItem.employee_name }}
        </span>
        <span class="flex-1">
            {{ approvalItem.employee_position }}
        </span>
    </div>
</template>
