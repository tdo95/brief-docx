const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.send({user: {email: req.user.email, name: req.user.name}});
  }
  else res.send({user: null})
};

exports.postLogin = (req, res, next) => {
  const validationErrors = {};
  if (!validator.isEmail(req.body.email))
    validationErrors['email'] = "Please enter a valid email address.";
  if (validator.isEmpty(req.body.password))
    validationErrors['password'] = "Password cannot be blank.";

  if (Object.keys(validationErrors).length) {
    return res.send({errors: validationErrors});
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({errors: 'Cannot find user', info});
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.send( { success: "Success! You are logged in.", user: {email: user.email, name: user.name} });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.send({success: 'User logged'});
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    //TODO: Change this to allow users to sign up
    return res.redirect("/profile");
  }
  res.send({message: 'User can sign up'});
};

exports.postSignup = (req, res, next) => {

  const validationErrors = {};
  if (validator.isEmpty(req.body.name))
    validationErrors['name'] = "Please enter a valid name."
  if (!validator.isEmail(req.body.email))
    validationErrors['email'] = "Please enter a valid email address.";
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors['password'] = "Password must be at least 8 characters long.";
  if (req.body.password !== req.body.passwordConfirm)
    validationErrors['passwordConfirm'] = "Passwords do not match.";

  if (Object.keys(validationErrors).length) {
    return res.send({errors: validationErrors});
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user)

  User.findOne(
    { email: req.body.email },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.send({errors: "The user already exists"});
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          res.send({success: "User registered and logged in", user: {email: user.email, name: user.name}});
        });
      });
    }
  );
};
