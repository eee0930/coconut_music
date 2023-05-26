
export const getAddMember = (req, res) => {
  const title = "coconut";
  const pageTitle = "Join";
  res.render("screens/addMember", { pageTitle, title })
}

export const postAddMember = (req, res) => {
  
  res.redirect("/");
}


export const getLogin = (req, res) => {
  const title = "coconut";
  const pageTitle = "Login"
  res.render("screens/login", { pageTitle, title })
}

export const postLogin = (req, res) => {
  const memberId = "coconut";
  const password = "coconut";
  res.redirect("/");
}