import React from 'react';
import styles from './Chart.module.scss'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from 'recharts';

interface WeatherChartProps {
    data: { date: string; temperature: number }[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({data}) => (
    <div className={styles.wrapper}>
        <AreaChart width={400} height={100} data={data}>
            <defs>
                <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid stroke="transparent"/>
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 8}}/>
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={false} label={''}/>
            <YAxis yAxisId="right" orientation="right"/>
            <Legend/>
            <Area
                type="monotone"
                dataKey="temperature"
                stroke="none"
                fill="url(#temperatureGradient)"
                yAxisId="left"
                // label={({ x, y, value }: any) => (
                //     <text fontSize={8} x={x} y={y} dy={-3} fill="#8884d8" textAnchor="middle">
                //         {value}
                //     </text>
                // )}
                legendType="none"
            />
        </AreaChart>
    </div>

);

export default WeatherChart;
