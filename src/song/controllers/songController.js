import Song from "../models/Song";
import User from "../../user/models/User";
import { findTopTrackList, findTrackInfo, findYoutubeId } from "../../api";

export const getHome = async (req, res) => {
  const data = await findTopTrackList();
  const topTracks = data.tracks.track;
  const trackDetails = topTracks.map(async track => {
    const trackDetail = await findTrackInfo({
      artist: track.artist.name,
      title: track.name,
    });
    const albumImage = trackDetail?.track?.album?.image[2]["#text"];
    const title = trackDetail?.track?.name || "No title";
    const artist = trackDetail?.track?.artist?.name || "No artist";
    const videoId = await findYoutubeId({ title, artist });
    return {
      title,
      artist,
      albumImage,
      videoId,
    };
  });
  console.log(trackDetails.title)
  return res.render("home", { trackDetails, pageTitle: "Home" });
};
