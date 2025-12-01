const Contactmodel = require('../models/contect');

const contactDedails =  async (req, res) => {
    const { firstname, lastname, email, phone, details } = req.body;
    if (!firstname || !lastname || !email || !phone || !details) {
        res.json("request");
    }
    else {
        Contactmodel.create(req.body)
            .then(registers => res.json(registers))
            .catch(err => res.json(err))
    }
}

module.exports = {
    contactDedails
};