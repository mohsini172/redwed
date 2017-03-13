var express = require('express');
var session = require('express-session');
var router = express.Router();

router.post("/login", function (req, res) {
    if (req.body.username || req.body.password) {
        if (req.body.username == "admin" && req.body.password == "admin") {
            req.session.username = req.body.username;
            res.sendStatus(200);
        }
        else
            res.sendStatus(400);
    }
    else
        res.sendStatus(400);
});
router.post("/logout", function (req, res) {
    req.session.destroy();
    res.sendStatus(200);
});
module.exports = router;