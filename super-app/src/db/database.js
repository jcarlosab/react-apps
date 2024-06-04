import { createClient } from "@libsql/client"
import { getNameMonth } from "../utils/utils";


const { VITE_REACT_DATABASE_URL, VITE_REACT_AUTH_TOKEN } = import.meta.env

const client = createClient({
    url: VITE_REACT_DATABASE_URL,
    authToken: VITE_REACT_AUTH_TOKEN,
})

export const getListAmount = async () => {
    const txn = await client.transaction("read");
    const rs = await txn.execute("SELECT id, fdate, month, year, category, amount FROM transacciones")
    return rs.rows
}

export const deleteAmount = async (id) => {
    const txn = await client.transaction("write");
    await txn.execute({
        sql: "DELETE FROM transacciones WHERE id = ?",
        args: [id],
    });
    await txn.commit();
}

export const addAmount = async (data) => {
    const txn = await client.transaction("write");
    await txn.execute({
        sql: "INSERT INTO transacciones (id, fdate, month, year, category, amount) VALUES (?, ?, ?, ?, ?, ?)",
        args: [data.id, data.fdate, data.month, data.year, data.category, data.amount],
    });
    await txn.commit();
}

export const getListByCategory = async (category) => {
    const txn = await client.transaction("read");
    const rs = await txn.execute({
        sql: "SELECT id, fdate, month, year, category, amount FROM transacciones WHERE category = ? AND month = ?",
        args: [category, getNameMonth()],
    })
    return rs.rows
}

export const getTotalAmountByCategory = async () => {
    const txn = await client.transaction("read");
    const rs = await txn.execute(`SELECT
            year AS "Year",
            month AS "Month",
            COALESCE(SUM(CASE WHEN category = 'market' THEN amount END), 0) AS "Super",
            COALESCE(SUM(CASE WHEN category = 'fuel' THEN amount END), 0) AS "Gasoil",
            COALESCE(SUM(CASE WHEN category = 'others' THEN amount END), 0) AS "Otros",
            COALESCE(SUM(amount), 0) AS "Total"
        FROM transacciones
        GROUP BY year, month
        ORDER BY year, month
    `)
    return rs.rows
}
