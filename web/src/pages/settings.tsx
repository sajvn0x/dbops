import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Settings() {
    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Configure application preferences and default behaviors.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}