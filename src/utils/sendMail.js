import { transporter } from "./nodeMailer";

export const sendWelcomeEmail = async ({ recipientMail, name }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientMail,
    subject: "Welcome to CareLink Family!",
    html: `
  <h1>Hi ${name}!</h1>
  <p>
    Thank you for registering with <strong>CareLink</strong>!
  </p>
  <p>
    Please be patient while we review and approve your profile.
  </p>
  <br/>
  <p>
    Best regards,<br/>
    The <strong>CareLink</strong> Team
  </p>
`,
  };

  return transporter.sendMail(mailOptions);
};
