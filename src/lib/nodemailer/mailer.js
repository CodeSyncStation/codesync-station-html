const nodemailer = require("nodemailer");

// Nodemailer er transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Function to send email
const sendEmail = async (name, email, message) => {
  try {
    const mailOptions = {
      from: email, // User's mail
      to: process.env.MAIL_RECEIVER, // receiver's email address
      subject: `New Message from ${name}`, // Subject
      text: message, // Message content
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email." };
  }
};

module.exports = sendEmail;
