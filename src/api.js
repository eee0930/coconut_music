import fetch from "node-fetch";
import { google } from "googleapis";
import Youtube from "./song/models/Youtube";


/*--------------------------------------------------------------------------
					                            Last FM API
---------------------------------------------------------------------------*/
const LAST_FM_API_ROOT = "https://ws.audioscrobbler.com/2.0/";
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

export const findTopTrackList = async () => {
  try {
    const url = new URL(LAST_FM_API_ROOT);
    const params = new URLSearchParams({
      method: "chart.getTopTracks",
      api_key: LAST_FM_API_KEY,
      format: "json",
    });
    url.search = params;
    const response = await fetch(url);
    const data = response.json();
    const status = response.status;
    if(status !== 200) {
      return data;
    } else {
      console.log(status);
      return false;
    }
  } catch(error) {
    console.log(error.message);
    throw error;
  }
};

export const findTrackInfo = async ({ artist, title }) => {
  try {
    const url = `${LAST_FM_API_ROOT}?method=track.getInfo&api_key=${LAST_FM_API_KEY}&artist=${artist}&track=${title}&format=json`;
    // const url = new URL(LAST_FM_API_ROOT);
    // const params = new URLSearchParams({
    //   method: "track.getInfo",
    //   api_key: LAST_FM_API_KEY,
    //   artist: artist,
    //   track: title,
    //   format: "json",
    // });
    // url.search = params;
    const response = await fetch(url);
    const data = await response.json();
    const status = response.status;
    if(status === 200) {
      return data;
    } else {
      console.log(status);
      return false;
    }
  } catch(error) {
    console.error(error.message);
    throw error;
  }
}


/*--------------------------------------------------------------------------
					                            Youtube API
---------------------------------------------------------------------------*/
const YOUTUBE_API_ROOT = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// const youtube = google.youtube({
//   version: "v3",
//   auth: YOUTUBE_API_KEY,
// });

export const findYoutubeId = async ({ artist, title }) => {
  const query = `${title} ${artist}`;
  const youtubeData = await Youtube.findOne({ query });
  if (youtubeData) return youtubeData.videoId;

  const url = new URL(YOUTUBE_API_ROOT);
  const params = new URLSearchParams({
    key: YOUTUBE_API_KEY,
    part: "id",
    q: query,
    type: "video",
    maxResults: 1,
    format: "json",
  });
  url.search = params;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const status = response.status;
    if(status === 200) {
      const { items } = data;
      const videoId = items[0].id.videoId;

      const youtubeObj = new Youtube({ query, videoId });
      await youtubeObj.save();

      return videoId;
    } else {
      console.log("음악을 찾을 수 없습니다.");
      return false;
    }
  } catch (error) {
    console.error(error.messege);
    throw error;
  }
};
