import mongoose from "mongoose"
import env from "dotenv"
env.config()

const url:string =process.env.APPLICATION_URL!

const db=()=>{
    mongoose.connect(url).then(()=>{
        console.log("db connection established")
    })
}

export default db