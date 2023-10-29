import path from "path";
// import express from "express";
// const app = express();

const mainPage =  (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
}
const registerPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
}
const videoPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/video.html'));
}

export {
  mainPage,
  registerPage,
  videoPage,
};