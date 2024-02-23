const {
  handleSetUsers,
  handleGetUsers,
  handleDeleteUsers,
  handleSetPic,
  handleGetOneUser,
  handleGetAIpic,
  handleDeleteAI,
  handleSend,
} = require("../controllers/boothFunctions");

const router = require("express").Router();

router.post("/setuser", handleSetUsers);
router.get("/getusers", handleGetUsers);
router.get("/getuser/:id", handleGetOneUser);
router.delete("/deleteusers/:id", handleDeleteUsers);
router.post("/setpic/:id", handleSetPic);
router.get("/getaipic/:token", handleGetAIpic);
router.delete("/delopupic/:token", handleDeleteAI);
router.get("/sendmail/:token", handleSend);

module.exports = router;
