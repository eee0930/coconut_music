
export const getAddMember = (req, res) => {
  const title = "coconut";
  res.render("screens/addMember", { title })
}

export const postAddMember = (req, res) => {
  
  res.redirect("/");
}