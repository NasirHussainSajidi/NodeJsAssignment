// const { Types, Collection } = require("mongoose")

// const mongoose = require('mongoose')


// const {Schema }= mongoose

// const userSchema = new Schema({
//     firstName: {
//         Types: String,
       
    
//     },
//     lastName: {
//         Types: String,
       
    
//     },
//     password: {
//         Types: Number,

//     },
//     email: {
//         Types: String
//     }
// },
// {
//     Collection: "Users",
//     timestamps: true
// }
// )

// const User = mongoose.model("User", userSchema)
// module.exports = {
//     User
// }


const mongoose = require('mongoose');
const validator = require('validator')
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,   // ✅ correct
        require:true,
        min: 3,
        max: 20,
        trim: true

    },
    lastName: {
        type: String,   // ✅ correct
        min: 3,
        max: 20
    },
    password: {
        type: String,   // ✅ correct
        require: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter strong password")                
                
            }
        }
    },
    email: {
        type: String ,   // ✅ correct
        require:true,
        index: true,
        unique: true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter a valid email")
            }
        }
    },
    gender: {
        type: String,
        validate(value){
            if([!male || !femail || !other].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    }
},
{
    collection: "Users",  // ✅ small letters
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
