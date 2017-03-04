var mongoose = require('mongoose');
var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};
mongoose.connect('mongodb://mohsini172:root@ds145669.mlab.com:45669/pains', options);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("mongodb connected");
// });

module.exports = mongoose;