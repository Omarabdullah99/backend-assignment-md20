const jwt = require("jsonwebtoken");

exports.EncodeToken = (email, user_id) => {
  let KEY = "1234omar";
  let EXPIRE = { expiresIn: "24h" };
  let PAYLOAD = {
    email: email,
    user_id: user_id,
  };
  return jwt.sign(PAYLOAD,KEY,EXPIRE)
};

exports.DecodeToken=(token)=>{
    try {
        let KEY = "1234omar";
        return jwt.verify(token, KEY)
    } catch (error) {
        return null
        
    }
}