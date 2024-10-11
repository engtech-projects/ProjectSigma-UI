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
            <div v-if="model.userselector">
                <HrmsCommonUserEmployeeSelector v-model="model.user_id" />
            </div>
            <div v-else>
                <span class="font-semibold">{{ model.employee.fullname_first }}</span>
            </div>
        </div>
    </div>
</template>
