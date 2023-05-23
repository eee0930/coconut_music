import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  sid: { type: String, required: true },
  name: { type: String, required: true },
  artist: { type: String, required: true },
  title: {
    type: String,
    required: true,
    default: function () {
      return this.artist + " 앨범";
    },
  },
  coverUrl: {
    type: String,
    required: true,
    default: function () {
      return `https://img.youtube.com/vi/${this.youtubeId}/sddefault.jpg`;
    },
  },
  playTime: { type: Number, required: true },
  releasedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  createdAt: { type: Date, required: true, default: Date.now },
  playCount: String,
  youtubeId: { type: String, required: true, unique: true },
});

const Song = mongoose.model("Song", songSchema);
export default Song;