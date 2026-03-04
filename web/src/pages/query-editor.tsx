import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConnectionSelector } from '@/components/query-editor/connection-selector';
import { QueryInput } from '@/components/query-editor/query-input';
import { ResultsTable } from '@/components/query-editor/results-table';
import { useConnectionStore } from '@/store/connection-store';
import { executeMockQuery, type QueryResult } from '@/lib/mock-query';

export function QueryEditor() {
    const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
    const [query, setQuery] = useState('SELECT * FROM users;');
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<QueryResult | null>(null);

    const connections = useConnectionStore((s) => s.connections);
    const connect = useConnectionStore((s) => s.connect);

    const selectedConnection = connections.find((c) => c.id === selectedConnectionId);
    const isConnected = selectedConnection?.status === 'connected';

    const handleRunQuery = async () => {
        if (!query.trim()) return;

        setIsRunning(true);
        setResult(null);

        try {
            // In a real app, you'd call your backend API with the connection ID and query
            const mockResult = await executeMockQuery(query);
            setResult(mockResult);
        } catch (err: any) {
            setResult({
                columns: [],
                rows: [],
                rowCount: 0,
                error: err.message || 'Query execution failed',
            });
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Query Editor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <ConnectionSelector
                        selectedId={selectedConnectionId}
                        onSelect={setSelectedConnectionId}
                        onConnect={connect}
                    />

                    <QueryInput
                        value={query}
                        onChange={setQuery}
                        onRun={handleRunQuery}
                        isRunning={isRunning}
                        canRun={!!selectedConnectionId && isConnected}
                    />

                    {result && (
                        <ResultsTable
                            columns={result.columns}
                            rows={result.rows}
                            rowCount={result.rowCount}
                            error={result.error}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}