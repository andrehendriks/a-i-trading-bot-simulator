
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StockDataPoint } from '../types';

interface PriceChartProps {
    data: StockDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-brand-secondary/80 backdrop-blur-sm p-3 border border-brand-border rounded-lg shadow-xl">
                <p className="label text-sm text-text-secondary">{`${label}`}</p>
                <p className="intro font-bold text-text-primary">{`Price: $${payload[0].value.toFixed(2)}`}</p>
            </div>
        );
    }
    return null;
};

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                    <XAxis 
                        dataKey="date" 
                        stroke="#8B949E"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(str) => {
                            const date = new Date(str);
                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        }}
                    />
                    <YAxis 
                        stroke="#8B949E" 
                        tick={{ fontSize: 12 }}
                        domain={['dataMin - 10', 'dataMax + 10']}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{fontSize: "14px"}} />
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#58A6FF" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#58A6FF" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Line type="monotone" dataKey="price" name="Price (USD)" stroke="#58A6FF" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;
