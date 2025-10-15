import express from 'express';
import fs from 'fs';

// Creating Server
const app = express();

// Create static server in folder "public"
app.use(express.static("public"));
app.use(express.json());

app.get('/api/randomNumber', (req, res) => {
    res.send(Math.round(Math.random()*10));
});

app.post("/api/add", (req, res) => {
    console.log(req.body)
    req.body.name += '!!';
    res.json(req.body);
});

// Listen at a "port"
app.listen(3000);
