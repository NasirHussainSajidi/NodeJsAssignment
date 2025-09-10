const mongoos = require('mongoose');
const url = 'mongodb+srv://NasirHussain:NasiRH313@cluster0.wiayn1k.mongodb.net/'

async function connectDB(){
    try{
        await mongoos.connect(url);
        console.log("Database connected successfully");
    }catch(err){
        console.log("Error in DB connection", err);
    }}

    module.exports = {
        connectDB
    }