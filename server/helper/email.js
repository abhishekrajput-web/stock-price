import nodemailer from 'nodemailer';

// Function to send email notification
const sendStatusUpdateEmail = (studentEmail, status) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: studentEmail,
    subject: 'Status Update Notification',
    text: `Dear Student,\n\nYour request has been ${status} by the admin.\n\nThank you!`,
  };
  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


export default sendStatusUpdateEmail;
