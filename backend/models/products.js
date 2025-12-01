const mongoose = require('mongoose');
 require('dotenv').config();

const productsdata = new mongoose.Schema({
    id:{type:Number ,required:true},
    name:{type:String,required:true},
    description:{type:String , required:true},
    price:{type:String , required:true},
    category:{type:String , required:true},
    image:{type:String , required:true},
    stock:{type:Number , required:true}
});

mongoose
    .connect(`${process.env.MONOG_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
    
const productmodules = mongoose.model('products',productsdata);

module.exports = productmodules;
