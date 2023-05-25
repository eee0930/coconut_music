import fetch from "node-fetch";

const API_ROOT = "https://api.musixmatch.com/ws/1.1/";
const API_KEY = process.env.MUSIC_MATCH_API_KEY;

export const fetchTopTracks = async (size) => {
  size = size || 10;
  try {
    const response = await fetch(`${API_ROOT}chart.tracks.get?apikey=${API_KEY}&chart_name=top&page=1&page_size=${size}}&country=XW&f_has_lyrics=1`);
    const data = response.json();
    const status = response.status;
    if(status === 200) {
      return data;
    } else {
      console.log(status);
      return false;
    }
  } catch(error) {
    console.log(error.messege);
    throw error;
  }
};