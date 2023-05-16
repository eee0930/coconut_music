import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  id: String,
  title: String,
  meta: {
    views: Number,
    rating: Number,
  },
});

const Song = mongoose.model("Song", songSchema);

export default Song;

