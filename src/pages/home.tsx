import { BarChart } from '@/components/BarChart';
import PieChartComponent from '@/components/PieChartComponent';

export default function Home() {
  return (
    <div>
      <div className='flex justify-between'>
        <PieChartComponent />
        <PieChartComponent />
        <PieChartComponent />
        <PieChartComponent />
      </div>
      <BarChart />
    </div>
  );
}
