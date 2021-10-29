const express = require('express')
const app = express()
const port = 5000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(require('./routes/routes'))

app.listen(port, () => console.log(`Server started on port ${port}`))
