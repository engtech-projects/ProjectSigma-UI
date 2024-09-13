<script setup lang="ts">
defineProps({
    datas: {
        type: Array<any>,
        required: true,
    },
})
const compId = useId()
</script>
<template>
    <Icon name="material-symbols:info-outline" class="text-blue-700 h-5 w-5 lg:h-5 lg:w-5" :data-tooltip-target="compId + '-tooltip-top'" />
    <div :id="compId + '-tooltip-top'" data-popover role="tooltip" class="absolute z-[9999] duration-300 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
        <div class="list flex flex-col gap-2">
            <div class="text-md">
                Similar Items:
            </div>
            <div v-for="item, index in datas" :key="index + '-summary'">
                <div class="flex flex-col gap-1 text-xs">
                    {{ item.item_description }}
                </div>
            </div>
            <div class="tooltip-arrow" data-popper-arrow />
        </div>
    </div>
</template>
