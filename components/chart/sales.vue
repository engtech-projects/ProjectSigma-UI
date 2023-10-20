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
import Test from '~/pages/test.vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'Sales',
  components: {
    Bar
  },
  data() {
    return {
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: "Sales",
          data: [40, 20, 12, 14,56,45,88,65,56, 49, 71, 92],
          backgroundColor: "rgb(0,178,178)",
          borderColor: "rgb(255, 145, 0)",
          borderRadius: Number.MAX_VALUE,
        }],
      },
      options: {
        responsive: true,
        resizeDelay: 3,
        animation: {
          onComplete: () => {
            const delayed = true;
          },
          delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number }) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delay) {
              delay = context.dataIndex * 50 + context.datasetIndex *100;
            }
            return delay;
          },
        },
      }
    }
  }
}
</script>