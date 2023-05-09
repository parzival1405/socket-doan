const nodemailer = require('nodemailer')
const {google} = require('googleapis')
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIERCT_URI = process.env.REDIERCT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIERCT_URI)

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

class sendEmailApi{

    async sendMail(mailOption){
        try {
            const accessToken = oAuth2Client.getAccessToken();
    
            const transport = nodemailer.createTransport({ 
                service:'gmail',
                auth:{
                    type:'OAuth2',
                    user:'buithang137172@gmail.com',
                    clientId : CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken : accessToken,
                }
            })
    
            const result = await transport.sendMail(mailOption)
            console.log(result)
            return result;
        } catch (error) {
            console.log(error)
            return error
        }
    }

}

module.exports = new sendEmailApi();
