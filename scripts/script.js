/*
Calculator:

1. Create Node.js Project.
2. Main function accepts two values and an operator.
3. Output the result of the operation after performing it.
4. Make your code as modular as possible.
5. Use chalk package to output each operation with a different color.

Bonus: Accept parameters of the operation from the command that runs the project. */

const firstnum = require('./firstnum.js');
const operator = require('./operator.js');
const secondnum = require('./secondnum.js');
const res = require('./switch.js');
const add = require('./add.js');
const sub = require('./sub.js');
const mul = require('./mul.js');
const div = require('./div.js');
const chalk = require("chalk");
const showresult = require('./res.js');

showresult(res);

