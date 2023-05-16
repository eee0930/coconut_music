import fetch from "node-fetch";

const FM_API_ROOT = "https://ws.audioscrobbler.com/2.0/";

export const fetchTopTracks = async (req, res) => {
  try {
    const response = await fetch(`${FM_API_ROOT}?method=chart.gettoptracks&api_key=${process.env.API_KEY}&format=json`);
    const data = response.json();
    const status = response.status;
    if(status === 200) {
      return data;
    } else {
      console.log(status);
      return false;
    }
  } catch(error) {
    console.log(error);
    return false;
  }
};