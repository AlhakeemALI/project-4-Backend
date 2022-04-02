const Home = require("../models/home");

const checkIsOwmer = async (req, res, next) => {
  //const homeId = req.params.homeId;
  const findHome = await Home.findById(req.params.homeId);

  let owner = findHome.postedBy._id == req.user.id;
  console.log(owner);

  if (!owner) {
    return res.status(403).send("not Authorized");
  }
  next();
};

module.exports = { checkIsOwmer };
