// models
import Song from "../models/Song";

// api
// import { fetchTopTracks } from "../api/lastFmSongApi";
import { fetchTopTracks } from "../api/deezerSongApi";

// service
import { getAlbumInfoByTrack } from "../../album/service/albumServiceImpl";


export const getSongById = (id) => {};
export const getSongListByPage = (page) => {};

export const getTopTrackList = async (size) => {
  size = size ? size : 10;
  const trackList = await fetchTopTracks();
  const sortTopTrack = (track, index) => {
    const rank = index + 1;
    const tid = track.id;
    const alid = track.album.id;
    const arid = track.artist.id;
    const name = track.title_short;
    const artist = track.artist.name;
    const album = track.album.title;
    const imageLg = track.album.cover_big;
    const image = track.album.cover_small;
    const preview = track.preview;
    const duration = track.duration;
    return { rank, tid, alid, arid, name, artist, album, imageLg, image, preview, duration }
  };
  const topTracks = trackList.data
    .slice(0, size)
    .map((track, index) => sortTopTrack(track, index));
  return topTracks;
};


export const getSongListByArtist = (artist) => {};