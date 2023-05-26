import Member from "../models/Member";
import Song from "../../song/models/Song";

export const getPlayListArchive = async (req, res) => {
  const pageTitle = "Archive";

  const {
    session: {
      member: { _id: mid },
    },
  } = req;

  const member = await Member.findById(mid);
  if (!member) return res.redirect("/");

  // 좋아요 누른 곡
  const achives = member.achiveList;
  const songs = await Song.find({ achives: { $in: achives } })
    .populate("achives")
    .sort({ views: "desc" });

  let likeSongs = songs.map(song => ({
    song,
    isLiked: song.achives?.filter((achive) => 
      String(achive.member._id) === mid)
      .length === 1 ? true : false,
  }));

  return res.render("screens/archive", {
    pageTitle,
    songs: likeSongs,
  });
};