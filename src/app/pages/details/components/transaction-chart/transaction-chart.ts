import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { TipPrice } from '../../../../shared/models/transaction.model';
import * as echarts from 'echarts';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-transaction-chart',
  standalone: true,
  templateUrl: './transaction-chart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class TransactionChart {
  public chartData = input<TipPrice | undefined>();
  protected activePeriod = signal<'days' | 'months'>('days');

  private chartContainer = viewChild<ElementRef>('chartContainer');
  private chartInstance: echarts.ECharts | null = null;

  @HostListener('window:resize')
  onResize() {
    this.chartInstance?.resize();
  }

  constructor() {
    effect(() => {
      const data = this.chartData();
      const container = this.chartContainer();
      const period = this.activePeriod();

      if (data && container) {
        const values = period === 'days' ? data.days : data.months;
        this.renderChart(values);
      }
    });
  }

  private renderChart(dataValues: number[]) {
    if (!this.chartInstance) {
      this.chartInstance = echarts.init(this.chartContainer()?.nativeElement);
    }

    const option: echarts.EChartsOption = {
      grid: {
        top: '10%',
        left: '2%',
        right: '2%',
        bottom: '0%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        formatter: '{c} $',
        padding: [4, 8],
        // textStyle: { color: '#333' },
        extraCssText: 'border-radius: 5px;',
        axisPointer: {
          type: 'line',
          lineStyle: { color: '#ff8a48', width: 1 },
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataValues.map((_, i) => i),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1.0,
        interval: 0.1,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f0f0f0' } },
        axisLabel: { color: '#9ca3af' },
      },
      series: [
        {
          data: dataValues,
          type: 'line',
          smooth: true,
          showSymbol: false,
          emphasis: {
            scale: true,
            itemStyle: {
              color: '#fff',
              borderColor: '#ff8a48',
              borderWidth: 3,
            },
          },
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: { color: '#ff8a48' },
          lineStyle: { width: 3, color: '#ff8a48' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(255, 138, 72, 0.4)' },
              { offset: 1, color: 'rgba(255, 138, 72, 0.05)' },
            ]),
          },
        },
      ],
    };

    this.chartInstance.setOption(option);
  }
}
