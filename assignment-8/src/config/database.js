const mongoose = require('mongoose')

const uri = 'mongodb+srv://NasirHussain:NasiRH313@cluster0.wiayn1k.mongodb.net/OHK'

async function connectDB(){
    await mongoose.connect(uri)
}

module.exports = {
    connectDB
}