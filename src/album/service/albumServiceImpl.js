// api
import { fetchTrackInfo } from "../../song/api/lastFmSongApi";

export const getAlbumInfoByTrack = async (artist, name) => {
  const data = await fetchTrackInfo(artist, name);
  const { album } = data.track;
  const { image } = album;
  const imageSm = image[0]["#text"];
  const imageLg = image[image.length - 1]["#text"];
  
  return {
    title,
    imageSm,
    imageLg,
  };
};