<script lang="ts" setup>
const model = defineModel({ required: true, type: Number, default: null })
</script>
<template>
    <div class="flex flex-row gap-4 justify-start items-center">
        <div class="flex flex-row justify-center items-center">
            <label class="text-">Assignment :</label>
        </div>
        <div>
            <HrmsCommonDepartmentSelector v-model="model" />
        </div>
    </div>
</template>
