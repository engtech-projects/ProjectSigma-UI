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
    <LayoutBoards title="Total Number of Male and Female Employee">
        <LayoutChartDoughnut
            v-if="data.length > 0"
            :labels="labels"
            :datas="data"
        />
    </LayoutBoards>
</template>
