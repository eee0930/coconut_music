import { getMixtapeList, getMixtapeById } from "../service/mixTapeServiceImpl";

export const mixtapeList = (req, res) => {
  const pageTitle = "mixtape";
  const mixtapeList = getMixtapeList();
  res.render("screens/mixtape", { pageTitle, mixtapeList });
}

export const getMixtapeInfo = (req, res) => {
  const { id } = req.params;
  const mixtape = getMixtapeById(id);
  const pageTitle = mixtape.title;
  res.render("screens/album", { pageTitle, mixtape });
}