import mongoose from "mongoose";
import bcrypt from "bcrypt";

const memberSchema = new mongoose.Schema({
  memberId: { type: String, required: true, unique: true },
  nickName: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 4 },
  createdAt: { type: Date, required: true, default: Date.now },
  playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  achiveList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

memberSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
