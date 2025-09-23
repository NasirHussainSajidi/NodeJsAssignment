const express = require('express')
const {connectDB} = require('./config/database')
const {User} = require('./model/user')
const app = express()
app.use(express.json())

// app.use("/addData", async(req, res)=>{
//     const {firstName, lastName, password, email} = req.body
//     try {
//         const user =new User({
//             firstName,
//             lastName,
//             password,
//             email
//         })
//         console.log(firstName, lastName, email, password)
//         const result = await user.save({firstName, lastName, password, email})
//         console.log("result:", result)
//         res.send("result: ", result)
//     } catch (error) {
//         console.log("error include", error)
//         res.status(401).send("Error : ", error)
//     }
    
// })

// app.use("/deleteData", async(req, res)=>{
//     try {
//         const data = {
//             firstname:"nasir ",
//             lastName: "Hussain"

//         }
//         await User.save(data)
//         res.send({
//             message: 'User added successfully !',
//             data: User
//         })
//     } catch (error) {
//         res.status(401).send("Error : ", error)
//     }
    
// })


app.use('/changeData', async(req, res)=>{
    if(req.method === 'POST'){
         const {firstName, lastName, password, email} = req.body
    try {
        const user =new User({
            firstName,
            lastName,
            password,
            email
        })
        console.log(firstName, lastName, email, password)
        const result = await user.save({firstName, lastName, password, email})
        console.log("result:", result)
        res.send("result: ", result)
    } catch (error) {
        console.log("error include", error)
        res.status(401).send("Error : ", error)
    }

    }else if(req.method === 'GET'){
        try {
            const data = await User.find({})
            console.log("Data find : ", data)
            res.send({
                message: "data get successfully",
                data: data
            })
        } catch (error) {
            res.status(401).send({
                message: "data not find",
                error: error.message
                
            })
        }

    }else if(req.method === 'PUT'){
const data = req.body
    const { id } = req.params
    try {
        const user = await User.findByIdAndUpdate(id, data)
        res.send({
            message: 'User updated successfully !',
            data: user
        })
    } catch (error) {
        res.status(400).send({
            message: 'Error updating user',
            error: error.message
        })
    }
        
    }else if(req.method === 'DELETE'){
        try {
        const id = req.params
        const delItem = await User.deleteOne(id)
    
        console.log("data delete hogaya ha", delItem)
        res.send({
            message: "data delete "
        })
        } catch (error) {
            res.status(401).send({
                message: "data is not delete",
                error: error.message
            })
        }
       
        
    }
})


app.post('/signup',async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        

        // Step 1
        if (!firstName || !lastName) {
            console.log("firstName: Nasir hussain")
            throw new Error('Name is not valid !')

        } 
        // else if (!validator.isEmail(email)) {
        //     throw new Error('Email is not Valid !')
        // } else if (!validator.isStrongPassword(password)) {
        //     throw new Error("Please use a strong password")
        // }

        // Step 2

       
    //    const hashedPassword = await bcrypt.hash(password, 10)

       const user = await User({
        firstName,
        lastName,
        email,
        password
        // password: hashedPassword
       })
    // const user = {
    //     firstName: "Nasir",
    //     lastName: "Hussain",
    //     password: 23456,
    //     email: nasir
    // }

       await user.save()

    //    res.cookie("token", "1234567890asdfghjkl")

       res.send({
        message: "User signup successfully!",
        data: user
       })


    } catch (error) {
        res.status(400).send({
            message: 'Signup error !',
            error: error.message
        })
    }
})

// app.post('/login', async (req,res)=>{
//     try {
//         const {email, password} = req.body

//         const user = await User.findOne({
//             email
//         })
       
//         if(!user){
//             throw new Error("Invalid Credentials !")
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password )

//         if(isValidPassword){
//         const token = await jwt.sign({id: user._id}, 'Ali@4321', {expiresIn: '1d'})

//         console.log("TOKEN--->", token);
        

//         res.cookie("token", token)

//         res.send("Login Successful !")
//         }else{
//             throw new Error('Invalid Credentials!')
//         }


//     } catch (error) {
//            res.status(400).send({
//             message: 'Login error !',
//             error: error.message
//         })
//     }
// })

// app.post('/logout', (req, res)=>{
//       res.cookie("token", null, {
//             expires:  new Date(Date.now()  * 0), 
//         }) 

//     res.send("Logout Successfully !")
// })
// app.get('/profile', userAuth, async (req, res)=>{
//     try {
//         // const {token} = req.cookies
      
//         // const {id} = await jwt.verify(token, "Ali@4321")


//         // const user = await User.findOne({_id: id})

//         const user = req.user

//         res.send(user)

//     } catch (error) {
//            res.status(400).send({
//             message: 'Profile error !',
//             error: error.message
//         })
//     }
// })


// app.post('/addProduct', userAuth,  async (req, res)=>{
//     try {
//         const {firstName} = req.user
//         console.log("User from Add Product API-->", firstName);
        
//         res.send(`Product added by ${firstName}`)
//     } catch (error) {
//           res.status(400).send({
//             message: 'Add Product error !',
//             error: error.message
//         })
//     }
// })




connectDB().then(()=>{
    
    console.log("data base connect")
    app.listen(3000, ()=>{
    console.log("this is running on port 3000")
})
}).catch((error)=>{
    console.log("Error : ", error)

})

