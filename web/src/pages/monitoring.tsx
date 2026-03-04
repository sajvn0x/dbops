import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Monitoring() {
    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Monitoring Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Real-time metrics and performance charts will appear here.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}