import mongoose from "mongoose";

const playSchema = new mongoose.Schema({

});

const Play = mongoose.model("Play", playSchema);

export default Play;