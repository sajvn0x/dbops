import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Play, Square, RefreshCw, Trash2 } from 'lucide-react';
import { useConnectionStore, type Connection, type ConnectionStatus } from '@/store/connection-store';

const statusVariant: Record<ConnectionStatus, 'default' | 'destructive' | 'outline' | 'secondary'> = {
    connected: 'default',
    disconnected: 'secondary',
    connecting: 'outline',
    error: 'destructive',
};

const statusLabel: Record<ConnectionStatus, string> = {
    connected: 'Connected',
    disconnected: 'Disconnected',
    connecting: 'Connecting...',
    error: 'Error',
};

interface Props {
    connections: Connection[];
}

export function ConnectionsTable({ connections }: Props) {
    const { connect, disconnect, reconnect, removeConnection } = useConnectionStore();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Host:Port</TableHead>
                    <TableHead>Database</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {connections.map((conn) => (
                    <TableRow key={conn.id}>
                        <TableCell className="font-medium">{conn.name}</TableCell>
                        <TableCell className="capitalize">{conn.type}</TableCell>
                        <TableCell>{conn.host}:{conn.port}</TableCell>
                        <TableCell>{conn.database}</TableCell>
                        <TableCell>
                            <Badge variant={statusVariant[conn.status]}>
                                {statusLabel[conn.status]}
                            </Badge>
                            {conn.errorMessage && (
                                <span className="ml-2 text-xs text-red-600" title={conn.errorMessage}>
                                    ⚠️
                                </span>
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                        onClick={() => connect(conn.id)}
                                        disabled={conn.status === 'connected' || conn.status === 'connecting'}
                                    >
                                        <Play className="mr-2 h-4 w-4" /> Connect
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => disconnect(conn.id)}
                                        disabled={conn.status !== 'connected'}
                                    >
                                        <Square className="mr-2 h-4 w-4" /> Disconnect
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => reconnect(conn.id)}
                                        disabled={conn.status === 'connecting'}
                                    >
                                        <RefreshCw className="mr-2 h-4 w-4" /> Reconnect
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => removeConnection(conn.id)}
                                        className="text-red-600"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" /> Remove
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}