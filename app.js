var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);



//other stuff
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    store: new MongoStore({"url":'mongodb://mohsini172:root@ds145669.mlab.com:45669/pains'}),
    secret: 'isItRaining', 
    resave: false,
    saveUninitialized: false,
    httpOnly: false
}));




//imports
var labour = require('./labour/labourRoutes');
var customer = require('./customer/customerRoutes');
var order = require('./order/orderRoutes');



//adding module routing links
// app.use("/labour", auth.authenticate, laboures);
app.use("/labour", labour);
app.use("/customer", customer);
app.use("/order", order);
// app.use(user);
app.use("/", express.static(__dirname + '/public'));
// app.use("/public", express.static(__dirname + '/public'));





app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});


