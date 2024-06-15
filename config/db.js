import mongoose from 'mongoose'
import colors from 'colors'

  export const connectDB=async()=>
    {
        try {
            await mongoose.connect(process.env.MONGODB_URL)
            console.log(`Mongodb conneted ${mongoose.connection.host}`.bgCyan)
        } catch (error) {
            console.log(`Mongodb Error ${error}`.bgRed.white)
        }
    }