import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useConnectionStore, type DBType } from '@/store/connection-store';

export function AddConnectionDialog() {
    const [open, setOpen] = useState(false);
    const addConnection = useConnectionStore((s) => s.addConnection);

    const [formData, setFormData] = useState({
        name: '',
        type: 'postgresql' as DBType,
        host: '',
        port: 5432,
        database: '',
        username: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addConnection(formData);
        setOpen(false);
        // Reset form
        setFormData({
            name: '',
            type: 'postgresql',
            host: '',
            port: 5432,
            database: '',
            username: '',
            password: '',
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Connection</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>New Database Connection</DialogTitle>
                        <DialogDescription>
                            Enter the details of your database. Credentials are stored locally.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value: DBType) => setFormData({ ...formData, type: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select database type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="oracle">Oracle</SelectItem>
                                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                                    <SelectItem value="mysql">MySQL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="host" className="text-right">
                                Host
                            </Label>
                            <Input
                                id="host"
                                value={formData.host}
                                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="port" className="text-right">
                                Port
                            </Label>
                            <Input
                                id="port"
                                type="number"
                                value={formData.port}
                                onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) })}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="database" className="text-right">
                                Database
                            </Label>
                            <Input
                                id="database"
                                value={formData.database}
                                onChange={(e) => setFormData({ ...formData, database: e.target.value })}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Connection</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}