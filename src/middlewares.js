import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Coconut Music";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.pathName = req.path;
  next();
};

export const memberOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const guestOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

// export const adminPrivateMiddleware = (req, res, next) => {
//   if (req.session.loggedIn) {
//     return next();
//   } else {
//     return res.redirect("/login");
//   }
// };

export const upleadFiles = multer({
  dest: "uploads/"
})