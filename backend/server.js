import express from "express";
import { generateUploadURL } from "./s3.js";
// import cors
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.get("/s3Url", async (req, res) => {
  console.log("generating upload URL");
  const url = await generateUploadURL();
  res.send({ url });
});

app.listen(8080, () => console.log("listening on port 8080"));
