const fs = require("fs");
const new_data = "file content updated by- Zero-max-ai";

// writing the file may cause the overwrite problem so for that i append the file.
// writeFile function work same as appendFile
// to run the writeFile just change the appendFile to writeFile as a function.

function readMyFile() {
  fs.readFile("4-write-to-file.md", "utf-8", function (err, data) {
    if (err) console.log(err.stack);
    console.log(data);
  });
}

readMyFile();

fs.appendFile("4-write-to-file.md", new_data, "utf-8", function (err, data) {
  if (err) console.log(err.stack);
  console.log("file is updated now!");
  readMyFile();
});
