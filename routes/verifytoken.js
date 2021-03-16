const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    
    const authtoken = req.body.token;
    // const {cookies} = req;
    // const {authtoken} = cookies;
    if(!authtoken) return res.status(401).send("Accessessses Denied");

    try{
        const verified = jwt.verify(authtoken, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    }catch(err){
        res.status(400).send("Invalid Token");
    }

}