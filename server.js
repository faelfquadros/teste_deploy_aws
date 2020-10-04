const express = require('express');
const bodyParser = require('body-parser');
const consign = require("consign");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
consign()
    .include("config")
    .then("controller")
    .then("routes")
    .into(app);
    
app.get('/', (req, res) => {
    res.send('Servidor Online!')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

return app;