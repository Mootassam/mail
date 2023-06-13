const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(cors());

app.post('/sendemail', (req, res) => {

  console.log('====================================');
  console.log(req.body.data.message);
  console.log('====================================');
  // const {  nationality, email, message } = req.body.data;
  console.log('====================================');
  
  console.log('====================================');
  const transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net',
    port: 465,
    secure: true,
    auth: {
      user: 'info@cerra-plomberie.fr',
      pass: 'cerra2022',
    },
  });

  const mailOptions = {
    from: req.body.data.email,
    to: 'mootassame@gmail.com',
    subject: req.body.data.fullname,
    text: req.body.data.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


