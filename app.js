const express = require('express');
require ('dotenv').config();
const app = express();
const router = require("./src/route");
const port = process.env.PORT;
  
const bodyParser = require('body-parser')    
app.use(express.json()); 
app.use(router); 
app.use(bodyParser.json()) 
      
app.listen(port, ()=>{     
    console.log(`Server running on port ${port}`);
})                             