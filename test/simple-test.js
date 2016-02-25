"use strict";

let rules = [
  {
    "name": "identifier",
    "pattern": "[a-zA-Z_]\\w*",
    "ignorable": false
  },
  {
    "name": "operator",
    "pattern": /[+\-\*]/,
    "ignorable": false // default to false
  },
  {
    "name": "integer",
    "pattern": "-?\\d+"
  },
  {
    "name": "whitespace",
    "pattern": "\\s+",
    "ignorable": true
  }
];

let Tokenizer = require("../").Tokenizer, util = require("util");

let tokenizer = new Tokenizer(rules);

let lex = tokenizer("123+456-abc");

while (true) {
  let obj = lex.next();
  console.log(util.inspect(obj.value));
  if (obj.done) break;
}