import React from 'react';
import styles from './Chart.module.scss';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip,
    Label,
} from 'recharts';
import dayjs from "dayjs";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name?: string; value?: string | number }>;
    celsius: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload,celsius }) => {
    if (active && payload && payload.length) {
        debugger
        //@ts-ignore
        const temperature = payload[0].payload.temperature;
        //@ts-ignore
        const date = payload[0].payload.date;

        return (
            <div className={styles.customTooltip} style={{color:'black'}}>
                {celsius && <span> {temperature > 0 ? '+' : ''}{celsius ? temperature.toString().slice(0, 4) : ((temperature * 9 / 5) + 32).toString().slice(0, 4)} &#8451;</span>}
                {!celsius && <span> {((temperature * 9 / 5) + 32) > 0 ? '+' : ''}{celsius ? temperature.toString().slice(0, 4) : ((temperature * 9 / 5) + 32).toString().slice(0, 4)} &#8457; </span>}
                <p>{dayjs.unix(date).format('ddd, D MMMM, HH:mm')}</p>
            </div>
        );
    }

    return null;
};

interface WeatherChartProps {
    data: { date: string; temperature: number }[];
    chartColor: string;
    id: string;
    celsius: boolean
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data, chartColor, id,celsius }) => {
    console.log(chartColor);
    return (
        <div className={styles.wrapper}>
            <AreaChart width={400} height={100} data={data}>
                <defs>
                    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="30%" stopColor={chartColor} stopOpacity={1} />
                        <stop offset="90%" stopColor={chartColor} stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid stroke="transparent" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={false} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={false} label={''} />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip celsius={celsius}/>}/>
                <Legend />
                <Area
                    type="monotone"
                    dataKey="temperature"
                    stroke={chartColor}
                    fill={`url(#${id}`}
                    yAxisId="left"
                    legendType="none"
                />
                <Label value="Custom X-Axis Label" offset={0} position="bottom" />
                <Label
                    value="Custom Y-Axis Label"
                    offset={0}
                    position="left"
                    angle={-90}
                    style={{ textAnchor: 'middle' }}
                />
            </AreaChart>
        </div>
    );
};

export default WeatherChart;
