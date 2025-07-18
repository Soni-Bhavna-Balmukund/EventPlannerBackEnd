const nodemailer = require('nodemailer')
const {email,password} = require('./config')


const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:email,
        pass:password
    }
})

const Sendmail1 = async(to,subject,text,html) =>{
    const mailbox ={
        from:email,
        to:to,
        subject:subject,
        text:text,
        html:html
    }

    try{
        await transporter.sendMail(mailbox)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {Sendmail1}