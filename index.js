const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import Routes
 const authRoute = require('./routes/auth.routes');
// const personelRoute = require('./routes/personel.routes');

dotenv.config();


//Connect to DB
mongoose.connect(
// process.env.DB_CONNECT,
'mongodb://127.0.0.1:27017',
{useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false},
() => console.log('connected to db!')
);

//Middleware
app.use(express.json());
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//Route Middlewares
// app.use('/api/user', authRoute);
// app.use(personelRoute);

app.listen(3000,() => console.log('Server Up and running'));

app.use('/api/user',authRoute);

//  require('./routes/auth.routes')(app);
// require('./routes/personel.routes')(app);