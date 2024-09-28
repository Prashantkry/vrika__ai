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
const CLIENT_URL = process.env.CLIENT_URL
if (!PORT || !CLIENT_URL) {
    console.error('Please define PORT and CLIENT_URL in .env')
    process.exit(1)
}

const app = express()

// CORS Configuration
app.use(cors({
    origin: (origin, callback) => {
        if (origin === CLIENT_URL) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials such as cookies
    preflightContinue: true, // Allow preflight to continue
    maxAge: 600, // Cache the preflight response for 10 minutes
}));

// Handle preflight OPTIONS request
app.options('*', cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

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