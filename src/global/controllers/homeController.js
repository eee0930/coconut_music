import { fetchTopTracks } from "../../song/api/lastFmSongApi";

export const getHome = async (req, res) => {
  const pageTitle = "Home";
  const data = await fetchTopTracks();
  const topTracks1 = data.tracks.track.slice(0, 5);
  const topTracks2 = data.tracks.track.slice(5, 10);
  return res.render("home", { topTracks1, topTracks2, pageTitle });
};
