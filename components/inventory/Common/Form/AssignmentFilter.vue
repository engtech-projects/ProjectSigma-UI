<script lang="ts" setup>
const model = defineModel({ required: true, type: Object, default: null })
const startYear = 2023
const endYear = new Date().getFullYear()
const years = ref([])
for (let year = startYear; year <= endYear; year++) {
    years.value.push(year)
}

defineProps({
    withYear: {
        type: Boolean,
        default: true,
    },
})

</script>
<template>
    <div class="flex flex-row gap-4">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Assignment :</label>
            <HrmsCommonDepartmentSelector v-model="model.assignment_id" />
        </div>
        <div v-show="withYear" class="flex flex-row gap-2">
            <LayoutFormPsSelect
                v-model="model.effectivity"
                :add-all="true"
                :options-list="years"
                title="Year"
                class="w-full"
            />
        </div>
    </div>
</template>
