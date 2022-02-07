const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String
  });


  const Item = mongoose.model('Item', articleSchema);
   

  module.exports = Item; 
 