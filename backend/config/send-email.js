import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = async (to, subject, text) => {
  const mailOptions = {
    from: {
      name: "MedAssist",
      address: process.env.EMAIL,
    },
    to,
    subject,
    text,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendReminderEmail };
