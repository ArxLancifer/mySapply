const express = require('express');
const app = express();
const connectMongo = require('./config/dbConnect')
const userRoute = require('./routes/userRoute')
require('dotenv').config({path: './config/.env'});

connectMongo()


app.use(userRoute)

app.get('/', function(req, res){
    res.send('<h1 style="color:blue">Gia pame ligo</h2>')
})

app.listen(process.env.PORT, function(){
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})