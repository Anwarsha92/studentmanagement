require("dotenv").config();

const express = require("express");

const cors = require("cors");

require("./db/collection"); //bcos index.js is runnng so import this [ not collection its connection, mistaken ]

const router=require('./Routes/router')

const server = express();

const PORT = 4000 || process.env.PORT; //get port dynamically when deploy

server.use(cors());

server.use(express.json());

server.use(router)

//export folder to client
server.use('/uploads',express.static('./uploads'))

server.listen(PORT, () => {
  console.log(`ems server run at port ${PORT}`);
});


//to check its working in browser
server.get("/", (req, res) => {
  res.send("ems server started");
});
