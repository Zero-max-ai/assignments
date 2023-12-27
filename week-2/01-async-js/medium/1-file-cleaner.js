// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require("fs");

const fileReader = (fileLoc) => {
  fs.readFile(fileLoc, "utf-8", function (err, data) {
    if (err) console.log(err.stack);
    console.log(data);
    fileCleaner(fileLoc, data);
  });
};

const fileCleaner = (fileLoc, data) => {
  const dat = data.replace(/\s+/g, " ");
  fs.writeFile(fileLoc, dat, "utf-8", function (data, err) {
    if (err) console.log(err.stack);
    console.log("file updated");
  });
};

fileReader("./1-dummy.md");
