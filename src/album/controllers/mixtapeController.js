
export const getMixtapeInfo = (req, res) => {
  const pageTitle = "믹스테잎 이름";
  const { id } = req.params;

  res.render("screens/album", { pageTitle });
}