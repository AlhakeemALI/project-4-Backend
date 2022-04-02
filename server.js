const express = require("express");
const app = express();
const path = require("path");
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
app.use(express.static(path.join(__dirname, "uplodads")));

app.use("/api/users", require("./routes/usersRouts"));
//app.use("/api", require("./routes/stripe"));
app.use("/api", require("./routes/home"));
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use(errorHandler);
//app.use("/Api", auth);

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
