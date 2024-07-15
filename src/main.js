import dotenv from 'dotenv';
import connectDb from './db/index.js'
import app from './app.js'

dotenv.config();

connectDb()

app.listen(3000, ()=>{
    console.log('Server Activated')
})
