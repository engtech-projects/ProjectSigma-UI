<template>
  <canvas ref="chart" :width="chartWidth" :height="chartHeight" />
</template>

<script lang="ts">

import {
Chart as ChartJS,
Title,
Tooltip,
Legend,
DoughnutController
} from 'chart.js/auto'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(DoughnutController, Title, Tooltip, Legend);

export default {
datas: 'datas',
labels: 'labels',
props:['datas','labels'],
name: 'EmployeesChart',
components: {
Doughnut
},
data() {
return {
  chartWidth: 300, // Set the desired width of the chart
  chartHeight: 300, // Set the desired height of the chart
  data: {
    // labels: ['Accounting', 'Finance', 'HR', 'Legal', 'Engineer', 'Estimator', 'Equipment Operator', 'Marketing', 'Sales', 'IT', 'Field Staff', 'Operations',],
    labels: this.labels,
    datasets: [{
      data: this.datas,
      backgroundColor: [ // Specify different colors for each label
        'rgba(54, 162, 235, 0.7)',  // Blue
        'rgba(255, 99, 132, 0.7)',  // Red
      ],
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
          delay = context.dataIndex * 150 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    maintainAspectRatio: false, // Set to false to allow custom width and height
    tooltips: {
      enabled: true, // Enable tooltips
    },
    plugins: {
      legend: {
        display: true,
        position: 'right', // Align the legend to the right
      },
    },
  },
};
},
mounted() {
this.renderChart();
},
methods: {
renderChart() {
  // Render the chart with custom dimensions
  const canvas = this.$refs.chart;
  canvas.width = this.chartWidth;
  canvas.height = this.chartHeight;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    const chart = new ChartJS(ctx, {
      type: 'doughnut',
      data: this.data,
      options: this.options,
    });
  }
},
},
};

</script>