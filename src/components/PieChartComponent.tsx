import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChartComponent = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'pie', number[], string>>();

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current?.getContext('2d');
    if (!myChartRef) return;

    chartInstance.current = new Chart(myChartRef, {
      type: 'pie',
      data: {
        labels: ['Đang chờ', 'Đang xử lý', 'Đã hoàn thành', 'Đã hủy'],
        datasets: [
          {
            data: [300, 50, 100, 200],
            backgroundColor: ['yellow', 'blue', 'green', 'red'],
            // borderRadius: 5,
          },
        ],
      },
      options: {
        animation: {
          duration: 1000,
          easing: 'easeInOutCirc',
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className='p-2 bg-white rounded'>
      <canvas
        ref={chartRef}
        className='flex items-center justify-center m-0 mx-auto mt-5 w-72 h-72'
      />
    </div>
  );
};

export default PieChartComponent;
