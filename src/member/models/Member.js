import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({});

const Member = mongoose.model("Member", memberSchema);

export default Member;
