/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // str1 = str1.toLowerCase()
  // str2 = str2.toLowerCase()
  // if (str1.length != str2.length) return false;
  // let str_obj1 = {},
  //   str_obj2 = {};
  // for (let i = 0; i < str1.length; i++) {
  //   if (str_obj1.hasOwnProperty(str1[i])) {
  //     str_obj1[str1[i]] += 1;
  //   } else {
  //     str_obj1[str1[i]] = 1;
  //   }
  //   if (str_obj2.hasOwnProperty(str2[i])) {
  //     str_obj2[str2[i]] += 1;
  //   } else {
  //     str_obj2[str2[i]] = 1;
  //   }
  // }
  // const key1 = Object.keys(str_obj1);
  // const key2 = Object.keys(str_obj2);
  // for (const key of key1) {
  //   if (str_obj1[key] !== str_obj2[key]) return false;
  // }

  // optimized way
  let sortedStr1 = str1.toLowerCase().trim().split("").sort().join("");
  let sortedStr2 = str2.toLowerCase().trim().split("").sort().join("");

  return sortedStr1 === sortedStr2;
}
module.exports = isAnagram;
