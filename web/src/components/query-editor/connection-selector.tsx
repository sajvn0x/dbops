import { useConnectionStore } from '@/store/connection-store';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface ConnectionSelectorProps {
    selectedId: string | null;
    onSelect: (id: string) => void;
    onConnect: (id: string) => void;
}

export function ConnectionSelector({ selectedId, onSelect, onConnect }: ConnectionSelectorProps) {
    const connections = useConnectionStore((s) => s.connections);

    return (
        <div className="flex items-center gap-2">
            <Select
                value={selectedId || undefined}
                onValueChange={onSelect}
            >
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select a connection" />
                </SelectTrigger>
                <SelectContent>
                    {connections.map((conn) => (
                        <SelectItem key={conn.id} value={conn.id}>
                            <div className="flex items-center justify-between w-full">
                                <span>{conn.name}</span>
                                <Badge
                                    variant={conn.status === 'connected' ? 'default' : 'secondary'}
                                    className="ml-2"
                                >
                                    {conn.status}
                                </Badge>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {selectedId && (
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onConnect(selectedId)}
                    disabled={
                        useConnectionStore.getState().connections.find((c) => c.id === selectedId)?.status ===
                        'connected'
                    }
                >
                    <Play className="h-4 w-4 mr-1" />
                    Connect
                </Button>
            )}
        </div>
    );
}