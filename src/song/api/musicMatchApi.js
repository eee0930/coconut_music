import axios from "axios";

const API_ROOT = "https://api.musixmatch.com/ws/1.1/";
const API_KEY = process.env.MUSIC_MATCH_API_KEY;

const fetchResponseData = async (options) => {
  try {
    const response = await axios.request(options);
    const data = response.data;
    const statusCode = data.message.header.status_code;
    if (statusCode !== 200) {
      console.log(statusCode);
      return;
    } else {
      return data;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const fetchTopTracks = async (size, country) => {
  const options = {
    url: `${API_ROOT}chart.tracks.get`,
    params: {
      apikey: API_KEY,
      chart_name: "hot",
      page: 1,
      page_size: size ? size : 10,
      f_has_lyrics: 1,
      country: country ? country : 'KR',
    },
  };
  return await fetchResponseData(options);
};

export const fetchTrackInfoById = async (id) => {

};