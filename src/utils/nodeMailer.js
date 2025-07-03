import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS, 
  },
});

// Optional: verify connection config works
transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer transporter error:");
  }
});
