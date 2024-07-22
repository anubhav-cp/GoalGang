import dotenv from 'dotenv';
import connectDb from './db/index.js'
import { createApp } from './app.js'

dotenv.config();

connectDb()

const app = createApp()

app.listen(3000, ()=>{
    console.log('Server Activated')
})
