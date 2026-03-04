import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ResultsTableProps {
    columns: string[];
    rows: any[][];
    rowCount: number;
    error?: string;
}

export function ResultsTable({ columns, rows, rowCount, error }: ResultsTableProps) {
    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (!columns.length) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No results to display. Run a query to see output.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
                {rowCount} row{rowCount !== 1 ? 's' : ''} returned
            </div>
            <div className="border rounded-md overflow-auto max-h-96">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead key={col}>{col}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={i}>
                                {row.map((cell, j) => (
                                    <TableCell key={j}>{cell?.toString() ?? 'NULL'}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}