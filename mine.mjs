process.on("message", (msg) => {
  process.send({ input: msg.input, result: fibo(msg.input) });
});

function fibo(n) {
  const returnAt = new Date().getTime() + n * 1000;
  while (true) {
    if (new Date().getTime() > returnAt) {
      return n;
    }
  }
}
