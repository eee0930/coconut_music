import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  albumImage: { type: String, trim: true },
  youtube: { type: mongoose.Schema.Types.ObjectId, ref: "Youtube" },
});

const Song = mongoose.model("Song", songSchema);

export default Song;

