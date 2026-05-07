const firstnum = require('./firstnum.js');
const operator = require('./operator.js');
const secondnum = require('./secondnum.js');
const add = require('./add.js');
const sub = require('./sub.js');
const mul = require('./mul.js');
const div = require('./div.js');

switch (operator) {
    case "+":
        var res = add(firstnum, secondnum)
console.log( res ) 
        break;
        
    case "-":
var res =sub(firstnum, secondnum)
        console.log(res) 
        break;
        
    case "*":
        var res = mul(firstnum, secondnum)
        console.log(res) 
        break;
        
    case "/":
        
        if (secondnum == 0) {
            console.log("cannot divide by zero");
            break;
        }
        var res = div(firstnum, secondnum)
        console.log(res) 
        break;
        
    default: throw new Error(`Unknown operator: ${operator}`);
        break;
}


module.exports = res