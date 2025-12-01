const mongoose = require('mongoose');

const contactdata = new mongoose.Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: Number, require: true },
    details: { type: String, require: true }
});


mongoose
    .connect('mongodb://localhost:27017/Finalregister', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const Contactmodel = mongoose.model('Contact', contactdata);

module.exports = Contactmodel; 