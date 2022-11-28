const express = require('express');
const app = express();
const connectMongo = require('./config/dbConnect');
const userRoute = require('./routes/userRoute');
const bodyParser = require("body-parser");
const cors = require('cors');

require('dotenv').config({path: './config/.env'});
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectMongo();


app.use(userRoute)

app.get('/', function(req, res){
    res.send('<h1 style="color:blue">Gia pame ligo</h2>')
})

app.listen(process.env.PORT, function(){
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})
