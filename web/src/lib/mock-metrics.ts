export interface MetricPoint {
    timestamp: string; // ISO string
    value: number;
}

export interface DatabaseMetrics {
    connections: MetricPoint[];
    queriesPerSecond: MetricPoint[];
    cacheHitRatio: MetricPoint[]; // percentage
    diskIO: MetricPoint[]; // IOPS
    cpuUsage: MetricPoint[]; // percentage
    memoryUsage: MetricPoint[]; // percentage
}

// Generate random time-series data for a given time range
const generateMetrics = (hours: number): DatabaseMetrics => {
    const now = Date.now();
    const points = 60; // one point per minute
    const interval = (hours * 60 * 60 * 1000) / points;

    const timestamps = Array.from({ length: points }, (_, i) =>
        new Date(now - (points - i) * interval).toISOString()
    );

    const randomWalk = (base: number, volatility: number) => {
        let val = base;
        return timestamps.map(() => {
            val += (Math.random() - 0.5) * volatility;
            return Math.max(0, val);
        });
    };

    return {
        connections: timestamps.map((t, i) => ({ timestamp: t, value: 50 + Math.sin(i / 10) * 20 + Math.random() * 10 })),
        queriesPerSecond: timestamps.map((t, i) => ({ timestamp: t, value: 200 + Math.sin(i / 5) * 100 + Math.random() * 50 })),
        cacheHitRatio: timestamps.map((t, i) => ({ timestamp: t, value: 85 + Math.sin(i / 15) * 10 + Math.random() * 5 })),
        diskIO: timestamps.map((t, i) => ({ timestamp: t, value: 500 + Math.sin(i / 3) * 200 + Math.random() * 100 })),
        cpuUsage: timestamps.map((t, i) => ({ timestamp: t, value: 30 + Math.sin(i / 7) * 15 + Math.random() * 10 })),
        memoryUsage: timestamps.map((t, i) => ({ timestamp: t, value: 60 + Math.sin(i / 12) * 10 + Math.random() * 8 })),
    };
};

export async function fetchMetrics(
    connectionId: string,
    timeRange: '1h' | '6h' | '24h' | '7d'
): Promise<DatabaseMetrics> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return different data based on time range
    const hours = timeRange === '1h' ? 1 : timeRange === '6h' ? 6 : timeRange === '24h' ? 24 : 24 * 7;
    return generateMetrics(hours);
}