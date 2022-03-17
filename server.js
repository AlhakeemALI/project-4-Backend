const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;
connectDB();
const fs = require("fs");
const { errorHandler } = require("./middleware/errorMiddleware");
// APP USE
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);
app.use(errorHandler);
//app.use("/Api", auth);

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
