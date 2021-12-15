const express= require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request= require('request');

const app = express();

// Moving all the local files like local images and  into a folder called public and using express,static so that our server identifies the local files and would be able to render them properly.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
res.sendFile(__dirname + '/signupForm.html');

})

app.post('/', function(req, res) {

    const firstName= req.body.Fname;
    const lastName= req.body.Lname;
    const Email= req.body.Email;

    // Initiling what all users data will be posted to the mailchimp's database
 const data={
    members: [
      {
        email_address: Email,
        status:  "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
    };


res.send("recieved!")
// converting the data that will be posted into a JSON format from Java Script object.
const jsonData= JSON.stringify(data);

// in X write your api's last four digits after -
// in place of Y write your audience id
const url= "https://X.api.mailchimp.com/3.0/lists/Y" 

// Authentication for options parameter
const options={
    method:"POST",
    auth:"X" // over here write your api key
  }


  // Defining where will be the request for data be posted for a further response. ("address of the mailChimps server")
// Storing the request into a constant called request so that afterwards we can use it to to send our jsonData. *See at the bottom*
const request=https.request(url, options, function(response) {
response.on('data', function(data){
    JSON.parse(data)
})

})

// Redirecting the user to the home route from the failure page. so that the user can try again later.
app.post("/failure", function(req,res) {
    res.redirect("/")
    
    })
    
    // Redirecting the user to the success and failure page after the user submits his data on the Signup page.
    var statusCode=response.statusCode
    
    if (response.statusCode==200 ) {
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname + "/failure.html")
    }



// Sending the data to the Mailchimp's Database and servers.
request.write(jsonData)
request.end();

})

app.listen('3000', function() {
    console.log('listening on http://localhost:3000')
})
