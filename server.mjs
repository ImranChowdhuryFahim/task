import cluster from "cluster";
import os from "os";

import express from "express";

const numCPUs = os.cpus().length;
const workers = [];

if (cluster.isPrimary) {
  for (let i = 0; i < 3; i++) {
    workers.push(cluster.fork());
  }
} else {
  const app = express();
  app.get("/slow", (req, res, next) => {
    let count = 0;
    for (let i = 0; i < 1000000000000000; i++) {
      count++;
    }
    res.send({ message: "slow" });
  });

  app.get("/fast", (req, res, next) => {
    setTimeout(() => {
      res.send({ message: "fast" });
    }, 100);
  });
  app.listen(8080, () => console.log("server running...."));
}
