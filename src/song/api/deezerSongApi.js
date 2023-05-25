import axios from "axios";

const API_ROOT = "https://deezerdevs-deezer.p.rapidapi.com/";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";
const API_KEY = process.env.DEEZER_API_KEY;
const METHOD = "get";
const HEADERS = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': API_HOST
}

const fetchResponseData = async (options) => {
  try {
    const response = await axios.request(options);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export const fetchTopTracks = async () => {
  const options = {
    method: METHOD,
    url: "https://api.deezer.com/chart/0/tracks",
  };
  return await fetchResponseData(options);
}

export const fetchSearchResultsByQuery = async (query) => {
  const options = {
    method: METHOD,
    url: `${API_ROOT}search`,
    params: {q: query},
    headers: HEADERS
  };
  return await fetchResponseData(options);
}

export const fetchTrackById = async (tid) => {
  const options = {
    method: METHOD,
    url: `${API_ROOT}track/%7Bid%7D`,
    params: { id: tid },
    headers: HEADERS
  };
  return await fetchResponseData(options);
}

export const fetchArtistById = async (arid) => {
  const options = {
    method: METHOD,
    url: `${API_ROOT}artist/%7Bid%7D`,
    params: { id: arid },
    headers: HEADERS
  };
  return await fetchResponseData(options);
}

export const fetchAlbumById = async (alid) => {
  const options = {
    method: METHOD,
    url: `${API_ROOT}album/%7Bid%7D`,
    params: { id: alid },
    headers: HEADERS
  };
  return await fetchResponseData(options);
}
