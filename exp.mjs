import http from "http";
import { Pool } from "./pool.mjs";
const callback_queue = {};

const pool = new Pool(`./mine.mjs`, 2, (response) => {
  if (callback_queue[response.input]) {
    callback_queue[response.input].forEach((cb) => {
      cb(response.result);
    });
    delete callback_queue[response.input];
  }
});

const process = (input, cb) => {
  if (callback_queue[input]) {
    callback_queue[input].push(cb);
  } else {
    callback_queue[input] = [cb];
    pool.assignTask({ input: input });
  }
};

const server = http.createServer(function (req, res) {
  if (req.url == "/mine-coal") {
    const num = parseInt(req.headers.input);

    process(num, (value) => res.end(`${value}\n`));
  } else {
    res.end("Dare to mine coal?");
  }
});

server.listen(8000, () => console.log("running on port 8000"));
