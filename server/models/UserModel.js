import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    }
})

const UserSchema = mongoose.model("Users",UserModel);
export default UserSchema;