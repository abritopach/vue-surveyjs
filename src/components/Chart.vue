<template>
    <canvas ref="chartCanvas"></canvas>
</template>

<script lang="ts" >

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Chart } from 'chart.js';

@Component
export default class ChartComponent extends Vue {

    @Prop() chartData: any[] = [];
    private static defaultBackgroundColor: string[] = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'];
    private static defaultHoverBackgroundColor: string[] = ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"];
    backgroundColor: string[] = [];
    hoverBackgroundColor: string[] = [];

    mounted() {
         
        // Draw chart.
        if (typeof this.chartData != 'undefined') {
            this.setChartColors();
            this.getLabels();
            this.getValues();
            this.drawChart('doughnut');
        } 
    }

    drawChart(chartType: any) {
        switch (chartType) {
            case 'doughnut':
                this.createDoughnutChart();
                break;
            // Other chart types.
            /*
            case :
            break;
            */
        }
    }

    createDoughnutChart() {
        let chart = this.$refs.chartCanvas as HTMLCanvasElement;
        let ctx = chart.getContext("2d");
        let myChart = new Chart(ctx as CanvasRenderingContext2D, {
            type: 'doughnut',
            data: {
                labels: this.getLabels(),
                datasets: [{
                label: 'Resultados',
                data: this.getValues(),
                backgroundColor: this.backgroundColor,
                hoverBackgroundColor: this.hoverBackgroundColor
                }]
            }
        });
  }
    
    setChartColors() {
        let index = 0;
        for (let i = 0; i < this.chartData.length; i++) {
            if (index < ChartComponent.defaultBackgroundColor.length - 1) {
                this.backgroundColor.push(ChartComponent.defaultBackgroundColor[index]);
                this.hoverBackgroundColor.push(ChartComponent.defaultHoverBackgroundColor[index]);
                index++;
            }
            else index = 0;
        }
    }

    getLabels() {
        let labels = this.chartData.filter((v: any, i: any, a: any) => a.indexOf(v) === i); 
        return labels;
    }

    getValues() {
        let values = this.chartData.reduce((prev: any, curr: any) => (prev[curr] = ++prev[curr] || 1, prev), {});
        return Object.keys(values).map(key => values[key]);
    }

};
</script>
<style>
</style>