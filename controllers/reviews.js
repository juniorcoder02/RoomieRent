const Property = require("../model/properties");
const Review = require("../model/reviews.js");
module.exports.createReview=async (req, res) => {
    let property = await Property.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    property.reviews.push(newReview);

    await newReview.save();
    await property.save();
    req.flash("success", "new Review added!");

    res.redirect(`/properties/${property._id}`);
  }
  module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;
    await Property.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");

    res.redirect(`/properties/${id}`);
  }