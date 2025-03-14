<script setup>
const processingChecklist = defineModel("processingChecklist", { required: true })
const remarks = defineModel("remarks", { required: true, type: String })
</script>
<template>
    <div class="flex gap-4">
        <div class="flex items-center gap-2 list-none">
            <li v-for="(value, key) in processingChecklist" :key="key">
                <input v-model="processingChecklist[key]" type="checkbox"> {{ key }}
            </li>
        </div>
        <div class="flex items-center gap-2">
            <textarea v-model="remarks" type="text" />
        </div>
    </div>
</template>
