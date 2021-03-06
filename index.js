"use strict";

(() => {

  let util = require("util");

  function Tokenizer(rules) {

    if (!util.isArray(rules)) throw new Error("invaild argument");

    let patternLiteral = rules.map(x => {
      x = x.pattern;
      if (util.isRegExp(x)) return `(${x.source})`;
      return `(${x})`
    }).join('|');

    return function* tokenizer(text) {
      let pattern = new RegExp(patternLiteral, "gm"); console.log(util.inspect(patternLiteral));

      parse: while (true) {
        let index = pattern.lastIndex;

        if (index === text.length) return { type: "eof", index };

        let result = pattern.exec(text);

        if (result === null) return { type: "error", index };

        for (let k = 0; k < rules.length; k++) {
          let value = result[1 + k];
          if (typeof value === "string") {

            if (index + value.length !== pattern.lastIndex)
              return { type: "error", index };

            if (rules[k].ignorable) continue parse;

            var token = {
              type: rules[k].name,
              value,
              index
            };
          }
        }

        if (token === undefined) throw new Error("internal error");

        yield token;
      }
    };

  }

  exports.Tokenizer = Tokenizer;

})();