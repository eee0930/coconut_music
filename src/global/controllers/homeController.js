// services
import { getTopTrackList } from "../../song/service/songServiceImpl";
import { getAlbumInfoByTrack } from "../../album/service/albumServiceImpl";

export const getHome = async (req, res) => {
  const pageTitle = "Home";
  const topTracks = await getTopTrackList(10);

  const handleSortTrack = async (track, index) => {
    const artist = track.artist.name;
    const name = track.name; 
    const rank = index + 1;
    const { albumTitle, imageSm, imageLg } = await getAlbumInfoByTrack(artist, name);
    return { 
      artist: artist,
      name: name,
      rank,
      albumTitle,
      imageSm,
      imageLg
    };
  };

  const newTopTracks = topTracks
    .map(async (track, index) => await handleSortTrack(track, index));
  const topTracks1 = newTopTracks.slice(0, 5);
  const topTracks2 = newTopTracks.slice(5);

  console.log("0번째", newTopTracks[0].albumTitle);
  return res.render("home", { pageTitle, topTracks1, topTracks2 });
};
