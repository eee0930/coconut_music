import fetch from "node-fetch";

const API_ROOT = "https://ws.audioscrobbler.com/2.0/";
const API_KEY = process.env.LAST_FM_API_KEY;

export const fetchTopTracks = async (req, res) => {
  try {
    const response = await fetch(`${API_ROOT}?method=chart.gettoptracks&api_key=${API_KEY}&format=json`);
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