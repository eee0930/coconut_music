import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./song/models/Song";
import "./song/models/Youtube";

import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
