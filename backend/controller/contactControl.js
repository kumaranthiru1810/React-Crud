const Contactmodel = require('../models/contect');
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thirukumaran18102006@gmail.com',
        pass: 'sqdi hluc nhsg sben'
    }
});
const contactDedails = async (req, res) => {
    const { firstname, lastname, email, phone, details } = req.body;
    if (!firstname || !lastname || !email || !phone || !details) {
        res.json("request");
    }
    else {
        let mailOptions = {
            from: 'thirukumaran18102006@gmail.com',
            to: 'thirukumaran18102006@gmail.com',
            // subject: 'Sending Email using Node.js',
            // text: 'That was easy!'
            html: `<!DOCTYPE html>
<html>
<head>
    <style>
        .email-content {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .info-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            border-left: 4px solid #4a6ee0;
            transition: transform 0.3s ease;
        }
        
        .info-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .label {
            color: #555;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        
        .value {
            color: #222;
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }
        
        .header {
            text-align: center;
            color: #333;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #4a6ee0;
        }
        
        .header h2 {
            color: #2c3e50;
            margin: 0 0 5px 0;
        }
        
        .header p {
            color: #666;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="email-content">
        <div class="header">
            <h2>Contact Information</h2>
            <p>User details submitted successfully</p>
        </div>
        
        <div class="info-card">
            <div class="label">First Name</div>
            <div class="value">${firstname}</div>
        </div>
        
        <div class="info-card">
            <div class="label">Last Name</div>
            <div class="value">${lastname}</div>
        </div>
        
        <div class="info-card">
            <div class="label">Email Address</div>
            <div class="value">${email}</div>
        </div>
        
        <div class="info-card">
            <div class="label">Phone Number</div>
            <div class="value">${phone}</div>
        </div>
        
        <div class="info-card">
            <div class="label">Additional Details</div>
            <div class="value">${details}</div>
        </div>
    </div>
</body>
</html>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        Contactmodel.create(req.body)
            .then(registers => res.json(registers))
            .catch(err => res.json(err))
    }
}

module.exports = {
    contactDedails
};