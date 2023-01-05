const express = require('express');
const app = express();
const mongoose = require('mongoose')
const connectMongo = require('./config/dbConnect');
const passport = require('passport');
const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require('morgan')
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const { options } = require('./routes/userRoute');
const { checkAuthUser } = require('./middlewares/authMiddleware');
const proceedLogin = require('./config/passport').proceedLogin;
const UserCustomer = require("./models/UserCustomerModel");
require('dotenv').config({path: './config/.env'});
app.use(cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
}));

app.use(morgan("tiny", options))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connectMongo();
proceedLogin(passport);

// Sessions
// app.use(
//     session({
//         secret: 'keyboard cat',
//         resave: false,
//         saveUninitialized: false
//     })
// )
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session());


app.get("/collections", async (req, res)=>{ 
    const x = await mongoose.connection.db.listCollections().toArray()
    console.log("Ola ta collections =>" , x.map(name=>name.name)) })


// Add routes
app.use(require("./routes"));

app.get('/', checkAuthUser,  async function (req, res) {
    // console.log(req.user)
    const validUSer = await UserCustomer.findById(req.user.id);
    console.log(validUSer)
    res.json(req.user);
})

app.listen(process.env.PORT, function () {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})
