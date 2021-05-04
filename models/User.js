const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    cellphone: String,
    futureRole: String,
});

module.exports = mongoose.model("User", Userchema);
