import nodemailer from 'nodemailer';

const mailSender = async (email, title, message) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.MAIL_HOST,
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                // pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        });
        // Send emails to users
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: title,
            html: message
        });
        // console.log("Email info: ", info);
        return info;
    } catch (err) {
        console.log("Error occurred while sending email: ", err);
    }
}

export default mailSender;