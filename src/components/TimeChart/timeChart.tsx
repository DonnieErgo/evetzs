import 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { FC, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { IdTime } from '../../types/types';
import Button from '../Button/Button';
import {
  pacificAnnotation,
  euRuAnnotation,
  auAsiaAnnotation,
  usAnnotation,
  usAnnotation2,
} from './config';

interface TimeChartProps {
  timeArray: IdTime[];
}

export type LineChartOptions = Parameters<typeof Line>['0']['options'];

const TimeChart: FC<TimeChartProps> = ({ timeArray }) => {
  ChartJS.register(annotationPlugin);
  const [showTimezones, setShowTimezones] = useState<boolean>(false);

  const annotations = [
    pacificAnnotation,
    euRuAnnotation,
    auAsiaAnnotation,
    usAnnotation,
    usAnnotation2,
  ];

  const countTimestampsByHour = (timestamps: IdTime[]) => {
    const counts = new Array(24).fill(0);
    timestamps.forEach(({ time }) => {
      const hour = new Date(time).getUTCHours();
      counts[hour]++;
    });
    counts[24] = counts[0];
    return counts;
  };

  const options: LineChartOptions = {
    type: 'line',
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: 'white',
        },
        title: {
          display: true,
          text: '1000 Latest Kills',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
        title: {
          display: true,
          text: 'EvE Time',
        },
      },
    },
    elements: {
      point: {
        radius: 3,
      },
    },
    plugins: {
      annotation: {
        common: {
          drawTime: 'beforeDraw',
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        annotations: showTimezones ? annotations : {},
      },
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: false,
        text: 'ZKB Kills',
      },
    },
    interaction: {
      intersect: false,
    },
  };

  const data = {
    labels: [...Array(25).keys()],
    datasets: [
      {
        label: 'ZKB Kills',
        display: false,
        backgroundColor: 'rgba(173,173,173,0.2)',
        borderColor: 'rgb(122,122,122)',
        data: countTimestampsByHour(timeArray),
        lineTension: 0.2,
        fill: true,
      },
    ],
  };

  const handleClick = (): void => {
    setShowTimezones(!showTimezones);
  };

  // fix annotation types

  return (
    <>
      <div style={{ margin: '100px auto 0', width: '100%', height: '100%' }}>
        <Line data={data} options={options} />
      </div>
      <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button type="button" onClick={handleClick}>
          Show Timezones
        </Button>
      </div>
    </>
  );
};

export default TimeChart;
