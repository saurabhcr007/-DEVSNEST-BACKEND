const fs = require("fs");
fs.mkdirSync("foldername");
// Final argument is unnecessary if you do not want to handle errors
// Most functions accept a callback which is called in case of errors
fs.writeFileSync("name", "content", (e) => console.log(e));
fs.appendFileSync("name", "content");
fs.readFileSync("name"); // Returns Buffer<>
fs.readFileSync("name", "encoding"); // Decodes buffer into string (use "utf-8")
fs.renameSync("old", "new");
fs.unlinkSync("filename"); // Delete (can also use rmSync)
fs.rmdirSync("foldername"); // Delete folder
// .exit to exit repl