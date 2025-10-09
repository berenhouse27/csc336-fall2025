import express from "express";

const app = express(); // created/instantiated instance of a server

const PORT = 3000;  // Port for server to listen to

let count = 0

app.listen(PORT, (req, res) => {
    console.log("Server Started")
});

app.get("/test", (req, res) => {            
    console.log("Request made with 'test' endpoint");    // Visiting localhost:3000/test results in log
    count += 1
    res.send(`This is the server speaking ` + count);
    
})