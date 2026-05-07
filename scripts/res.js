const firstnum = require('./firstnum.js');
const operator = require('./operator.js');
const secondnum = require('./secondnum.js');
const res = require('./switch.js');
const chalk = require("chalk");

function showresult(res) {
  


if (operator === "+" ) {
console.log(chalk.green(`${firstnum} ${operator} ${secondnum} = ${res}`));
}
else if (operator === "-" ) {
console.log(chalk.red(`${firstnum} ${operator} ${secondnum} = ${res}`));
}
else if (operator === "*" ) {
console.log(chalk.yellow(`${firstnum} ${operator} ${secondnum} = ${res}`));
}
else if (operator === "/" ) {
console.log(chalk.blue(`${firstnum} ${operator} ${secondnum} = ${res}`));
}
 

}
module.exports = showresult