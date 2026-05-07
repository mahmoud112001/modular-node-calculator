const prompt = require('prompt-sync')();

var valfirstnum = prompt("enter first num ")


while ( valfirstnum == NaN || valfirstnum == undefined || valfirstnum == null || valfirstnum == ""){
    console.log("invalid input")
var valfirstnum = prompt("enter first num ")
}

const firstnum = Number(valfirstnum);

module.exports = firstnum ;

