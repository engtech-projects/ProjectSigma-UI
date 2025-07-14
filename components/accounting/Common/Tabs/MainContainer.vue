<script setup>
defineProps({
    justifyEnd: {
        type: Boolean,
        default: false,
    },
})
</script>
<template>
    <LayoutBoards class="w-full">
        <div class="flex gap-4 items-center mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul
                id="default-tab"
                class="flex flex-wrap flex-1 -mb-px text-sm font-medium text-center"
                :class="justifyEnd ? 'justify-end' : ''"
                data-tabs-toggle="#default-tab-content"
                role="tablist"
            >
                <slot name="tab-titles" />
            </ul>
            <slot name="tab-options" />
        </div>
        <div id="default-tab-content">
            <slot name="tab-containers" />
        </div>
    </LayoutBoards>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
