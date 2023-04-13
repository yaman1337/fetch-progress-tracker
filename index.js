const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static("public"));

app.get("/", (req, res) => res.send(200));

app.get("/data", (req, res) => {
  const stats = fs.statSync("./data.csv");
  const fileSizeInBytes = stats.size;

  res.setHeader("size", fileSizeInBytes);

  const readableStream = fs.createReadStream("./data.csv", {
    highWaterMark: 1,
  });

  readableStream.pipe(res);
});

app.listen(9000, () => {
  console.log("Go to http://localhost:9000")
});
