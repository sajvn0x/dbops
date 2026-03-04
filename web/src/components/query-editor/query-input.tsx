import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface QueryInputProps {
    value: string;
    onChange: (value: string) => void;
    onRun: () => void;
    isRunning: boolean;
    canRun: boolean;
}

export function QueryInput({ value, onChange, onRun, isRunning, canRun }: QueryInputProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">SQL Query</h3>
                <Button onClick={onRun} disabled={!canRun || isRunning} size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    {isRunning ? 'Running...' : 'Run'}
                </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
                <Editor
                    height="200px"
                    defaultLanguage="sql"
                    value={value}
                    onChange={(val) => onChange(val || '')}
                    options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: 'on',
                        automaticLayout: true,
                    }}
                    theme="vs-dark" // or 'light' based on your theme
                />
            </div>
        </div>
    );
}