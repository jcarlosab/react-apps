import express from 'express'
import diaryRouter from './routes/diaries'

const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json

app.get('/ping', (_req, res) => { // usar _ para ignorar parámetros
  console.log('someone pinged here')
  res.send('ping')
})

app.use('/api/diaries', diaryRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port} cambio`)
})

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
