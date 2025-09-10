const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const url = 'mongodb+srv://NasirHussain:NasiRH313@cluster0.wiayn1k.mongodb.net/'

const client = new MongoClient(url)

const dbName = "OHK";
app.use(express.json());

async function main(){
    try{
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('members')
        const data = {
            name: "Ali Muhammad",
            age: 24,
            city: "Karachi"
        }
        const {name, age, city} = data;
        if(name && age && city){
            // const result = await collection.insertOne({
            //     name,
            //     age, 
            //     city
            // })
            // console.log("data inserted: ", result)
        
        }
        // const getData = await collection.find({age:33}).toArray()

        // console.log(getData)


    }catch(error){
        console.log("error: ", error)
    }
}
app.use('/addData', async(req, res)=>{
    const db = client.db(dbName);
    const collection = db.collection('members')

    const result = await collection.insertOne({
        name: 'Nasir Hussain',
        age: 24,
        city: 'Karachi'
    })
    
    console.log("data inserted: ", result)
    res.send("data added successful !");

})
app.use('/delData', async(req, res)=>{
    const db = client.db(dbName);
    const collection = db.collection('members')

    const delData = await collection.deleteOne({name:
"Ali Muhammad"})
    console.log("deleta data ", delData)
    res.send("data delete successful !", delData);
})
app.use('/updateData', async(req, res) =>{
    const db = client.db(dbName);
    const collection = db.collection('members')
    const updateData = await collection.updateOne({ age: 24 }, { $set: { name:"ali hussain" } });
    console.log("update data ", updateData)
    res.send("data update sucesstul !");
})
app.use('/getData', async(req, res) =>{
    const db = client.db(dbName);
    const collection = db.collection('members')
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    res.send("data get successful !");
})
main().then(()=>{
    console.log('Connected to the database')
    app.listen(2000, ()=>{
        console.log("Server is running on port 2000 !");
    })
}).catch((error)=>{
    console.error('Error connecting to the database:', error)
})