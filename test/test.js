"use strict";

let Tokenizer = require("../").Tokenizer
  , fs = require("fs")
  , colors = require("colors")
  , path = require("path")
  ;

const RULE_DIR = "./test/rule/"
    , CASE_DIR = "./test/case/"
    , INPUT_DIR = "./test/input/"
    , OUTPUT_DIR = "./test/output/"
    ;

fs.readdirSync(RULE_DIR).forEach(f => {
  // For Your Information:
  // path.parse("~/dir/dir/file.txt")
  // { root: '',
  // dir: '~/dir/dir',
  // base: 'file.txt',
  // ext: '.txt',
  // name: 'file' }
  let filename = path.parse(f);

});