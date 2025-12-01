const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const await = require('await');
 require('dotenv').config();

const Userdata = new mongoose.Schema({
    name:{type:String ,required:true},
    email:{type:String,required:true},
    password:{type:String , required:true}
});

Userdata.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


mongoose
    .connect(`${process.env.MONOG_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
    
const Userdatamodel = mongoose.model('registers',Userdata);

module.exports = Userdatamodel;