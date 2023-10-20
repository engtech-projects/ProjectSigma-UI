<template>
  <Bar :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'Sales',
  components: {
    Bar
  },
  data() {
    return {
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3'],
        datasets: [{
          label: "Leads",
          data: [40, 20, 52],
          backgroundColor: "rgb(0,51,51)",
          borderColor: "rgb(255, 145, 0)",
          borderRadius: Number.MAX_VALUE,
        }],
      },
      options: {
        responsive: true,
        animation: {
          onComplete: () => {
            const delayed = true;
          },
          delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number }) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delay) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
      }
    }
  }
}
</script>