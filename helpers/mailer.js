var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rimsyst7@gmail.com',
    pass: 'Rims@SystemAdmin1'
  }
});

class mailNotifications {
	static sendMail(data){
		var mailOptions = {
		  from: 	'rimsyst7@gmail.com',
		  to: 		data.mailto,
		  subject: 	data.mailsubject,
		  text: 	data.mailmessage,
		  html:     data.mailHTMLmessage
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});
  	}
}
 module.exports = mailNotifications;
