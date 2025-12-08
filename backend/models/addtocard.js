const mongoose = require('mongoose');

const addtocarddetails = new mongoose.Schema({
    productid : {type:Number , require:true}
})
mongoose
    .connect('mongodb://localhost:27017/Finalregister', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const addtocardmodules = mongoose.model('addtocard' , addtocarddetails);

module.exports=addtocardmodules;