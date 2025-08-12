const express = require("express");
import applicationsRouter from "./routes/applicationsRoutes";
import statusRouter from "./routes/statusRoutes";
import cors from "cors";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/applications", applicationsRouter);
app.use("/api/status", statusRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
