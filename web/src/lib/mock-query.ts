export interface QueryResult {
    columns: string[];
    rows: any[][];
    rowCount: number;
    error?: string;
}

// Mock data for different query types
export async function executeMockQuery(sql: string): Promise<QueryResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const upperSql = sql.trim().toUpperCase();

    if (upperSql.startsWith('SELECT')) {
        if (upperSql.includes('FROM USERS')) {
            return {
                columns: ['id', 'name', 'email', 'created_at'],
                rows: [
                    [1, 'John Doe', 'john@example.com', '2023-01-01'],
                    [2, 'Jane Smith', 'jane@example.com', '2023-01-02'],
                    [3, 'Bob Johnson', 'bob@example.com', '2023-01-03'],
                ],
                rowCount: 3,
            };
        }
        if (upperSql.includes('FROM ORDERS')) {
            return {
                columns: ['order_id', 'user_id', 'amount', 'status'],
                rows: [
                    [101, 1, 250.00, 'shipped'],
                    [102, 2, 125.50, 'pending'],
                    [103, 1, 89.99, 'delivered'],
                ],
                rowCount: 3,
            };
        }
        // Default generic result
        return {
            columns: ['column1', 'column2', 'column3'],
            rows: [
                ['value1', 'value2', 'value3'],
                ['value4', 'value5', 'value6'],
            ],
            rowCount: 2,
        };
    }

    if (upperSql.startsWith('INSERT') || upperSql.startsWith('UPDATE') || upperSql.startsWith('DELETE')) {
        return {
            columns: ['rows_affected'],
            rows: [[1]],
            rowCount: 1,
        };
    }

    // Unknown query type – return error
    return {
        columns: [],
        rows: [],
        rowCount: 0,
        error: 'Unsupported query type (mock only accepts SELECT/INSERT/UPDATE/DELETE)',
    };
}