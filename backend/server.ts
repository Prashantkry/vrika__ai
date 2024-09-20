import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDb } from './utility/db'
import versionRoutes from './routes/versionRoutes'

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/v1",versionRoutes)

const server = http.createServer(app)

// connectDb().then(() =>
    server.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    })
// )

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(`<h1>Backend is osm chill 🎉🥂</h1>`)
})