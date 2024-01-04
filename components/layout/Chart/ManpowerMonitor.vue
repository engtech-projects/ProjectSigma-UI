<template>
  <div class="border border-slate-200 shadow-md rounded-lg p-2">
    <div class="indent-3 text-black font-medium text-lg mb-4">
        Total Hired Manpower Per Project 
    </div>
    <div>
      <Bar :data="data" :options="options" />
    </div>
  </div>
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
  name: 'Manpower Monitor',
  components: {
    Bar
  },
  data() {
    return {
      data: {
        labels: ['Main', 'Project 1', 'Project 2', 'Project 3'],
        datasets: [{
          label: "Manpower Per Project",
          data: [40,70,65, 46],
          backgroundColor: "rgb(0,51,51)",
          borderColor: "rgb(29,83,107)",
          borderRadius: 15,
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
              delay = context.dataIndex * 500 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
      }
    }
  }
}
</script>