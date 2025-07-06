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
export const sendApprovalMail = async ({ recipientMail, name }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientMail,
    subject: "Welcome to CareLink Family!",
    html: `
  <h1>Hi ${name}!</h1>
  <p>
    <strong>Congratulations</strong>!
  </p>
  <p>
    Your application has been approved by the CareLink team. Now, you can log in with your email and password.
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
