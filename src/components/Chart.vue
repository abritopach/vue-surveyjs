<template>
    <canvas ref="chartCanvas"></canvas>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component'
import { Chart } from 'chart.js';

@Component
export default class ChartComponent extends Vue {

  mounted() {
    let chart = this.$refs.chartCanvas as HTMLCanvasElement;
    let ctx = chart.getContext("2d");
    let myChart = new Chart(ctx as CanvasRenderingContext2D, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}

};
</script>
<style>
</style>