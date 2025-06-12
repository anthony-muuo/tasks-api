import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
