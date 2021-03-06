const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtOptions');
const User = require("../models/user");
const Content = require("../models/content");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("../config/passport.js");


router.get("/secret", passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    message: "Success! You can not see this without a token"
  });
});

/* DELETE a USER. */
router.delete('/users/:id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {

    console.log("DELETE CALLED ");
    User.findOneAndRemove({
      '_id': req.params.id
    }, (err) => {
      if (err) res.status(400).json({
        message: 'Not found'
      });
      res.status(200).json({
        message: 'ELIMINATED'
      });
    });
  });

router.post('/users/:id/save', passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {

    console.log(req.body.uniqueRef);
    Content.findOne({"uniqueRef": req.body.uniqueRef}, (err, content)=>{
      if(err) res.status(400).json({message:err});
      if(!content){
        const newContent = Content(req.body);
        newContent.save((err, content) => {
          if (err) res.status(400).json({
            message: err
          });
          User.findById(req.params.id, (err, user) => {
            if (err) res.status(400).json({
              message: err
            });
            user.favorites.push(newContent._id);
            user.save();
            res.status(200).json({
              user: user
            });
          });
        });

      }
      else{
        User.findById(req.params.id, (err, user) => {
          if (err) res.status(400).json({
            message: err
          });
          if(user.favorites.filter((elem)=> elem == String(content._id)).length < 1){
            console.log("new element!");
            user.favorites.push(content._id);
            user.save();
            res.status(200).json({
              user: user
            });
          }
          else{
            console.log("already saved");
            res.status(200).json({user: user});
          }
        });
      }
    });


  });

router.patch('/users/:id/save', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log(req.body);
  if (typeof(req.body.contentId) === "undefined") res.status(400).json({
    message: "undefined"
  });
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(400).json({
      message: err
    });
    if (user.favorites.indexOf(req.body.contentId) != -1) {
      user.favorites.splice(user.favorites.indexOf(req.body.contentId), 1);
      user.save();
      res.status(200).json({
        user: user
      });
    }
  });


});

router.patch("/users/:id/search", passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log(req.body);
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(500).json({
      message: err
    });
    if (req.body.action == "add") {
      if (user.searches.indexOf(req.body.search) != -1) console.log("search already exists");
      else {
        user.searches.push(req.body.search);
        user.save();
      }
      res.status(200).json({
        user: user
      });
    }
    if (req.body.action == "delete") {
      if (user.searches.indexOf(req.body.search) != -1) {
        user.searches.splice(user.searches.indexOf(req.body.search), 1);
        user.save();
        console.log("search updated");
      }
      res.status(200).json({
        user: user
      });
    }

  });
});




module.exports = router;
