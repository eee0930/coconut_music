import Song from "../models/Song";
import User from "../../user/models/User";
import { fetchTopTracks } from "../../api.js";

export const getHome = async (req, res) => {
  const data = await fetchTopTracks();
  const topTracks = data.tracks.track;
  return res.render("home", { topTracks, pageTitle: "Home" });
};
