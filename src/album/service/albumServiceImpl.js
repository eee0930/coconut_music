// api
import { fetchTrackInfo } from "../../song/api/lastFmSongApi";

export const getAlbumInfoByTrack = async (artist, name) => {
  try {
    const data = await fetchTrackInfo(artist, name);
    const albumInfo = data.track.album;
    const defaultImg = "/public/client/img/error.png";
    let [albumTitle, imageSm, imageLg] = [];
    if(albumInfo) {
      albumTitle = albumInfo.title;
      imageSm = image[0]["#text"];
      imageLg = image[image.length - 1]["#text"];
    } else {
      albumTitle = "No Title";
      imageSm = defaultImg;
      imageLg = defaultImg;
    }
    return {
      albumTitle,
      imageSm,
      imageLg,
    };
  } catch(error) {
    console.log("에러다" + error);
  } 
};