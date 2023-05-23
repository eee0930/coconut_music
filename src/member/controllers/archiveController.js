import Member from "../models/Member";
import Song from "../../song/models/Song";
import PlayList from "../../song/models/PlayList";

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
  const likes = member.likes;
  const songs = await Song.find({ likes: { $in: likes } })
    .populate("likes")
    .sort({ views: "desc" });

  let likeSongs = songs.map(song => ({
    song,
    isLiked: song.likes?.filter((like) => 
      String(like.member._id) === mid)
      .length === 1 ? true : false,
  }));

  return res.render("screens/archive", {
    pageTitle,
    songs: likeSongs,
  });
};