const { userModel } = require("../model");

async function getContact(user_id){
  const user = await userModel.findById(user_id)
  return user
}

async function save(user_id, body) {
  const user = await userModel.findById(user_id);
  // console.log(user);
  user.contact_list.push(body);
  const updatedUser = await user.save();
  return updatedUser;
}
async function deleteC(user_id, contact_id) {
  const user = await userModel.findById(user_id);
  let id_Cont = false;
  user.contact_list = user.contact_list.filter((contact) => {
    id_Cont = true;
    return contact._id.toString() !== contact_id;
  });
  if (!id_Cont) return false;
  const updatedUser = await user.save();
  return updatedUser;
}
async function update(user_id, contact_id, data) {
  const user = await userModel.findById(user_id);
  let id_Cont = false;
  user.contact_list = user.contact_list.map((contact) => {
    if (contact._id.toString() === contact_id) {
      id_Cont = true;
      return { ...contact, ...data };
    }
    return contact;
  });
  if (!id_Cont) return false;
  const updatedUser = await user.save();
  return updatedUser;
}

module.exports = {
  save,
  deleteC,
  update,
  getContact
};
