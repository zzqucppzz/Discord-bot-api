const bodyParser = require("body-parser");
const express = require("express");

const v1DiscordRouter = require("./v1/routes/discordRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/discord/v1",v1DiscordRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
});
