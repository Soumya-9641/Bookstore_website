
import forgot from "../models/forgot"
import user from "../models/user"
export default function handler(req, res) {
    // check if the user exists in the database
    if(req.body.sendMail){

   let token = "jnjnhfdbjuhdsfhdbhsfhusdbhjbhsjbhujjhbds"
let Forgot = new forgot({
        email : req.body .email,
        token : token
    })
    let email = ` We have sent you this email in response to your request to reset your password on Bookstore.com.
     After you reset your password 

    To reset your password for <a href="${site-url}">${site-url}</a>, please follow the link below:

    <a href="https://Bookstore.com/forgot?token=${token}">Click Here</a>

    <br/><br/>
 
    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and clicking on the "Change Email Address or Password" link.

    <br/><br/>`
    res.status(200).json({ success:true  })
  
  }
  else{
    //reset user
  }
}
  