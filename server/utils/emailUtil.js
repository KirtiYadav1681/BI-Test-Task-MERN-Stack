const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL || "developer.kirti16@gmail.com",
    pass: process.env.PASSWORD || "trtcjvxvfhcjdbij",
  },
});

const sendInvitationEmail = (email, groupId) => {
  const invitationLink = `http://localhost:3000/group/invitation/accept?email=${email}&groupId=${groupId}`;
  const mailOptions = {
    from: process.env.EMAIL || "developer.kirti16@gmail.com",
    to: email,
    subject: 'You are invited to join a group',
    text: `You have been invited to join a group. Please register first to join the group: ${invitationLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendInvitationEmail };
