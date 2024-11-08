const multer = require("multer");
const axios = require("axios");

const Property = require("../model/properties");
const { propertySchema } = require("../schema");

module.exports.index = async (req, res) => {
  const properties = await Property.find({});
  res.render("Properties/properties.ejs", { properties });
};
module.exports.newPropertyForm = (req, res) => {
  res.render("Properties/new");
};

module.exports.newProperty = async (req, res) => {
  const upload = multer({
    limits: { fileSize: 10 * 1024 }, // Limit file size to 10 KB
    fileFilter(req, file, cb) {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed!"));
      }
      cb(null, true);
    },
  });

  const files = req.files;
  // Check if there are any upload errors
  if (!files || files.length === 0) {
    req.flash("error", "Please upload at least one image.");
    return res.redirect("/properties/new");
  }

  // Extract Cloudinary URLs and filenames
  const image = req.files.map((file) => ({
    url: file.path, // Cloudinary URL
    filename: file.filename, // Cloudinary filename
  }));

  // Get the city from the property data
  const city = req.body.property.city;

  // Make a request to Nominatim API to get coordinates for the city
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search`,
    {
      params: {
        city: city,
        format: "json",
        limit: 1,
      },
    }
  );

  // Extract latitude and longitude
  const { lat, lon } = response.data[0];

  // Construct the property object from form data
  const newProperty = new Property({
    title: req.body.property.title,
    description: req.body.property.description,
    location: {
      street: req.body.property.street,
      city: req.body.property.city,
      state: req.body.property.state,
      country: req.body.property.country,
      zipCode: req.body.property.zipCode,
      lat: lat,
      lon: lon,
    },
    price: req.body.property.price,
    propertyType: req.body.property.propertyType,
    availableFrom: new Date(req.body.property.availableFrom),
    amenities: req.body.property.amenities,
    owner: req.user._id,
    images: image, // Store both URL and filename in the model
  });

  //Save the new property to the database
  await newProperty.save();
  req.flash("success", "New property added!");

  res.redirect("/properties"); // Redirect to the properties list or a success page
};

module.exports.showProperty = async (req, res) => {
  let { id } = req.params;
  const property = await Property.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!property) {
    req.flash("error", "Property you requested for does not exist !");
    res.redirect("/properties");
  }
  // Assuming lat and lon were fetched and saved earlier
  const { lat, lon } = property.location;
  res.render("Properties/show", { property,lat,lon });
};

module.exports.editPropertyForm = async (req, res) => {
  let { id } = req.params;
  const property = await Property.findById(id);
  if (!property) {
    req.flash("error", "Property you requested for does not exist !");
    res.redirect("/properties");
  }

  res.render("Properties/edit", { property });
};

module.exports.editProperty = async (req, res) => {
   // Get the city from the property data
   const city = req.body.property.city;

   // Make a request to Nominatim API to get coordinates for the city
   const response = await axios.get(
     `https://nominatim.openstreetmap.org/search`,
     {
       params: {
         city: city,
         format: "json",
         limit: 1,
       },
     }
   );
 
   // Extract latitude and longitude
   const { lat, lon } = response.data[0];
  propertySchema.validate(req.body);

  let { id } = req.params;
  let property = await Property.findById(id);
  
  if (!property) {
    req.flash("error", "Property not found!");
    return res.redirect("/properties");
  }

  // Update property details
  property.title = req.body.property.title;
  property.description = req.body.property.description;
  property.price = req.body.property.price;
  property.propertyType = req.body.property.propertyType;
  property.availableFrom = new Date(req.body.property.availableFrom);
  property.amenities = req.body.property.amenities;

  // Update location details explicitly
  property.location.street = req.body.property.street;
  property.location.city = req.body.property.city;
  property.location.state = req.body.property.state;
  property.location.country = req.body.property.country;
  property.location.zipCode = req.body.property.zipCode;

  // Update location coordinates
  property.location.lat = lat;
  property.location.lon = lon;

  // Check if new files were uploaded
  if (typeof req.files != "undefined" && req.files.length > 0) {
    let image = req.files.map((file) => ({
      url: file.path, // Cloudinary URL
      filename: file.filename, // Cloudinary filename
    }));
    property.images = image;
  }

  // Save the updated property
  await property.save();

  req.flash("success", "Property updated successfully!");
  res.redirect(`/properties/${id}`);
};

module.exports.destroyProperty = async (req, res) => {
  const { id } = req.params;
  await Property.findByIdAndDelete(id);
  req.flash("success", "property deleted!");

  res.redirect("/properties");
};
