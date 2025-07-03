import { transporter } from "./nodeMailer";

export const sendWelcomeEmail = async ({ recipientMail, name }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientMail,
    subject: "Welcome to CareLink Family!",
    html: `<h1>Hi ${name}!</h1>
       <p>Thanks for registering with <strong>CareLink</strong>!</p> 
       <p>Please keep patience until we check and approve your profile.</p>
       <p>
         Best regards,<br />
         The <strong>CareLink</strong> Team
       </p>`,
  };

  return transporter.sendMail(mailOptions);
};
