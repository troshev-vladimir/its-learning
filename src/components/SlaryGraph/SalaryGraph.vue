<template>
  <LineChart :chart-data="testData" :options="options" />
</template>

<script setup>
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { computed, ref } from "vue";

Chart.register(...registerables);

const labels = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
const options = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "",
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    y: {
      border: { width: 4 },
      max: Math.pow(1.7, 12),
      grid: {
        display: true,
        lineWidth: 4,
        offset: true,
      },
      ticks: {
        display: false,
      },
      title: {
        display: true,
        text: "Уровень компетенций",
      },
    },
    x: {
      border: { width: 4 },
      grid: {
        display: true,
        lineWidth: 4,
      },
      title: {
        display: true,
        text: "Время, месяцев",
        align: "start",
      },
    },
  },
  pointLabel: false,
});
function exp(n = 1) {
  return labels.value.map((el) => {
    return (Math.pow(1.7, el) - 1) / n;
  });
}

const testData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      tension: 0.3,
      data: exp(),
      label: "Ты",
    },
    {
      tension: 0.3,
      data: exp(0.04),
      label: "Практикующий программист 1С",
    },
  ],
}));
</script>
