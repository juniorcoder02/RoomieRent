const User = require("../model/user");

module.exports.signupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email,phone, password } = req.body;
    const newUser = new User({ email,phone, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "user registered successfully");
      res.redirect("/properties");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};
module.exports.loginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "welcome back to RoomieRent!");
  let redirectUrl = res.locals.redirectUrl || "/properties";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out !");
    res.redirect("/properties");
  });
};
