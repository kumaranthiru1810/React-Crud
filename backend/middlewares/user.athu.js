const jwt = require('jsonwebtoken');
const Userdatamodel = require('../models/user');
// const  pool  = require('../config/db.config');


const protect = async (req, res, next) => {
  let token;

  if (
    req.headers['authorization'] 
  ) {
    // console.log(req.headers['authorization'] )
    try {
    
     token = req.headers['authorization'].split(' ')[1]; 
      // console.log("Token from query: ", token);
      

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log("Decode id" , decoded.id); 
      const id = req.params.id;
        // const edituser = await Userdatamodel.findById(id);

      // Get user from DB
      const [user] = await Userdatamodel.findById(id);

      if (!user[0]) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user[0];
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// const admin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: 'Not authorized as admin' });
//   }
// };

module.exports = { protect };
