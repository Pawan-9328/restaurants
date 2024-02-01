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
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body  

app.get('/', function (req, res) {
   res.send('Welcome to my hotel..How i can hey you ?. ')
})



//Import the router files..
const personRoutes = require('./routes/personRoutes');
const menuitemRoutes = require('./routes/menuitemRoutes');
//Use the routers 
app.use('/person', personRoutes);
app.use('/menu',menuitemRoutes)


app.listen(3000, () => {
   console.log('Listening on port 3000');
})

