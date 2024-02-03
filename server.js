// const objectToConvert = {
//      name: "keshav",
//      age: 29
// };
// const json = JSON.stringify(objectToConvert); // Convert object to JSON string
// console.log(json);

// console.log(typeof json);

const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body  
const PORTURL = process.env.PORT || 3000;



// ...Middleware Function....
const longRequest = (req, res, next) =>{
     console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
     next(); //...Move to the next phase...
}

app.use(longRequest);



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/',function (req, res) {
   res.send('Welcome to my hotel.')
})

//Import the router files..
const personRoutes = require('./routes/personRoutes');
const menuitemRoutes = require('./routes/menuitemRoutes');

//Use the routers 
app.use('/person', personRoutes);
app.use('/menu', menuitemRoutes);

//listen  at 3000 port
app.listen(PORTURL , () => {
   console.log(`listening at ${PORTURL }`);
})




