const fs = require("fs");
const path = require("path");
const importNote = require("../../Tasks/NotebookManager/Actions/Note/Import");

module.exports = async () => {
  const tutorials = [
    "01-hello-mercury.mcr",
    "02-try-write-javascript-code.mcr",
    "03-try-make-web-app.mcr",
    "04-npm-module-with-backend-libraries.mcr"
  ].reverse();

  for (let tutorialFileName of tutorials) {
    const filePath = path.join(`${__dirname}`, `Notes/${tutorialFileName}`);
    const noteRaw = fs.readFileSync(filePath, { encoding: "utf8" });
    const note = JSON.parse(noteRaw);
    await importNote(note);
  }
};
