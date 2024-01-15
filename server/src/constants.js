import dotenv from "dotenv"

dotenv.config()
export const auth = {
    type: "OAuth2",
    user: "efonovia18@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  };
  
export const mailoptions = {
    from: "NILE UNIVERSITY <efonovia18@gmail.com>",
    subject: "Internship Application for our Student",
  };
  