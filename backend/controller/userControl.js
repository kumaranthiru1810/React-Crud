const Userdatamodel = require('../models/user');
// const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser =  async (req, res) => {
    const { email, password } = req.body;
    Userdatamodel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json('Already register');
            }
            else {
                Userdatamodel.create(req.body)
                    .then(registers => res.json(registers))
                    .catch(err => res.json(err))
            }
        })
}
const loginUser =async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Userdatamodel.findOne({ email });

        if (!user) {
            return res.json("error");  // user not found
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const toki = jwt.sign({email:user.email},process.env.SECURITY)
            console.log(toki);
            
            return res.json({message:"success",token:toki});
        } else {
            return res.json("wrong password");
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json("server error");
    }
};

const getusers =  async (req, res) => {
    try {
        const users = await Userdatamodel.find();
        res.json(users);
    }
    catch (err) {
        res.json(err);
    }

};

const getparusers =  async (req , res) =>{
    try{
        const id = req.params.id;
        const edituser = await Userdatamodel.findById(id);
        console.log("userdata:", edituser);
        
        res.json(edituser);
    }
    catch(err){
        res.json(err);
    }
};

const updateusers =  async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json("Fill the fields");
    }

    try {
        await Userdatamodel.findByIdAndUpdate(id, {
            name: name,
            email: email,
            password: password
        });

        return res.json("success");
    } catch (err) {
        console.log(err);
        return res.json("error");
    }
};

module.exports={
    registerUser,
    loginUser,
    getusers,
    getparusers,
    updateusers
}