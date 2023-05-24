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
  const topTracks = data.tracks.track;
  
  return topTracks;
};


export const getSongListByArtist = (artist) => {};