const express = require("express");
const app = express();
const Redis = require("ioredis");

const redis = new Redis({
  host: "matsushita-test.gpddhc.clustercfg.apse2.cache.amazonaws.com",
  port: 6379,
  password: null,
  db: 0
});

app.get("/", (req, res) =>{
  res.send("Hello World!");
});

app.get("/redis", async (req, res) => {
  let count = await redis.get("count");
  if (count == null) {
    count = 1;
  }
  await redis.set("count", count + 1);

  let result = "Access Count: " + count;
  console.log(result)
  res.send(result);
});

app.listen("3000");
