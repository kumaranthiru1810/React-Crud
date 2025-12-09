const Userdatamodel = require('../models/user');
// const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your@mail',
        pass: '#'
    }
});

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    Userdatamodel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json('Already register');
            }
            else {
                let mailOptions = {
                    from: '',
                    to: '',
                    subject: 'Sending Email using Node.js',
                    // text: 'That was easy!'
                    html: `<p>The Name is :</p><h1>${name}</h1>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                Userdatamodel.create(req.body)
                    .then(() => res.json('success'))
                    .catch(err => res.json(err))
            }
        })
}
const deleteuser =  async(req,res) =>{
    try{
        const id = req.params.id;
        Userdatamodel.findByIdAndDelete(id)
        .then((user) =>{
            return res.json('success');
        })
        .catch((err) =>{return res.json('error')})
    }
    catch(err){
        console.log(err);
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Userdatamodel.findOne({ email });

        if (!user) {
            return res.json("error");  // user not found
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const toki = jwt.sign({ email: user.email }, process.env.SECURITY);
            console.log(toki);

            return res.json({ message: "success", token: toki , data: user});
        } else {
            return res.json("wrong password");
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json("server error");
    }
};

const getoneusers = async(req,res) =>{
    // const {email} = req.params.email;
    console.log(req.body);
    
    try{
        const oneuser = await Userdatamodel.findOne({email});
        res.json(oneuser);
    }
    catch(err){
        res.json(err);
    }
}

const getusers = async (req, res) => {
    try {
        const users = await Userdatamodel.find();
        res.json(users);
    }
    catch (err) {
        res.json(err);
    }

};

const getparusers = async (req, res) => {
    try {
        const id = req.params.id;
        const edituser = await Userdatamodel.findById(id);
        console.log("userdata:", edituser);

        res.json(edituser);
    }
    catch (err) {
        res.json(err);
    }
};

const updateusers = async (req, res) => {
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

module.exports = {
    registerUser,
    loginUser,
    deleteuser,
    getusers,
    getparusers,
    updateusers
}
