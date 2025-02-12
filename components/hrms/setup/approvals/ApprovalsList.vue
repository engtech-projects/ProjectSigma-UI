<script setup>
const model = defineModel({ required: true, type: Object })
</script>
<template>
    <div class="grid grid-cols-2 border border-slate-400 p-2">
        <div class="flex flex-col">
            <div class="font-semibold text-black">
                {{ model.type }}
            </div>
        </div>

        <div class="flex flex-col">
            <div v-if="model.selector_type === 'employee'">
                <HrmsCommonUserEmployeeSelector v-model="model.user_id" />
            </div>
            <div v-else-if="model.selector_type === 'head'">
                <HrmsCommonUserHeadsSelector v-model="model.user_id" />
            </div>
            <div v-else-if="model.selector_type === 'specific'">
                <span class="font-semibold">{{ model.employee_name }}</span>
                <br>
                <span class="text-sm">{{ model.employee_position }}</span>
            </div>
            <div v-else>
                <span class="font-semibold">Please Fix Approval</span>
            </div>
        </div>
    </div>
</template>
