const express = require("express");

const discordController = require("../controllers/discordController");
const router = express.Router();

router.get("/member", discordController.getAllMembers);

router.get("/member/discord", discordController.getAllDiscordMembers);

router.get("/member/github", discordController.getAllGithubMembers);

router.post("/", discordController.createNewMember);

router.route("/member/:memberId")
      .get(discordController.getOneMember)
      .patch(discordController.updateOneMember)
      .delete(discordController.deleteOneMember);

module.exports = router;