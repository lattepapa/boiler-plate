const express = require("express");
const app = express();
const port = 5000;

// MongoDB 연결
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://devbaek:gonz0m2n@cluster0.ennpa.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log(`MongoDB is connected..`))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Express server is listening on port ${port}`)
);
