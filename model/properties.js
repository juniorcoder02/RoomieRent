const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews");
const { number } = require("joi");

const DEFAULT_IMAGE_URL = "../assests/hero-section.png";

// Helper function to limit the number of images to 4
function arrayLimit(val) {
  return val.length <= 4;
}
const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true },
      zipCode: { type: Number, required: true },
      lat: { type: Number, required: true },
      lon: { type: Number, required: true }, 

    },
    price: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["Apartment", "Room", "House", "Studio"],
      required: true,
    },
    images: {
      type: [
        {
          url: String, // Cloudinary URL
          filename: String, // Cloudinary filename
        },
      ],
      default: [{ url: DEFAULT_IMAGE_URL, filename: "default_image" }],
      validate: [arrayLimit, "You can upload up to 4 images only."], // Apply validation for array length
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amenities: {
      type: String, // Store as comma-separated string
      trim: true,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },

  { timestamps: true }
);

propertySchema.post("findOneAndDelete", async (property) => {
  if (property) {
    await Review.deleteMany({ _id: { $in: property.reviews } }); // Delete all associated reviews when a property is deleted
  }
});

const property = mongoose.model("Property", propertySchema);
module.exports = property;
