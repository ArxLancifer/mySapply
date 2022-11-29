const express = require('express');
const app = express();
const connectMongo = require('./config/dbConnect');
const passport = require('passport');
const userRoute = require('./routes/userRoute');
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');

require('dotenv').config({path: './config/.env'});
app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connectMongo();
require('./config/passport')(passport);
// passport.use(new LocalStrategy (proceedLogin))

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        // store: new MongoStore({mongooseConnection: mongoose.connection}),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session());


app.use(userRoute)

app.get('/', function (req, res) {
    res.send('<h1 style="color:blue">Gia pame ligo</h2>')
})

app.listen(process.env.PORT, function () {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})
