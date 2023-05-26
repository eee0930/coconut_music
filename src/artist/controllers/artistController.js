
export const getArtistInfo = (req, res) => {
  const pageTitle = "아티스트 이름";
  const { id } = req.params;
  
  res.render("screens/artist", { pageTitle });
}