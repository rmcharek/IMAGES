// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Create a new express application named 'app'
const app = express();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//const cors = require('cors');
//const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/////////////////////////////////////
app.use(express.static('datastore'));
//app.use(express.static(path.join(__dirname, 'datastore')));
//app.use(express.static(path.join(__dirname, 'datastore', 'LOGO.png')));


app.use('/card', (req, res, next) => {
console.log("11111111111111111111111111111");
  debugger;
  if (req.method === 'POST') {
     console.log("11111111111111111111111111111");
     console.log(req.files);
     console.log("22222222222222222222222222222");
     let file = req.files.image ;
     const imagedata=req.files;
     console.log(imagedata);
     console.log(imagedata.myFile.name);

     file = imagedata.myFile ;
     const name = imagedata.myFile.name.replace(' ', '_');
     //const image = `${name}.jpg`;
    const image = `${name}`;
     //file.mv(`${__dirname}/../public/${image}`);
     //file.mv(`${__dirname}/../imagestore/${image}`);
     console.log("__dirname:  "+__dirname);
     file.mv(`${__dirname}/datastore/${image}`);
     req.body.image = image;
   

  }
  next();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////




// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());
// Require Route
const api = require('./routes/routes');
// Configure app to use route
app.use('/api/v1/', api);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));