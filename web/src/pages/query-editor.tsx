import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function QueryEditor() {
    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Query Editor</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Select a database connection and run your SQL queries here.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}