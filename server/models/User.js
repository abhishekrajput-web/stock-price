import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    password:{
        type:String,
        reqired:true
    },

    confirmPassword:{
        type:String,
        required:true
    },

    dateOfBirth:{
        type:Date,
        required:true
    },

    // gender:{
    //     type:String,
    //     required:true,
    // },

    email:{
        type:String,
        required:true,
    },

    phone:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    image:{
     type:String,
     required:true
    },

    role:{
        type:Number,
        default:0
    },

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending', // Default status is pending
      },


}, {timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;