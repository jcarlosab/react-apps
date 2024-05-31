"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json()); // for parsing application/json
app.get('/ping', (req, res) => {
    console.log('someone pinged here');
    res.send('ping');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// const client = createClient({
//   url: import.meta.env.DATABASE_URL ?? "",
//   authToken: import.meta.env.DATABASE_TOKEN ?? "",
// })
// export const addAmount = async (amount) => {
//   await client.query(`
//     INSERT INTO "amount" (amount) VALUES ($1)
//   `, [amount])
// }
// app.get('/api/amount', async (req, res) => {
//   const { rows } = await client.query(`
//     SELECT * FROM "amount"
//   `)
//   res.json(rows)
// })
