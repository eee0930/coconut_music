import Member from "../../member/models/Member";
import Song from "../models/Song";
import PlayList from "../models/PlayList";

export const getPlaylist = async (req, res) => {
  const pageTitle = "play list";

  const {
    session: {
      member: { _id: mid },
    },
  } = req;

  const member = await Member.findById(mid);
  if (!member) {
    // 로그인하지 않으면 로컬스토리지에서 가져옴
  } else {
    const playLists = await PlayList.find({ member: mid })
      .populate("member")
      .sort({ createdAt: "desc" });

    return res.render("screens/playList", { pageTitle, playLists });
  }
  
};

export const getAddSongToPlaylist = async (req, res) => {
  if (!req.session.member) {
    // 로그인하지 않으면 로컬스토리지에 추가함
  } else {
    const {
      session: {
        member: { _id: mid },
      },
    } = req;
  
    const playLists = await PlayList.find({ member: mid }).sort({
      createdAt: "desc",
    });

    return res.json({ ok: true, playLists });
  }
};

export const postAddSongToPlaylist = async (req, res) => {
  const { pid, sid } = req.body;

  const playList = await PlayList.findById(pid).populate("songs");

  if (!playList) {
    return res.json({
      ok: false,
      errorMsg: "존재하지 않는 플레이리스트입니다.",
    });
  }

  const songExists = playList.songs.some(song => song._id.toString() === sid);
  if (songExists) {
    return res.json({ ok: false, errorMsg: "이미 추가된 곡입니다!" });
  }

  await playList.songs.push(sid);
  await playList.save();

  return res.json({ ok: true });
};

export const postDelSongFromPlaylist = async (req, res) => {
  const { pid, sid } = req.body;

  const playList = await PlayList.findById(pid);

  if (!playList) {
    return res.json({
      ok: false,
      errorMsg: "존재하지 않는 플레이리스트입니다!",
    });
  }

  playList.songs.splice(playList.songs.indexOf(sid), 1);
  await playList.save();

  return res.json({ ok: true });
};

export const getPlaylistSongs = async (req, res) => {
  const { pid } = req.params;

  const playList = await PlayList.findById(pid).populate("songs");

  if (!playList) {
    return res.json({
      ok: false,
      errorMsg: "존재하지 않는 플레이리스트입니다!",
    });
  }

  return res.json({ ok: true, songs: playList.songs });
};