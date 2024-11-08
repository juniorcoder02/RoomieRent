const Property = require("./model/properties");
const Review = require("./model/reviews");
const expressError = require("./utils/expressError");
const { propertySchema, reviewSchema } = require("./schema");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in first !");
    return res.redirect("/login");
  }
  next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let property = await Property.findById(id);
  if (!property.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", " you are not the owner of this property ");
    return res.redirect(`/properties/${id}`);
  }
  next();
};
module.exports.validateProperty = (req, res, next) => {
  let { error } = propertySchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", "); // use 'message' instead of 'msg'
    next(new expressError(400, errMsg)); // pass the error to the next middleware (error handler)
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    next(new expressError(400, errMsg));
  } else {
    next();
  }
};
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
      req.flash("error", " you are not the author of this review ");
      return res.redirect(`/properties/${id}`);
    }
    next();
  };