import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { IdTime } from '../../types/types';

interface TimeChartProps {
  timeArray: IdTime[];
}

const TimeChart = ({ timeArray }: TimeChartProps) => {
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
        title: {
          display: true,
          text: '1000 Latest Kills',
        },
      },
      x: {
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
        backgroundColor: 'rgb(0,129,133, 0.2)',
        borderColor: 'rgb(22,136,115)',
        data: countTimestampsByHour(timeArray),
        lineTension: 0.2,
        fill: true,
      },
    ],
  };

  // add button to colorize TZs 5-8 Pacific, 8-15 AU/ASIA, 15-23 EU/RU, 23-5 US
  // fix kills to be between points and show tooltip of previous in between
  // fix css

  return (
    <div style={{ margin: '100px auto 0', width: '1000px', height: '800px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TimeChart;
