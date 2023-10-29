//  we need to transpile files served to front-end tsc => js

import path from "path";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import { Pool } from "pg";
// import figlet from "figlet";// for ascii art
import express from "express";
const app = express();
// import { google } from 'googleapis';//, youtube_v3 2nd param
import { connectDB } from "../db/connect";
// import authenticateUser from "../middleware/authentication";


// const authRouter = require("./routes/auth");
// const jobsRouter = require("./routes/jobs");
import signUpRoute from "../routes/signUp";
import frontAPIs from "../routes/front-routers";
// error handler
import  notFoundMiddleware from '../middleware/not-found';
import  errorHandlerMiddleware from '../middleware/error-handler';


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
        scriptSrc: ["'self'", "http://bun:3000"],
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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// const YOUTUBE_API_V3 = 'AIzaSyDPDrhysLWuG3DL-509OfgSr_6yDLeOOPY';
// const youtube = google.youtube({
//   version: "v3",
//   auth: YOUTUBE_API_V3,
// });

app.use("/", frontAPIs);
app.use("/api/", signUpRoute);

// from 6.5 John
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
// app.get('/video', );


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

const port = process.env.PORT || 3000;
app.listen(port, () => 
  console.log( `Listening on port ${port}...` )
);

// check object define property, in js which is similar to ts annotations