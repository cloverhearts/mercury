const Database = require("../../Database/UserDatabase");
const fixedUser = "Anonymous";
let db = null;
module.exports = async () => {
  if (!db) {
    db = await Database();
  }
  if (!db) {
    console.error(`Error: unknown database, Note List`);
    return `Error: unknown database, Note List`;
  }
  try {
    const note = await db.get(`${fixedUser}.meta.order.notes`).value();
    return note;
  } catch (error) {
    console.log("ERROR ", error);
    return error;
  }
};
