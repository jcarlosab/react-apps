import { createClient } from "@libsql/client"
import { getNameMonth } from "../utils/utils";


const { VITE_REACT_DATABASE_URL, VITE_REACT_AUTH_TOKEN } = import.meta.env

const client = createClient({
    url: VITE_REACT_DATABASE_URL,
    authToken: VITE_REACT_AUTH_TOKEN,
})

export const getListAmount = async () => {
    const txn = await client.transaction("read");
    const rs = await txn.execute("SELECT id, fecha, mes, año, categoria, importe FROM transacciones")
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
        sql: "INSERT INTO transacciones (id, fecha, mes, año, categoria, importe) VALUES (?, ?, ?, ?, ?, ?)",
        args: [data.id, data.date, data.month, data.year, data.category, data.amount],
    });
    await txn.commit();
}

export const getListByCategory = async (category) => {
    const txn = await client.transaction("read");
    const rs = await txn.execute({
        sql: "SELECT id, fecha, mes, año, categoria, importe FROM transacciones WHERE categoria = ? AND mes = ?",
        args: [category, getNameMonth()],
    })
    return rs.rows
}

export const getTotalAmountByCategory = async () => {
    const txn = await client.transaction("read");
    const rs = await txn.execute(`SELECT
            año AS "Anno",
            mes AS "Mes",
            COALESCE(SUM(CASE WHEN categoria = 'market' THEN importe END), 0) AS "Super",
            COALESCE(SUM(CASE WHEN categoria = 'fuel' THEN importe END), 0) AS "Gasoil",
            COALESCE(SUM(CASE WHEN categoria = 'others' THEN importe END), 0) AS "Otros",
            COALESCE(SUM(importe), 0) AS "Total"
        FROM transacciones
        GROUP BY año, mes
        ORDER BY año, mes
    `)
    return rs.rows
}