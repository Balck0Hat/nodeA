var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Group = require('../models/group');


router.get('/', function (req, res, next) {
    return res.render('index.ejs');
});

const axios = require('axios');
var x = 1;
var p = 1;
var c = 1;
var d = 1;
router.post('/', function (req, res, next) {
    for (i = 0; i < 500; i++) {
        placeDetails();
        placeDetails2();
        distanceMatrix();
        autocomplete()
    }
});

let placeDetails = function(){
    axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJxYzqKMyhHBURE7ify6a42Hk&key=AIzaSyAqcbX6SEo5d_VonbG6VkyojRjo9VChnuM')
        .then(response => {
            console.log(response.data.status);
            if (response.data.status === "OK"){
                x++;
                console.log("======  x  == ", x);
            }
            // res.send({
            //     "success": true,
            //     "status": response.data.status,
            //     "x": x,
            // });
            placeDetails()
        })
        .catch(error => {
            console.log("error");
            // res.send({
            //     "success": false,
            //     "status": "" + error,
            // });
            placeDetails()
        });
};

let placeDetails2 = function(){
    axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJxYzqKMyhHBURE7ify6a42Hk&key=AIzaSyAb0VbRsuL4LmmiRVbJjNB9DYpX6TdfSwk')
        .then(response => {
            console.log(response.data.status);
            if (response.data.status === "OK"){
                p++;
                console.log("============   p  ==== ", p);
            }
            // res.send({
            //     "success": true,
            //     "status": response.data.status,
            //     "x": x,
            // });
            placeDetails2()
        })
        .catch(error => {
            console.log("error");
            // res.send({
            //     "success": false,
            //     "status": "" + error,
            // });
            placeDetails2()
        });
};


let autocomplete = function(){
    axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=1600+Amphitheatre&key=AIzaSyAb0VbRsuL4LmmiRVbJjNB9DYpX6TdfSwk')
        .then(response => {
            console.log(response.data.status);
            if (response.data.status === "OK"){
                c++;
                console.log("========================================= c == ", c);
            }
            // res.send({
            //     "success": true,
            //     "status": response.data.status,
            //     "x": x,
            // });
            autocomplete()
        })
        .catch(error => {
            console.log("error");
            // res.send({
            //     "success": false,
            //     "status": "" + error,
            // });
            autocomplete()
        });
};


let distanceMatrix = function(){
    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyAb0VbRsuL4LmmiRVbJjNB9DYpX6TdfSwk')
        .then(response => {
            console.log(response.data.status);
            if (response.data.status === "OK"){
                d++;
                console.log("=================================================      d ========     ", d);
            }
            // res.send({
            //     "success": true,
            //     "status": response.data.status,
            //     "x": x,
            // });
            distanceMatrix()
        })
        .catch(error => {
            console.log("error");
            // res.send({
            //     "success": false,
            //     "status": "" + error,
            // });
            distanceMatrix()
        });
};



router.post('/createGroup', function (req, res, next) {
    let groupInfo = req.body;
    if (!groupInfo.groupName) {
        res.send({
            "message": "groupName required!.",
            "success": false,
            "status": 201,
            "data": ""
        });
    } else {
        Group.findOne({groupName: groupInfo.groupName}, function (err, data) {
            if (!data) {
                let c;
                Group.findOne({}, function (err, data) {

                    if (data) {
                        console.log(c);
                        c = data.unique_id + 1;
                    } else {
                        c = 1;
                    }

                    let group = new Group({
                        groupId: "GroupId-" + shortid.generate("abcdefghijklmnopqrstuvwxyz"),
                        isVisible: true,
                        password: groupInfo.password,
                        unique_id: c,
                        groupImage: groupInfo.groupImage,
                        users: groupInfo.users,
                        groupName: groupInfo.groupName,
                        type: groupInfo.type,
                        country: "Jordan",
                    });

                    group.save(function (err, group) {
                        if (err) {
                            console.log(err);
                            res.send({
                                "message": err.toString(),
                                "success": false,
                                "status": 201,
                                "data": ""
                            });
                        } else {
                            console.log('Success');
                            res.send({
                                "message": "group created successfully.",
                                "success": true,
                                "status": 200,
                                "data": group
                            });
                        }
                    });

                }).sort({_id: -1}).limit(1);

            } else {
                res.send({
                    "message": "group is already existed",
                    "success": false,
                    "status": 201,
                    "data": ""
                });
            }
        });
    }
});


