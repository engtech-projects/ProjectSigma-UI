<script setup>
import { Bar } from "vue-chartjs"
const props = defineProps({
    labels: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
})
const chartData = () => {
    return {
        labels: props.labels,
        datasets: [
            {
                data: props.data,
            }
        ],
    }
}
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    }
}

</script>
<template>
    <LayoutBoards title="Late and Absences Chart">
        <Bar
            v-if="data.length > 0"
            :data="chartData()"
            :options="chartOptions"
        />
    </LayoutBoards>
</template>
