const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact.modal");

/**
 * @desc Get all contacts
 * @route GET /api/contacts
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(contacts);
});

/**
 * @desc Get contact details
 * @route GET /api/contacts/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const getContactDetail = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to get this contact");
  }

  res.status(200).json(contact);
});

/**
 * @desc Create a new contact
 * @route POST /api/contacts
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  // Validate the request body
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }
  // Create a new contact
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });


  res.status(200).json({
    message: "Create Contact route",
    contact,
  });
});

/**
 * @desc Update a contact
 * @route PUT /api/contacts/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update this contact");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );


  res.status(200).json({
    message: `Update Contact route, id: ${req.params.id}`,
    updateContact,
  });
});

/**
 * @desc Delete a contact
 * @route DELETE /api/contacts/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete this contact");
  }
  await contact.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: `Delete Contact route, id: ${req.params.id}`,
    contact,
  });
});

module.exports = {
  getContacts,
  getContactDetail,
  createContact,
  updateContact,
  deleteContact,
};
