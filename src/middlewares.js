export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Coconut Music";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const adminPrivateMiddleware = (req, res, next) => {
  const url = req.url;
  if(url === '/admin') {
    return res.send("<h1>Not Allowed.</h1>")
  }
  console.log("middleware is allowed")
  next();
}
