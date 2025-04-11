const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
require("dotenv").config();

connectDb(); // Connect to MongoDB
const app = express();
const port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the Express server!",
//   });
// });

app.use(express.json());
app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Middleware to handle errors
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
