// models
import Song from "../models/Song";

// api
import { fetchTopTracks } from "../api/lastFmSongApi";

// service
import { getAlbumInfoByTrack } from "../../album/service/albumServiceImpl";


export const getSongById = (id) => {};
export const getSongListByPage = (page) => {};

export const getTopTrackList = async (limit) => {
  const data = await fetchTopTracks(limit);
  const tracks = data.tracks.track;
  const topTracks = tracks.map(async (topTrack, index) => {
    const rank = index + 1;
    const name = topTrack.name;
    const artist = topTrack.artist.name;
    const playCount = topTrack.playcount;
    const albumInfo = await getAlbumInfoByTrack(artist, name);
    topTrack = {
      rank,
      name,
      artist,
      title: albumInfo.title,
      imageSm: albumInfo.imageSm,
      imageLg: albumInfo.imageLg,
      playCount,
    };
    return topTrack;
  })
  return topTracks;
};


export const getSongListByArtist = (artist) => {};