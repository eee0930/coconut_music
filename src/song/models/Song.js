import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  id: String,
  title: String,
  
});

const Song = mongoose.model("Song", songSchema);

export default Song;

