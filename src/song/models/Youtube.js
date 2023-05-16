import mongoose from "mongoose";

const YoutubeSchema = new mongoose.Schema({
  query: String,
  videoId: String,
});

const Youtube = mongoose.model("Youtube", YoutubeSchema);

export default Youtube;