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