const ContactUs = require("../model/contactUsModel")
const nodemailer = require('nodemailer')
require('dotenv').config()

const contactUsController = {
    createContactus: async (req,res) => {
        try {
            let contactUs = await ContactUs.create(req.body);
            res.json({ msg: "User data registered successfully", user: contactUs });
        } catch (err) {
            return res.status(500).json({ msg: "Email Id/ Mobile Number Already Exist" });
        }
    },
    sendContactusMail: async (req,res) => {
        let smtpTransport = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
              auth: {
                      user: process.env.MAIL_ID,
                      pass: process.env.MAIL_PASSWORD
              },
              tls:{rejectUnauthorized:false}
          })
          smtpTransport.sendMail({
            from: process.env.MAIL_ID,
            to: 'inquiries.skyersgroup@gmail.com',
            subject: "Contact Message from user",
            html: `
                <div style="margin: 20px;">
                  <h3>User Contact Message Details</h3>
                  <p>Name : ${req.body.userName}</p>
                  <p>Email : ${req.body.email}</p>
                  <p>Mobile : ${req.body.phone}</p>
                  <p>Message : ${req.body.message}</p>
                </div>
            `
          },function(error,info){
            if(error){
               console.log(error);
            }  
            res.send("Mail has been sended to your email, Check your mail.")
          })
    },
    sendContactusMailuser: async (req,res) => {
      let smtpTransport = nodemailer.createTransport({
          service: process.env.MAIL_SERVICE,
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          secure: true,
            auth: {
                    user: process.env.MAIL_ID,
                    pass: process.env.MAIL_PASSWORD
            },
            tls:{rejectUnauthorized:false}
        })
        smtpTransport.sendMail({
          from: process.env.MAIL_ID,
          to: req.body.email,
          subject: "Thank you for connecting with skyersindia.com",
          html: `
              <div style="margin: 20px;">
                <h3>Thank you for connecting with skyersindia.com,</h3>
                <p> We will reach back to you shortly.</p>  
              </div>
          `
        },function(error,info){
          if(error){
             console.log(error);
          }  
          res.send("Mail has been sended to your email, Check your mail.")
        })
  }
}

module.exports = contactUsController