import { fetchTopTracks } from "../../song/api/lastFmSongApi";

export const getHome = async (req, res) => {
  const pageTitle = "Home";
  const data = await fetchTopTracks();
  const topTracks = data.tracks.track;
  return res.render("home", { topTracks, pageTitle });
};
