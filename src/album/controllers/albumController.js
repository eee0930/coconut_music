
export const getAlbumInfo = (req, res) => {
  const pageTitle = "앨범 제목";
  const { id } = req.params;
  
  res.render("screens/album", { pageTitle })
}