
export const getAddMember = (req, res) => {
  const title = "coconut";
  res.render("screens/addMember", { title })
}

export const postAddMember = (req, res) => {
  
  res.redirect("/");
}


export const getLogin = (req, res) => {
  const title = "coconut";
  res.render("screens/login", { title })
}

export const postLogin = (req, res) => {
  
  res.redirect("/");
}