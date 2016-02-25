"use strict";

(() => {

  let util = require("util");

  function Tokenizer(rules) {

    let patternLiteral = rules.map(x => `(${x})`).join('|');

    function* tokenizer(text) {
      let pattern = new RegExp(patternLiteral, "gm");

      while (true) {
        let index = pattern.lastIndex;

        if (index === text.length) return { type: "eof", index };

        let result = pattern.exec(text);

        if (result === null) return { type: "error", index };

        for (let k = 0; k < rules.length; k++) {
          let value = result[1 + k];
          if (typeof value === "string") {
            var token = {
              name: rules[k].name,
              value,
              index
            };
          }
        }

        if (value === undefined) throw new Error("internal error");

        yield token;
      }
    }

    return text => tokenizer(text).next;

  }

  exports.Tokenizer = Tokenizer;

})();