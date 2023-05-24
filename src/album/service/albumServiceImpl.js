// api
import { fetchTrackInfo } from "../../song/api/lastFmSongApi";

export const getAlbumInfoByTrack = async (artist, name) => {
  const track = await fetchTrackInfo(artist, name);
  const albumInfo = track.album;
  const { title, image } = albumInfo;
  return {
    "albumTitle": title,
    "imageSm": image[0]["#text"],
    "imageLg": image[image.length - 1]["#text"],
  };
};