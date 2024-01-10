import { fork } from "child_process";
export class Pool {
  constructor(file, size, cb) {
    this.workers = [];
    this.maxSize = size;
    this.waitingTasks = [];
    this.activeWorkers = [];

    for (let i = 0; i < size; i++) {
      const worker = fork(file);
      this.workers.push(worker);
      worker.on("message", (response) => {
        cb(response);
        this.releaseWorker(worker);
      });
    }
  }

  assignTask(task) {
    if (this.workers.length > 0) {
      // has available workers
      const worker = this.workers.shift();
      //   this.activeWorkers.push(worker);
      worker.send(task);
    } else {
      this.waitingTasks.push(task);
    }
  }

  releaseWorker(worker) {
    this.workers.push(worker);
    if (this.waitingTasks.length > 0) {
      const task = this.waitingTasks.shift();
      this.assignTask(task);
    }
  }
}
