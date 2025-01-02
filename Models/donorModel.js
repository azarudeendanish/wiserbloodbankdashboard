import mongoose, {Schema} from "mongoose";

const schemaData = new Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
    email: { type: String, required: true },
    aadharnumber: { type: Number, required: true },
    bloodgroup: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const donorModel = mongoose.models.donor || mongoose.model("donor", schemaData);
// const userModel = mongoose.model("signup", schemaData);
export default donorModel

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var userSchema = new Schema({
//    name:String,
//    email:String,
//    password:String,
//    num:Number,
//    hcode:String,
// });
// module.exports = mongoose.model('signup', userSchema);