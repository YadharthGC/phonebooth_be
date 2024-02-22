const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const port = process.env.PORT || 3009;
const routez = require("./routes/boothRoute");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/ablelyfbooth", routez);

app.listen(port, () => {
  console.log("app wasrendereing", port);
});
