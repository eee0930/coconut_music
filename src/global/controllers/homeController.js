import { getTopTrackList } from "../../song/service/songServiceImpl";
import { getAlbumInfoByTrack } from "../../album/service/albumServiceImpl";

export const getHome = async (req, res) => {
  const pageTitle = "Home";
  const topTracks = await getTopTrackList(10);

  let tracks = topTracks.slice(0, 5);

  const handleSortTrack = async (track, index) => {
    const artist = track.artist.name;
    const name = track.name;
    const rank = index + 1;
    console.log(artist);
    const albumInfo = await getAlbumInfoByTrack(artist, name);
    const { albumTitle, imageSm, imageLg } = albumInfo;
    
    return ({ 
      artist,
      name,
      rank,
      albumTitle,
      imageSm,
      imageLg
    });
  };
  const topTracks1 = tracks.map((track, index) => handleSortTrack(track, index));

  // const topTracks2 = topTracks.slice(5);

  // const artist1 = topTracks[0].artist.name;
  // const name1 = topTracks[0].name;
  // const albumInfo = await getAlbumInfoByTrack(artist1, name1);
  // const { albumTitle, imageSm, imageLg } = albumInfo;
  return res.render("home", { pageTitle, topTracks1 });
};
