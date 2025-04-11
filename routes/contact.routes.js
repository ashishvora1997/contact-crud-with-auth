const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactDetail,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/contact.controller");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContactDetail).put(updateContact).delete(deleteContact);

// router.route("/").post(createContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteContact);

module.exports = router;
