require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const contactroute =require('./Routes/Contact');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '..',)));

app.get('/', (req, res) => { 
  res.send('<h1>Welcome to the Home Page</h1>');
});

 
 console.log('contactRoute is', typeof contactroute);
 app.use('/contact',contactroute);

 app.listen(PORT, ()=> console.log(`server running on http://localhost:${PORT}`));
 app.use((req, res)=>{
   res.status(404).send('<h1>404 not found</h1>');
 });
 app.use((err, req, res, next)=> {
   console.error(err.stack);
   res.status(500).send('<h1>500 internal server error</h1>');
 });
 console.log('contactRoute:', contactroute);
 app.get((req, res) => {res.status(404).send('404 not found');});

 
 

 

 