router.get('/getGroups', function (req, res, next) {
    Group.find(function (err, data) {
        if (err) {
            console.log(err);
            res.send({
                "message": err.toString(),
                "success": false,
                "status": 201,
                "data": ""
            });
        } else {
            console.log('Success');
            res.send({
                "message": "success.",
                "success": true,
                "status": 200,
                "data": data
            });
        }
    });

});


router.post('/register', function (req, res, next) {
    console.log(req.body);
    var personInfo = req.body;

    console.log(!personInfo.email);

    if (!personInfo.email || !personInfo.username || !personInfo.password) {
        res.send();
    } else {
        if (personInfo.password === personInfo.password) {
            var newPerson = new User();
            User.findOne({email: personInfo.email}, function (err, data) {
                if (!data) {
                    var c;
                    User.findOne({}, function (err, data) {

                        if (data) {
                            console.log("if");
                            c = data.unique_id + 1;
                        } else {
                            c = 1;
                        }

                        newPerson = new User({
                            unique_id: c,
                            userId: "UserId-" + shortid.generate("abcdefghijklmnopqrstuvwxyz"),
                            email: personInfo.email,
                            isConfirmed: false,
                            username: personInfo.username,
                            country: "",
                            token: "",
                            type: "user",
                            longitude: personInfo.longitude,
                            latitude: personInfo.latitude,
                            password: personInfo.password
                        });

                        newPerson.save(function (err, Person) {
                            if (err)
                                console.log(err);
                            else {
                                console.log('Success');
                                res.send({
                                    "message": "You are regestered,You can login now.",
                                    "success": true,
                                    "status": 200,
                                    "data": newPerson
                                });
                            }
                        });

                    }).sort({_id: -1}).limit(1);

                } else {
                    res.send({
                        "message": "Email is already used",
                        "success": false,
                        "status": 201,
                        "data": ""

                    });
                }

            });
        } else {
            res.send({"Success": "password is not matched"});
        }
    }
});
const shortid = require('shortid');

router.get('/login', function (req, res, next) {
    return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
    console.log(req.body);
    User.findOne({email: req.body.email}, function (err, data) {
        if (data) {

            if (data.password === req.body.password) {
                //console.log("Done Login");
                const newPerson = new User({
                    userId: data.userId,
                    email: data.email,
                    isConfirmed: data.isConfirmed,
                    username: data.username,
                    country: data.country,
                    token: data.token,
                    type: data.type
                });

                req.session.userId = data.unique_id;
                console.log(data.userId);
                res.send(
                    {
                        "message": "Success!",
                        "success": true,
                        "status": 200,
                        "data": newPerson
                    });

            } else {
                res.send({"Success": "Wrong password!"});
            }
        } else {
            res.send({"Success": "This Email Is not regestered!"});
        }
    });
});

router.get('/profile', function (req, res, next) {
    console.log("profile");
    User.findOne({unique_id: req.session.userId}, function (err, data) {
        console.log("data");
        console.log(data);
        if (!data) {
            res.redirect('/');
        } else {
            //console.log("found");
            return res.render('data.ejs', {"name": data.username, "email": data.email});
        }
    });
});

router.get('/logout', function (req, res, next) {
    console.log("logout")
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

router.get('/forgetpass', function (req, res, next) {
    res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
    //console.log('req.body');
    //console.log(req.body);
    User.findOne({email: req.body.email}, function (err, data) {
        console.log(data);
        if (!data) {
            res.send({"Success": "This Email Is not regestered!"});
        } else {
            // res.send({"Success":"Success!"});
            if (req.body.password === req.body.passwordConf) {
                data.password = req.body.password;
                data.passwordConf = req.body.passwordConf;

                data.save(function (err, Person) {
                    if (err)
                        console.log(err);
                    else
                        console.log('Success');
                    res.send({"Success": "Password changed!"});
                });
            } else {
                res.send({"Success": "Password does not matched! Both Password should be same."});
            }
        }
    });

});

module.exports = router;