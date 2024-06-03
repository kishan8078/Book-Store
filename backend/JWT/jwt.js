const {sign , verify} = require( 'jsonwebtoken' );

const createTokens = (user) => {
    const accessToken = sign({username : user.username , id : user._id} ,"jwtSecretKey");
    return accessToken;
}

const validateToken = (req , res , next) => {
    // const accessToken = req.cookies["accessToken"];
    // console.log("ac tok : " , accessToken)
    
    //console.log("ac_landing_page : " , req.cookies["_landing_page"])
    // const accessToken = sessionStorage.getItem('accessToken');
    // console.log("req.cookies : " , req.cookies)
    // console.log("req : " , req)
    console.log("access token [Two] : " , req.cookies["accessToken"])
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        //console.log("access TOKen  : " , accessToken)
        return res.json({message : "User Not Authenticated"})
    }

    try{
        const validToken = verify(accessToken , "jwtSecretKey")
        if(validToken){
            req.authenticated = true ;
            req.userId = validToken.id;
            //console.log("validToken.id : " , validToken.id);
            console.log("validate-token : user is valid : " , validToken.id)
            console.log("validate-token : user name is : " , validToken.username)
            return next();
        }
    }
    catch(err){
        console.log("user validation went wrong")
        return res.json({message : "Token validation went wrong"})
    }
}

module.exports = {createTokens , validateToken}