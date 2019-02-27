const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

//App config
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}


//Mongoose config
const dbURI = 'mongodb+srv://muramasa-auth:WLCscGkOAJyycaLh@sgfyawningportal-dswaq.gcp.mongodb.net/test?retryWrites=true';
const options = {
  useNewUrlParser: true
}
mongoose.connect(dbURI, options)
  .then(() => {
      console.log("Database connection established!");
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
);
mongoose.set('debug', true);

//Models & Routes:
require('./src/models/Users');
require('./src/config/passport');
app.use(require('./src/routes'));

//Error handlers & middlewares config
if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));