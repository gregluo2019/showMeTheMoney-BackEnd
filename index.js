import express from "express";
import https from "https";
import http from "http";

const app = express();
app.use(express.json());

const apiHost = "http://localhost:3000";
const apiPath = "/api.xro/2.0/Reports/BalanceSheet";

app.get("/api/balance", (req, res) => {
  http
    .get(`${apiHost}${apiPath}`, (externalRes) => {
      let data = "";

      externalRes.on("data", (chunk) => {
        data += chunk;
      });

      externalRes.on("end", () => {
        try {
          const parsedData = JSON.parse(data);
          console.log("parsedData", parsedData);

          res.status(200).json(parsedData);
        } catch (error) {
          res.status(500).json({ message: "Parsing data failed" });
        }
      });
    })
    .on("error", (err) => {
      res.status(500).json({
        message: "Fetching data failed",
        error: err.message,
      });
    });
});

app.listen(3001, () => {
  console.log(`Listening on port 3001`);
});
