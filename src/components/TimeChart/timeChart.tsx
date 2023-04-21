import 'chart.js/auto';
import './timeChart.css';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { FC, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { IdTime } from '../../types/types';
import Button from '../Button/Button';

interface TimeChartProps {
  timeArray: IdTime[];
}

Chart.register(annotationPlugin);

const TimeChart: FC<TimeChartProps> = ({ timeArray }) => {
  const [showTimezones, setShowTimezones] = useState<boolean>(false);
  const style = getComputedStyle(document.body);
  const textColor = style.getPropertyValue('--textColor');

  const annotations = [
    {
      type: 'box' as const,
      backgroundColor: 'rgba(206, 17, 67, 0.09)',
      borderWidth: 0,
      xMin: 5,
      xMax: 8,
      label: {
        drawTime: 'afterDraw',
        color: textColor,
        display: true,
        content: 'Pacific',
        position: {
          x: 'center',
          y: 'start',
        },
      },
    },
    {
      type: 'box' as const,
      backgroundColor: 'rgba(10, 255, 0, 0.09)',
      borderWidth: 0,
      xMin: 16,
      xMax: 23,
      label: {
        color: textColor,
        drawTime: 'afterDraw',
        display: true,
        content: 'EU/RU',
        position: {
          x: 'center',
          y: 'start',
        },
      },
    },
    {
      type: 'box' as const,
      backgroundColor: 'rgba(152, 110, 3, 0.09)',
      borderWidth: 0,
      xMin: 8,
      xMax: 16,
      label: {
        color: textColor,
        drawTime: 'afterDraw',
        display: true,
        content: 'AU/ASIA',
        position: {
          x: 'center',
          y: 'start',
        },
      },
    },
    {
      type: 'box' as const,
      backgroundColor: 'rgba(0, 31, 213, 0.09)',
      borderWidth: 0,
      xMin: 23,
      xMax: 24,
      label: {
        color: textColor,
        drawTime: 'afterDraw',
        display: true,
        content: 'US',
        position: {
          x: 'center',
          y: 'start',
        },
      },
    },
    {
      type: 'box' as const,
      backgroundColor: 'rgba(0, 31, 213, 0.09)',
      borderWidth: 0,
      xMin: 0,
      xMax: 5,
      label: {
        color: textColor,
        drawTime: 'afterDraw',
        display: true,
        content: 'US',
        position: {
          x: 'center',
          y: 'start',
        },
      },
    },
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

  const options = {
    type: 'line',
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: textColor,
        },
        title: {
          display: true,
          text: '1000 Latest Kills',
        },
      },
      x: {
        ticks: {
          color: textColor,
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

  const handleClick = (): void => setShowTimezones(!showTimezones);

  return (
    <>
      <div className="chartContainer">
        <Line data={data} options={options} />
      </div>
      <div className="buttonContainer">
        <Button type="button" onClick={handleClick}>
          Show Timezones
        </Button>
      </div>
    </>
  );
};

export default TimeChart;
