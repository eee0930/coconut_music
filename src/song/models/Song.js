import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  "#text": String,
  size: String,
});
const songSchema = new mongoose.Schema({
  name: String,
  artist: {
    name: String,
  },
  image: [imageSchema],
  listeners: String,
  playcount: String,

});

const Song = mongoose.model("Song", songSchema);

export default Song;

