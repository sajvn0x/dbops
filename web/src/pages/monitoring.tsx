import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { ConnectionSelector } from '@/components/query-editor/connection-selector'; // reuse
import { TimeRangeSelector, type TimeRange } from '@/components/monitoring/time-range-selector';
import { MetricChart } from '@/components/monitoring/metric-chart';
import { useConnectionStore } from '@/store/connection-store';
import { fetchMetrics, type DatabaseMetrics } from '@/lib/mock-metrics';

export function Monitoring() {
    const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
    const [timeRange, setTimeRange] = useState<TimeRange>('1h');
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [metrics, setMetrics] = useState<DatabaseMetrics | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connections = useConnectionStore((s) => s.connections);
    const connect = useConnectionStore((s) => s.connect);

    const loadMetrics = useCallback(async () => {
        if (!selectedConnectionId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchMetrics(selectedConnectionId, timeRange);
            setMetrics(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load metrics');
        } finally {
            setLoading(false);
        }
    }, [selectedConnectionId, timeRange]);

    // Load metrics when connection or time range changes
    useEffect(() => {
        if (selectedConnectionId) {
            loadMetrics();
        } else {
            setMetrics(null);
        }
    }, [selectedConnectionId, timeRange, loadMetrics]);

    // Auto-refresh every 10 seconds
    useEffect(() => {
        if (!autoRefresh || !selectedConnectionId) return;
        const interval = setInterval(loadMetrics, 10000);
        return () => clearInterval(interval);
    }, [autoRefresh, selectedConnectionId, loadMetrics]);

    const selectedConnection = connections.find((c) => c.id === selectedConnectionId);
    const isConnected = selectedConnection?.status === 'connected';

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Monitoring Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-4">
                        <ConnectionSelector
                            selectedId={selectedConnectionId}
                            onSelect={setSelectedConnectionId}
                            onConnect={connect}
                        />
                        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="auto-refresh"
                                checked={autoRefresh}
                                onCheckedChange={setAutoRefresh}
                                disabled={!selectedConnectionId}
                            />
                            <Label htmlFor="auto-refresh">Auto-refresh (10s)</Label>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={loadMetrics}
                            disabled={!selectedConnectionId || loading}
                        >
                            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>

                    {/* Connection status warning */}
                    {selectedConnectionId && !isConnected && (
                        <div className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                            This connection is not active. Connect to see live metrics.
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            Error: {error}
                        </div>
                    )}

                    {/* Metrics charts */}
                    {metrics && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricChart
                                title="Active Connections"
                                data={metrics.connections}
                                color="#2563eb"
                                unit=" conn"
                            />
                            <MetricChart
                                title="Queries per Second"
                                data={metrics.queriesPerSecond}
                                color="#16a34a"
                                unit=" q/s"
                            />
                            <MetricChart
                                title="Cache Hit Ratio"
                                data={metrics.cacheHitRatio}
                                color="#d97706"
                                unit="%"
                            />
                            <MetricChart
                                title="Disk IOPS"
                                data={metrics.diskIO}
                                color="#dc2626"
                                unit=" IOPS"
                            />
                            <MetricChart
                                title="CPU Usage"
                                data={metrics.cpuUsage}
                                color="#7c3aed"
                                unit="%"
                            />
                            <MetricChart
                                title="Memory Usage"
                                data={metrics.memoryUsage}
                                color="#db2777"
                                unit="%"
                            />
                        </div>
                    )}

                    {!selectedConnectionId && (
                        <div className="text-center py-12 text-muted-foreground">
                            Select a database connection to view metrics.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}