import mongoose from "mongoose";

const PlayListSchema = new mongoose.Schema({
  pid: { type: String, required: true },
  name: { type: String, required: true, minLength: 1, maxLength: 20 },
  member: { type: mongoose.Types.ObjectId, required: true, ref: "Member" },
  coverUrl: {
    type: String,
    required: true,
    default: "/public/client/img/default_profile.jpg",
  },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

const PlayList = mongoose.model("PlayList", PlayListSchema);

export default PlayList;
