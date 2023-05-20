import fetch from "node-fetch";

const API_KEY = process.env.YOUTUBE_API_KEY;
const API_ROOT = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}`;