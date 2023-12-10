const Admin = require("../model/Admin");

async function add(req, res, next) {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(200).send("admin added successfully");
  } catch (err) {
    console.error(err);
  }
}

module.exports = { add };
