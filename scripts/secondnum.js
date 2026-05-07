const prompt = require("prompt-sync")();

var valsecondnum = prompt("secondnum : ");
while ( valsecondnum == NaN || valsecondnum == undefined || valsecondnum == null || valsecondnum == ""){
    console.log("invalid input")
     var valsecondnum = prompt("secondnum : ");
     
}
const secondnum = Number(valsecondnum);

module.exports = secondnum;
