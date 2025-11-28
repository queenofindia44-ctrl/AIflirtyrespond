const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const generateReplyRouter = require("./routes/generateReply");
app.use("/api/generate-reply", generateReplyRouter);

app.get("/", (req, res) => {
  res.send("Flirty Response AI Backend running with Groq");
});

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
