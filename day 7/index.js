const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("jai shree ram");
  });
  
  app.get("/home", (req, res) => {
    res.send(req.query); 
    
  });
  
  app.post("/", (req, res) => {
    res.send("Hello POST");
  });
  
  app.put("/", (req, res) => {
    res.send("Hello1 PUT");
  });







  app.listen(5000);