import { AddConnectionDialog } from '@/components/add-connection-dialog';
import { ConnectionsTable } from '@/components/connections-table';
import { useConnectionStore } from '@/store/connection-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ConnectionsPage() {
    const connections = useConnectionStore((s) => s.connections);

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Database Connections</CardTitle>
                    <AddConnectionDialog />
                </CardHeader>
                <CardContent>
                    {connections.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                            No connections yet. Click "Add Connection" to get started.
                        </p>
                    ) : (
                        <ConnectionsTable connections={connections} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}