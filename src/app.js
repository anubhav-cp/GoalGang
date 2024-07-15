import express from 'express'
import routes from './routes/index.js'
import session from 'express-session'
import passport from 'passport'
import './strategies/googleStrategy.js'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'

const app = express()



app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: `${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`}),
    cookie: {maxAge: 1000*60*60*24}
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())

app.use(routes)


export default app