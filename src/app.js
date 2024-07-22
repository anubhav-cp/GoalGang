import express from 'express'
import routes from './routes/index.js'
import session from 'express-session'
import passport from 'passport'
import './strategies/googleStrategy.js'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import path from "path"
import { fileURLToPath } from 'url'

export function createApp(){
    const app = express()
    app.set('view engine', 'ejs')
    app.use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl: `${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`}),
        cookie: {maxAge: 1000*60*60*24}
    }));


    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.json())
    app.use(cookieParser())
    app.use('/public', express.static(path.join(__dirname, 'public')))
    app.use(express.urlencoded({extended: true}))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(routes)

    return app
    }



