export default function ExecuteCodeEditor (reporter, code) {
  if (reporter) {
    reporter.code = code;
    reporter.getCommandFunction().then(executor => {
      if (executor) {
        executor();
      } else {
        console.error("cannot found executor");
      }
    });
  }
};

