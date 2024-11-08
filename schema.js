const Joi = require("joi");
module.exports.propertySchema = Joi.object({
  property: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),

    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.number().required(),

    price: Joi.number().required(),
    propertyType: Joi.string().required(),
    image: Joi.string().allow("", null),
    availableFrom: Joi.date().required(),
    amenities: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required(),
});
