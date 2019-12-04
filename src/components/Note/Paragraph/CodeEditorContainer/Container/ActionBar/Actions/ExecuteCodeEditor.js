export default function ExecuteCodeEditor (reporter, code) {
  if (reporter) {
    reporter.code = code;
    const executor = reporter.getCommandFunction();
    if (executor) {
      executor();
    } else {
      console.error("cannot found executor");
    }
  }
};

