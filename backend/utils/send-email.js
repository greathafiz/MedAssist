import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
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
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        reject(err);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
};

const sendAdherenceReport = async (pdfPath, to, subject, text) => {
  const mailOptions = {
    from: {
      name: "MedAssist",
      address: process.env.EMAIL,
    },
    to,
    subject,
    text,
    attachments: [
      {
        filename: "adherencereport.pdf",
        path: pdfPath,
      },
    ],
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        reject(err);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
};

export { sendReminderEmail, sendAdherenceReport };
