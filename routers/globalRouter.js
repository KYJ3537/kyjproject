const express = require("express");
const routes = require("../routes");
const {
  home,
  getSearch,
  postSearch,
  getStar,
  postStar,
  getDanger,
  userinfo,
} = require("../controllers/globalController");

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, getSearch);
globalRouter.post(routes.search, postSearch);
globalRouter.get(routes.star, getStar);
globalRouter.post(routes.star, postStar);
globalRouter.get(routes.danger, getDanger);
globalRouter.get(routes.userinfo, userinfo);
module.exports = globalRouter;
