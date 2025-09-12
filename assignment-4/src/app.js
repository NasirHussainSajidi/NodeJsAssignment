const express = require('express')
const {MongoClient, ObjectId} = require('mongodb')
const adminAuth = require('./middleweare.js')
const app = express()
const uri = "mongodb+srv://NasirHussain:Id7EhtU3SMOzkyRD@cluster0.wiayn1k.mongodb.net/"

const client = new MongoClient(uri)
client.connect()

const dbName = "smitB15"

const db = client.db(dbName)
const collection = db.collection('staff')

async function main() {
    await client.connect()
    console.log('connect successfully to Database ! ');
    const db = client.db(dbName)
    const collection = db.collection('staff')
    const data = {
        name: "Nasir Hussain",
        age: 24,
        email: "sajidi@gmail.com"
    }
    const insertResult =  collection.insertMany([{ 
        a: 1,
        name: "nasir hussain",
        age: 21

     }
])};
main()



app.use('/userGetData', (req,res,adminAuth)=>{

  async  function getData(){
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
}
getData()
res.send('Found documents =>', findResult)
})
app.use('/userDeleteData', (req,res, adminAuth)=>{
    async function delData(){
        const deleteResult = await collection.deleteMany({ a: 3 });
        console.log('Deleted documents =>', deleteResult);
    }
    delData()
    res.send('Deleted documents =>', deleteResult)
})
app.use('/userPostData', (req,res, adminAuth)=>{
    async function updateDate() {
        const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
        console.log('Updated documents =>', updateResult);
        
    }
    updateDate()
    res.send('Updated documents =>', updateResult)
})
app.use('/userPutData', (req,res, adminAuth)=>{
  async  function insert(){
    const insertResult =await collection.insertMany([{
         id: 1,
        Name: "Abis Hussain",
    age: 26
 },
     { id: 2,
        name: "Assim Hussain",
        age: 24

     }, 
     { 
        id: 3,
        name: "Nasir Hussain",
        age: 21 },
        {
            id:4,
            name: "Kashif Hussain",
            age: 19
        }
]);
    console.log('Inserted documents =>', insertResult);
}
insert()
res.send('Inserted documents =>', insertResult)
})

// async function main() {
//     await client.connect()
//     console.log('connect successfully to Database ! ');
//     const db = client.db(dbName)
//     const collection = db.collection('staff')
//     const data = {
//         name: "Nasir Hussain",
//         age: 24,
//         email: "sajidi@gmail.com"
//     }
//     const insertResult = await collection.insertMany([{ 
//         a: 1,
//         name: "nasir hussain",
//         age: 21

//      }
// ]);
// const password = 123
// const isAthenticate = password === 123
// app.use("/user", (req, res, next)=>{
//     if(!isAthenticate){
//         next()

//     }else{
//         res.status(401).send('Unauthorized User')
//     }
// })
// console.log('Inserted documents =>', insertResult);
//     // const findResult = await collection.find({_id: new ObjectId()})


//     const findResult = await collection.find({_id: new ObjectId('68b4947c62351338552cb2c0')}).toArray();
// console.log('Found documents =>', findResult);
//     return "done"
// }
// main()
// .then(console.log)
// .catch(console.error)
// .finally(()=>client.close());
// app.use('/', (req, res)=>{
//     res.send("Hello This is my first server")
// })


app.listen(2000, ()=>{
    console.log("server is running on port 2000")
})