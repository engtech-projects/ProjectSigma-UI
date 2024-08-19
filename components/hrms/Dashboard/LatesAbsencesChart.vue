<script setup>
defineProps({
    labels: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
})
</script>
<template>
    <LayoutBoards title="Late and Absences Chart">
        <LayoutChartBarSummary
            v-if="data.length > 0"
            :labels="labels"
            :datas="data"
        />
    </LayoutBoards>
</template>
