import mongoose, { Mongoose } from "mongoose";

interface iuser{
    email?: string;
    password?: string;
    userName?:string;
    bio?: string;
    avatarUrl?: string;
    avatar?: string;
}

interface iUserData extends iuser, mongoose.Document{}


const authModel = new mongoose.Schema<iUserData>({
email:{
    type:String,
    unique:true,
    required:[true, "Please enter a valid email"]
},
password:{
    type:String,
},
userName:{
    type:String,
},
bio:{
    type:String,
},
avatar:{
    type:String,
},
avatarUrl:{
    type:String,
},
},
{timestamps:true}
)

export default mongoose.model<iUserData>("users", authModel)