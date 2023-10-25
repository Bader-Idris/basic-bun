// import figlet from "figlet";
//  we need to transpile files served to front-end tsc => js

// this command converts libraries from package-lock.json into bun.lockb
// bun pm migrate

import express from "express";
import path from "path";
import signUpRoute from "../routes/signUp";
import cors from "cors";
import { connectDB } from "../db/connect";
import helmet from "helmet";
import xss from "xss-clean";
import { Pool } from "pg";

// import { google } from 'googleapis';//, youtube_v3 2nd param
const app = express();
const port = process.env.PORT || 3000;

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  // REDIS_URL,
  // REDIS_PORT,
  // REDIS_USER,
  // REDIS_PASSWORD,
  // SESSION_SECRET,
  POSTGRES_USER,
  PSQL_HOST,
  PSQL_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = require("../config/config");

app.use(
  helmet({//this helmet stops any new api, keep an eye on it when adding new ones
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        // Add other CSP directives as needed
        frameSrc: ["'self'", "https://www.youtube.com"],
      },
    },
  })
);
app.enable("trust proxy");
app.use(cors());
app.disable("x-powered-by");
app.use(xss());

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// const YOUTUBE_API_V3 = 'AIzaSyDPDrhysLWuG3DL-509OfgSr_6yDLeOOPY';
// const youtube = google.youtube({
//   version: "v3",
//   auth: YOUTUBE_API_V3,
// });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.use("/api/", signUpRoute);

// const videoRoute = async (req, res) => {
//   const { youtube } = google;
//   const youtubeClient = youtube({
//     version: "v3",
//     auth: YOUTUBE_API_V3,
//   });

//   const videoId = 'Z434ZmDkxzU'; // Extract the video ID from the YouTube URL
//   try {
//     const response = await youtubeClient.videos.list({
//       id: videoId,
//       part: 'snippet',
//     });
//     const video = response.data.items[0];
//     // Construct the video URL
//     const videoUrl = `https://www.youtube.com/embed/${video.id}`;

//     // Create an object with the necessary data
//     const responseData = {
//       videoTitle: video.snippet.title,
//       videoUrl: videoUrl,
//     };

//     // Send the response as JSON
//     res.json(responseData);
//   } catch (error) {
//     console.error('Error retrieving video details:', error);
//     res.status(500).send('Error retrieving video details');
//   }
// };
// app.use('/api/video', videoRoute);
app.get('/video', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/video.html'));
});


const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?
authSource=admin`;

const connectWithRetry = async () => {
  try {
    await connectDB(mongoURL);
    console.log("successfully connected to DB");
  } catch (e) {
    console.log(e);
    setTimeout(connectWithRetry, 5000);
  }
};
connectWithRetry();

const pool = new Pool({
  connectionString: `postgres://${POSTGRES_USER}:${String(POSTGRES_PASSWORD)}@${PSQL_HOST}:${PSQL_PORT}/${POSTGRES_DB}`,
});
const littleQuery = 'SELECT 1 + 2';
app.get('/query', (req, res) => {
  pool.query(littleQuery, (err, result) => {
    if (err) return res.status(500).json({ error: 'Internal error' });
    else return res.json(result.rows[0]);
  });
});

app.listen(port, () => 
  console.log( `Listening on port ${port}...` )
);

// check object define property, in js which is similar to ts annotations