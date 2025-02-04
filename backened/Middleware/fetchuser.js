const jwt=require('jsonwebtoken')
const user_auth = "vivekyouaregreat";
const fetchuser=(req,res,next)=>{
    //get the user from jwt token and add id to req obj
    const token=req.header('auth-token')
    try {
        if(!token){
            res.status(401).send({error:"Please authenicate using valid token"})
        }
        const data=jwt.verify(token,user_auth)
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenicate using valid token"})
    }
   
}
module.exports=fetchuser;