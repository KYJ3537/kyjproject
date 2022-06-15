const mongoose = require("mongoose");

const StarSchema = new mongoose.Schema({
  country_nm: String,
  continent_nm: String,
  country_eng_nm: String,
  dang_map_download_url: String,
  flag_download_url: String,
  news: String,
  wrt_dt: String,
});

const model = mongoose.model("Star", StarSchema);

module.exports = model;
