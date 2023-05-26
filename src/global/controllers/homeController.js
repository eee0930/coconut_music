// services
import { getTopTrackList } from "../../song/service/songServiceImpl";
import { getMixtapeList } from "../../album/service/mixTapeServiceImpl";

export const getHome = async (req, res) => {
  const pageTitle = "Home";
  
  // get top tracks
  const topTracks = await getTopTrackList();
  const topTracks1 = topTracks.slice(0, 5);
  const topTracks2 = topTracks.slice(5);

  // get mixtapes 
  const mixtapes = await getMixtapeList(4);

  return res.render("home", { pageTitle, topTracks1, topTracks2, mixtapes });
};
