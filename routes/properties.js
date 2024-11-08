const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateProperty } = require("../middleware");
const propertyController = require("../controllers/properties");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage: storage });
router
  .route("/")
  .get(wrapAsync(propertyController.index))
  .post(
    isLoggedIn,
    upload.array("property[image]", 4),
    validateProperty,
    wrapAsync(propertyController.newProperty)
  );

//new property route
router.get("/new", isLoggedIn, propertyController.newPropertyForm);

router
  .route("/:id")
  .get(wrapAsync(propertyController.showProperty))
  .put(
    isLoggedIn,
    isOwner,
    upload.array("property[image]", 4),
    validateProperty,
    wrapAsync(propertyController.editProperty)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(propertyController.destroyProperty));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(propertyController.editPropertyForm)
);

module.exports = router;
