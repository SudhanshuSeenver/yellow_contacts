// create Contact

const { contactService } = require("../service");

const createContact = async (req, res) => {
  try {
    const body = req.body;
    const { user_id } = req.params;

    const user = await contactService.save(user_id, body);

    const resData = {
      name: user.name,
      id: user._id,
      contacts: user.contact_list,
    };

    res.status(201).json(resData);
  } catch (err) {
    res.json(err);
  }
};

// get All contacts
const getAllContacts = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await contactService.getContact(user_id);

    const resData = {
      name: user.name,
      id: user._id,
      contacts: user.contact_list,
    };

    res.status(200).json(resData);
  } catch (err) {
    res.json(err);
  }
};

// delete Contact
const deleteContact = async (req, res) => {
  try {
    const body = req.body;
    const { user_id } = req.params;

    const user = await contactService.deleteC(user_id, body.id);
    if (!user)
      return res.status(404).json({ message: "no contact found with this id" });
    const resData = {
      name: user.name,
      id: user._id,
      contacts: user.contact_list,
    };
    res.status(200).json(resData);
  } catch (err) {
    res.json(err);
  }
};

// update Contact
// body --> { id, data:{ values to be changed } }
const updateContact = async (req, res) => {
  try {
    const body = req.body;
    const { user_id } = req.params;

    const user = await contactService.update(user_id, body.id, body.data);
    if (!user)
      return res.status(404).json({ message: "no contact found with this id" });
    const resData = {
      name: user.name,
      id: user._id,
      contacts: user.contact_list,
    };
    res.status(200).json(resData);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
};
