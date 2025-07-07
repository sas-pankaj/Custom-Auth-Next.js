'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProductChart({products}: {products: Array<any>}) {
    const productCategoriesCount: Record<string, number> = {};
    products.forEach(product => productCategoriesCount[product.category] = (productCategoriesCount[product.category] || 0) + 1);

    const pieData: ChartData<'pie', number[], string > = {
        labels: Object.keys(productCategoriesCount),
        datasets: [
            {
                label: 'Category count',
                data: Object.values(productCategoriesCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ]
            }
        ]
    }
  return (
    <div className='w-1/2 justify-self-center'>
        <Pie data={pieData}/>
    </div>
  )
}
