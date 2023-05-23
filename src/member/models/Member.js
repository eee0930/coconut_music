import mongoose from "mongoose";
import bcrypt from "bcrypt";

const memberSchema = new mongoose.Schema({
  mid: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 4 },
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 10,
    default: function () {
      return this.email.split("@")[0].substring(0, 10);
    },
  },
  avatarUrl: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  playlists: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Playlist" },
  ],
});

memberSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
