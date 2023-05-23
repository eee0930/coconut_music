import { getTopTrackList } from "../../song/service/songServiceImpl";

export const getHome = async (req, res) => {
  const pageTitle = "Home";
  const topTracks = await getTopTrackList(10);
  const topTracks1 = topTracks.slice(0, 5);
  const topTracks2 = topTracks.slice(5);
  return res.render("home", { topTracks1, topTracks2, pageTitle });
};
