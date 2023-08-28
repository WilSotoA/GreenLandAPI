const nodemailer = require('nodemailer')
require('dotenv').config()

const transporterGmail = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'greenlandgrupo7@gmail.com',
    pass: 'krgeajvtedmwqexq'
  }
})

module.exports = transporterGmail
