import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { ISimpleLineChartProps } from '@/config/interfaces';

const SimpleLineChart: React.FC<ISimpleLineChartProps> = ({ chartData, xColumns, yColumns }) => {
  if (!chartData || chartData.length === 0 || xColumns.length === 0 || yColumns.length === 0) {
    return <div>No data available or columns not specified.</div>;
  }

  return (
    <>
      <LineChart width={800} height={400} data={chartData}>
        {
            xColumns.map((xColumn: string, index: any)=>{
                return (<XAxis
                    key={index}
                    dataKey={xColumn}
                    type='category'
                    label={{value: xColumn, position: 'insideBottom'}}
                    />
                )
            })
        }
        {
            yColumns.map((yColumn: string, index: any)=>{
                return (<YAxis
                    key={index}
                    dataKey={yColumn}
                    label={{value: yColumn, angle: -90, position: 'insideLeft'}}
                    />
                )
            })
        }
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        {
            yColumns.map((yColumn: string, index: any) => {
                return (<Line
                key={index}
                type="monotone"
                dataKey={yColumn}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                activeDot={false}
                dot={false}
            />)
            })
        }
      </LineChart>
    </>
  );
};

export default SimpleLineChart;
