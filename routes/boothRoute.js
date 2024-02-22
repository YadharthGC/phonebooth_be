const {
  handleSetUsers,
  handleGetUsers,
  handleDeleteUsers,
  handleSetPic,
  handleGetOneUser,
} = require("../controllers/boothFunctions");

const router = require("express").Router();

router.post("/setuser", handleSetUsers);
router.get("/getusers", handleGetUsers);
router.get("/getuser/:id", handleGetOneUser);
router.delete("/deleteusers/:id", handleDeleteUsers);
router.post("/setpic", handleSetPic);

module.exports = router;
