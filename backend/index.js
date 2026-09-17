import "dotenv/config";
import cors from "cors";
import express from "express";
import ImageKit from "@imagekit/nodejs";



const port = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Initialize ImageKit
const imagekit = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.helper.getAuthenticationParameters();

  res.send({
    ...result,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});