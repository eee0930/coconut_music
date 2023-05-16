// import request from "request";
import Song from "../models/Song";
import User from "../../user/models/User";

export const getHome = async (req, res) => {
  try {
    const result = await Song.find({}).sort({ listners: -1 }).exec();
    const songs = JSON.parse(JSON.stringify(result));
    return res.render("home", { pageTitle: "Home", songs });
  } catch {
    return res.render("server-error");
  }
};

export const posthome = async (req, res) => {
  try {
    const data = await fetch(`${process.env.API_ROOT}?method=chart.gettoptracks&api_key=${process.env.API_KEY}&format=json&period=7day`).json();
    const status = response.status;
    if(status !== 200) {
      console.log(status, 'API Error가 발생했다냥');
      res.status(500).send("Server Error");
    } else {
      const addDatas = data.tracks.track.map((v) => {
        return { ...v, listners: Math.floor(Math.random() * (1000 - 1) + 1) };
      });
      Song.collection.insertMany(addDatas);
    }
  } catch(error) {
    console.log(error, 'API Error가 발생했다냥');
    res.status(500).send("Server Error");
  }
  
  
  // request(
  //   `${process.env.API_ROOT}?method=chart.gettoptracks&api_key=${process.env.API_KEY}&format=json&period=7day`,
  //   function (error, response, body) {
  //     if (!error && response.statusCode === 200) {
  //       const data = JSON.parse(body);
  //       const addDatas = data.tracks.track.map((v) => {
  //         return { ...v, listners: Math.floor(Math.random() * (1000 - 1) + 1) };
  //       });
  //       Song.collection.insertMany(addDatas);
  //     } else {
  //       console.log(error.message);
  //       res.status(500).send("Server Error");
  //     }
  //   }
  // )
  return res.render("home", { pageTitle: "Home" });
};
 