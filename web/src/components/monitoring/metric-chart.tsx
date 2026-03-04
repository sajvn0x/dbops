import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricPoint } from '@/lib/mock-metrics';

interface MetricChartProps {
    title: string;
    data: MetricPoint[];
    dataKey?: string;
    color?: string;
    unit?: string;
}

export function MetricChart({
    title,
    data,
    dataKey = 'value',
    color = '#2563eb',
    unit = '',
}: MetricChartProps) {
    const formatTimestamp = (ts: string) => {
        const date = new Date(ts);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={formatTimestamp}
                                interval="preserveStartEnd"
                                minTickGap={30}
                            />
                            <YAxis
                                tickFormatter={(v) => `${v}${unit}`}
                                domain={['auto', 'auto']}
                            />
                            <Tooltip
                                labelFormatter={(label) => new Date(label).toLocaleString()}
                                formatter={(value: number) => [`${value}${unit}`, title]}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey={dataKey}
                                stroke={color}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}