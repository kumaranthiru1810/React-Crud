// const Userdatamodel = require('../backend/models/user');
// const Contactmodel = require('../backend/models/contect');
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());


// app.post('/register', async (req, res) => {
//     const { email, password } = req.body;
//     Userdatamodel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 res.json('Already register');
//             }
//             else {
//                 Userdatamodel.create(req.body)
//                     .then(registers => res.json(registers))
//                     .catch(err => res.json(err))
//             }
//         })
// })
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await Userdatamodel.findOne({ email });

//         if (!user) {
//             return res.json("error");  // user not found
//         }
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {
//             const toki = jwt.sign({email:user.email},process.env.SECURITY)
//             console.log(toki);
            
//             return res.json({message:"success",token:toki});
//         } else {
//             return res.json("wrong password");
//         }

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json("server error");
//     }
// });

// app.get('/', async (req, res) => {
//     try {
//         const users = await Userdatamodel.find();
//         res.json(users);
//     }
//     catch (err) {
//         res.json(err);
//     }

// })

// app.get('/users/:id', async (req , res) =>{
//     try{
//         const id = req.params.id;
//         const edituser = await Userdatamodel.findById(id);
//         console.log("userdata:", edituser);
        
//         res.json(edituser);
//     }
//     catch(err){
//         res.json(err);
//     }
// })

// app.put('/edituser/:id', async (req, res) => {
//     const id = req.params.id;
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.json("Fill the fields");
//     }

//     try {
//         await Userdatamodel.findByIdAndUpdate(id, {
//             name: name,
//             email: email,
//             password: password
//         });

//         return res.json("success");
//     } catch (err) {
//         console.log(err);
//         return res.json("error");
//     }
// });


// app.post('/contact', async (req, res) => {
//     const { firstname, lastname, email, phone, details } = req.body;
//     if (!firstname || !lastname || !email || !phone || !details) {
//         res.json("request");
//     }
//     else {
//         Contactmodel.create(req.body)
//             .then(registers => res.json(registers))
//             .catch(err => res.json(err))
//     }
// })

// app.delete('/deleteuser/:id' , async (req,res)=>{
//     try{
//         const id = req.params.id;
//         Userdatamodel.findByIdAndDelete(id)
//         .then((user) =>{
//             return res.json('success');
//         })
//         .catch((err) =>{return res.json('error')})
//     }
//     catch(err){
//         console.log(err);
//     }
// })

// app.listen(process.env.PORT || 3500, () => {
//     console.log(`Server ${process.env.DEVELOPMENT} running in ${process.env.PORT} port`);
// })



const express = require('express');
// const expressvalidate = require('express-validator');
// const path = require('path');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/user', require('./routes/userRoute'));
app.use('/api/contact', require('./routes/contactRoute'));
app.use('/api/products', require('./routes/productsRoute'));


app.listen(process.env.PORT || 3500, () => {
    console.log(`Server ${process.env.DEVELOPMENT} running in ${process.env.PORT} port`);
})