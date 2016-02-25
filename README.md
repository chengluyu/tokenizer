# tokenizer

A JavaScript tokenizer.

The tokenizer takes a pattern object and produces a function that converts string into token stream.

## Usage

To use tokenizer, you need a array containing pattern objects of token. Each pattern object is in following form:

``` json
{
  "name": "integer",
  "pattern": "[+-]?\\d+",
  "ignorable": false
}
```

The `name` field specify the token name. The `pattern` field specify the pattern of token in regular expression. And the optional `ignorable` field specify whether this token is ignorable, or in other word, if the value of `ignorable` is true, it won't appear in the output token stream. The default value of `ignorable` field is `false`.

By following example you will know how to use it.

``` javascript
let Tokenizer = require("tokenizer").Tokenizer;

let tokenizer = new Tokenizer([
  {
    "name": "integer",
    "pattern": "[+-]?\\d+"
  },
  {
    "name": "operator",
    "pattern": "[+-*\\()]"
  },
  {
    "name": "whitespace",
    "pattern": "\\s+",
    "ignorable": true
  }
]);

let advance = tokenizer("1+2 *(3-4)");

while (true) {
  let token = advance();
  console.log(`type = ${token.type} ; value = '${token.value}'`);
  if (token.type === "eof")
    break;
}
```

And you will get the following output:

``` 
type = integer ; value = 1
type = operator ; value = '+'
type = integer ; value = 2
type = operator ; value = '*'
type = operator ; value = '('
type = integer ; value = 3
type = operator ; value = '-'
type = integer ; value = 4
type = operator ; value = ')'
```

