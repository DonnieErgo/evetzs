import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { IdTime } from "../types/types";

interface TimeChartProps {
  timeArray: IdTime[];
}

const TimeChart = ({ timeArray }: TimeChartProps) => {

  const countTimestampsByHour = (timestamps: IdTime[]) =>
    timestamps.reduce((acc, { time }) => {
      const hour = new Date(time).getUTCHours();
      acc[hour]++;
      return acc;
    }, new Array(24).fill(0));

  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Kills',
        }
      },
      x: {
        title: {
          display: true,
          text: 'EvE Time',
        }
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
  };

  const data = {
    labels: [...Array(25).keys()],
    datasets: [
      {
        label: "ZKB Kills",
        display: false,
        backgroundColor: "rgb(0,129,133, 0.2)",
        borderColor: "rgb(22,136,115)",
        data: countTimestampsByHour(timeArray),
        lineTension: 0.2,
        fill: true,
      },
    ],
  };

  return (
    <div style={{marginTop: '50px', width: '1000px', height: '800px'}}>
      <Line data={data} options={options}/>
    </div>
  );
};

export default TimeChart;
