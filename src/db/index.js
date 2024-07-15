import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`)
        console.log(`\n MongoDb Connected !! DB Host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('MongoDb Connection Failed!!', error)
        process.exit(1)
    }
}

export default connectDb