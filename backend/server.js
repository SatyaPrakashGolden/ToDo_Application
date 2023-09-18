const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const useRout=require('./routes/userRoute.js')
const cors=require("cors");
app.use(cors());
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(useRout);
