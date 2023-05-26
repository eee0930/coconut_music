import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  tid: { type: Number, required: true },
  name: { type: String, required: true },
  arid: { type: Number, required: true },
  artist: { type: String, required: true },
  preview: { type: String, required: true },
  coverUrl: {
    type: String,
    required: true,
    default: function () {
      return "/public/client/img/default_profile.jpg";
    },
  },
  alid: { type: Number, required: true },
  duration: { type: Number, required: true },
  youtubeId: { type: String, required: true, unique: true },
});

const Song = mongoose.model("Song", songSchema);
export default Song;