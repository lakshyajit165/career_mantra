const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//HandleBars Middleware
app.engine('handlebars', 
	exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//index route
app.get('/', (req,res)=>{
	res.render('index');
});

//About Route
app.get('/about', (req,res) =>{
	res.render('about');
});

//Founder Route
app.get('/founder', (req,res) =>{
	res.render('founder');
});

//Partners Route
app.get('/partners', (req,res) =>{
	res.render('partners');
});

//Faculties
app.get('/faculties', (req,res) => {
	res.render('faculties');
});

//Careers_Fulltime
app.get('/careers_fulltime', (req,res) =>{
	res.render('careers_fulltime');
});

//Internship_technical
app.get('/technical', (req,res) =>{
	res.render('technical');
});

//Internship_non_tech
app.get('/non_technical', (req,res) =>{
	res.render('non_technical');
});

//Courses -- IRP
app.get('/industry_ready_programme', (req,res) => {
	res.render('industry_ready_programme');
});

//Courses -- CMPT
app.get('/cmpt', (req,res) => {
	res.render('cmpt');
});

//Gallery
app.get('/gallery', (req,res) => {
	res.render('gallery');
});

//Contact
app.get('/contact' ,(req,res) => {
	res.render('contact');
});

//SPEED
app.get('/speed', (req,res) => {
	res.render('speed');
});
app.post('/send', (req,res) => {
	
  

            const output = `

        		<p>You have a new contact request!</p>
        		<h3>Contact Details</h3>
        		<ul>
        			<li>Email: ${req.body.email}</li>
        			<li>Name : ${req.body.name}</li>
        			<li>Phone: ${req.body.phone}</li>
        		</ul>
        		<h3>Message</h3>
        		<p>${req.body.message}</p>
        	`;

        	// create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com', //'smtp.ethereal.email',
                port: 587,//587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'lakshmeekant@gmail.com', // generated ethereal user
                    pass: 'lcxlzbdxwsvdcwno'//account.pass ''// generated ethereal password
                },
                tls:{
                	rejectUnauthorized: false
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '<careermantra.net.in>', // sender address
                to: 'info@careermantra.net.in', // list of receivers
                subject: 'New Message', // Subject line
                text: 'Hello world?', // plain text body
                html: output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                	res.render('contact',{msg:'Message not sent...Please try again!',val:'alert alert-danger'});
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                res.render('contact',{msg:'Message sent..Will get back to you soon!',val:'alert alert-success'});

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
           
});

app.listen(process.env.PORT || 3000, () => console.log('Server Started...'));