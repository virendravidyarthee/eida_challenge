import { Record } from "../../../pages";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import React from "react";
import moment from "moment";


const lineChart: React.FC<{ data: [Record], xAxisKey: string, yAxisKey: string }> = ({ data, xAxisKey, yAxisKey }) => {
    const domainMin = Math.min(...(data.map(record => Number(record[xAxisKey as keyof Record]))));
    const domainMax = Math.max(...(data.map(record => Number(record[xAxisKey as keyof Record]))));
    return (
        <ResponsiveContainer width={'100%'} height={250}>
            <LineChart id="chart" data={data}>
                <XAxis dataKey={xAxisKey} tickFormatter={formatXAxis} />
                <YAxis domain={[domainMin, domainMax]} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="basis" dot={false} dataKey={yAxisKey} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
}

function formatXAxis(tickItem: Date) {
    // If using moment.js
    return moment(tickItem).format('HH:mm')
}

export default lineChart;
