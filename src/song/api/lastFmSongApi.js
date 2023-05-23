import fetch from "node-fetch";

const API_ROOT = "https://ws.audioscrobbler.com/2.0/";
const API_KEY = process.env.LAST_FM_API_KEY;

export const fetchTopTracks = async (limit) => {
  try {
    const response = await fetch(`${API_ROOT}?method=chart.gettoptracks&api_key=${API_KEY}${limit? "&limit=" + limit : ''}&format=json`);
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


export const fetchTrackInfo = async (artist, name) => {
  // artist = artist.split(" ").join("+");
  // name = name.split(" ").join("+");
  try {
    const response = await fetch(`${API_ROOT}?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${name}&format=json`);
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
}