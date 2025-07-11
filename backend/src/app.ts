import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import hashRouter from "./routes/hash";
import randomRouter from "./routes/random";
import diffRouter from "./routes/diff";
import minifyRouter from "./routes/minify";
import cronRouter from "./routes/cron";
import caseConvertRouter from "./routes/case-convert";
import numberConvertRouter from "./routes/number-convert";
import stringUtilsRouter from "./routes/string-utils";
import textEncodeRouter from "./routes/text-encode";
import colorConvertRouter from "./routes/color-convert";
import timestampRouter from "./routes/timestamp";
import markdownRouter from "./routes/markdown";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hash", hashRouter);
app.use("/api/random", randomRouter);
app.use("/api/diff", diffRouter);
app.use("/api/minify", minifyRouter);
app.use("/api/cron", cronRouter);
app.use("/api/case-convert", caseConvertRouter);
app.use("/api/number-convert", numberConvertRouter);
app.use("/api/string-utils", stringUtilsRouter);
app.use("/api/text-encode", textEncodeRouter);
app.use("/api/color-convert", colorConvertRouter);
app.use("/api/timestamp", timestampRouter);
app.use("/api/markdown", markdownRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
});

export default app;
