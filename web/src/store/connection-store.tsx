import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DBType = 'postgresql' | 'mysql' | 'oracle';
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export interface Connection {
    id: string;
    name: string;
    type: DBType;
    host: string;
    port: number;
    database: string;
    username: string;
    status: ConnectionStatus;
    errorMessage?: string;
}

interface ConnectionStore {
    connections: Connection[];
    addConnection: (conn: Omit<Connection, 'id' | 'status'>) => void;
    updateConnection: (id: string, updates: Partial<Connection>) => void;
    removeConnection: (id: string) => void;
    connect: (id: string) => Promise<void>;
    disconnect: (id: string) => Promise<void>;
    reconnect: (id: string) => Promise<void>;
}

const mockConnect = async (_conn: Connection) => {
    // Simulate network delay and random success/failure
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (Math.random() > 0.2) return true;
    throw new Error('Connection refused');
};

const mockDisconnect = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
};

export const useConnectionStore = create<ConnectionStore>()(
    persist(
        (set, get) => ({
            connections: [],
            addConnection: (connData) => {
                const newConn: Connection = {
                    ...connData,
                    id: crypto.randomUUID(),
                    status: 'disconnected',
                };
                set((state) => ({ connections: [...state.connections, newConn] }));
            },
            updateConnection: (id, updates) =>
                set((state) => ({
                    connections: state.connections.map((c) =>
                        c.id === id ? { ...c, ...updates } : c
                    ),
                })),
            removeConnection: (id) =>
                set((state) => ({
                    connections: state.connections.filter((c) => c.id !== id),
                })),
            connect: async (id) => {
                const conn = get().connections.find((c) => c.id === id);
                if (!conn) return;

                // Set status to connecting
                get().updateConnection(id, { status: 'connecting', errorMessage: undefined });

                try {
                    await mockConnect(conn);
                    get().updateConnection(id, { status: 'connected' });
                } catch (err: any) {
                    get().updateConnection(id, {
                        status: 'error',
                        errorMessage: err.message || 'Connection failed',
                    });
                }
            },
            disconnect: async (id) => {
                const conn = get().connections.find((c) => c.id === id);
                if (!conn) return;

                get().updateConnection(id, { status: 'connecting' }); // optional: show "disconnecting"
                try {
                    await mockDisconnect();
                    get().updateConnection(id, { status: 'disconnected', errorMessage: undefined });
                } catch (err: any) {
                    get().updateConnection(id, {
                        status: 'error',
                        errorMessage: err.message || 'Disconnect failed',
                    });
                }
            },
            reconnect: async (id) => {
                const conn = get().connections.find((c) => c.id === id);
                if (!conn) return;
                await get().disconnect(id);
                // Wait a bit then connect again
                setTimeout(() => get().connect(id), 500);
            },
        }),
        {
            name: 'dbops-connections', // localStorage key
        }
    )
);