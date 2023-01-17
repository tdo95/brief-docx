const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.send({user: req.user});
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ message: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ message: "Password cannot be blank." });

  if (validationErrors.length) {
    return res.resend({message: validationErrors});
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      
      return res.send({message: 'Cannot find user', info});
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.send( { message: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
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
    res.redirect("/");
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
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ message: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      message: "Password must be at least 8 characters long",
    });
  // if (req.body.password !== req.body.confirmPassword)
  //   validationErrors.push({ message: "Passwords do not match" });

  if (validationErrors.length) {
    // req.flash("errors", validationErrors);
    return res.send("An error Occured");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(req, user)

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.send({message: "The user already exists"});
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.send("User registered and logged in");
        });
      });
    }
  );
};
