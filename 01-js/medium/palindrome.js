/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str
    .toLowerCase()
    .split(/[.!?, \s]/)
    .join("");
  for (
    let i = 0, j = str.length - 1;
    i < str.length / 2, j > (str.length - 1) / 2;
    i++, j--
  ) {
    if (!(str[i] === str[j])) return false;
  }
  return true;
}

module.exports = isPalindrome;

// https://bobbyhadz.com/blog/javascript-split-string-by-regex -reference of the regex in split method
