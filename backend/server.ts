import http, { METHODS } from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDb } from './utility/db'
import versionRoutes from './routes/versionRoutes'

dotenv.config()
const PORT = process.env.PORT
const CLIENT_URL =process.env.CLIENT_URL
if (!PORT || !CLIENT_URL) {
    console.error('Please define PORT and CLIENT_URL in .env')
    process.exit(1)
}

const app = express()
app.use(cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/v1", versionRoutes)

const server = http.createServer(app)

connectDb().then(() =>
    server.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    })
)

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(`<h1>Backend is osm chill 🎉🥂</h1>`)
})