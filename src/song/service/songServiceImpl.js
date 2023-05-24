// models
import Song from "../models/Song";

// api
import { fetchTopTracks } from "../api/lastFmSongApi";

// service
import { getAlbumInfoByTrack } from "../../album/service/albumServiceImpl";


export const getSongById = (id) => {};
export const getSongListByPage = (page) => {};

export const getTopTrackList = async (limit) => {
  const tracks = await fetchTopTracks(limit);
  const topTracks = tracks.track;
  
  return topTracks;
};


export const getSongListByArtist = (artist) => {};