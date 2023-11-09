<template>
  <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700">
    <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">Employee Chart</h5>
    
    <div>
      <canvas ref="chart" :width="chartWidth" :height="chartHeight" />
    </div>
  </div>
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
  name: 'EmployeesChart',
  components: {
    Doughnut
  },
  data() {
    return {
      chartWidth: 300, // Set the desired width of the chart
      chartHeight: 300, // Set the desired height of the chart
      data: {
        labels: ['Accounting', 'Finance', 'HR', 'Legal', 'Engineer', 'Estimator', 'Equipment Operator', 'Marketing', 'Sales', 'IT', 'Field Staff', 'Operations',],
        datasets: [{
          data: [40, 20, 12, 14, 56, 45, 88, 65, 56, 49, 71, 92],
          backgroundColor: [ // Specify different colors for each label
            'rgba(255, 99, 132, 0.7)',  // Red
            'rgba(54, 162, 235, 0.7)',  // Blue
            'rgba(255, 206, 86, 0.7)',  // Yellow
            'rgba(75, 192, 192, 0.7)',  // Green
            'rgba(255, 159, 64, 0.7)',  // Orange
            'rgba(153, 102, 255, 0.7)', // Purple
            'rgba(255, 85, 85, 0.7)',   // Dark Red
            'rgba(255, 214, 51, 0.7)',  // Gold
            'rgba(0, 204, 153, 0.7)',   // Teal
            'rgba(153, 255, 51, 0.7)',  // Lime Green
            'rgba(51, 102, 255, 0.7)',  // Royal Blue
            'rgba(255, 0, 128, 0.7)',   // Pink
          ],
        }],
      },

      options: {
        responsive: true,
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
