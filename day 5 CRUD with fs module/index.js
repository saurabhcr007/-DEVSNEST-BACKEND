var fs=require("fs");
fs.mkdirSync("CRUD folder");
fs.writeFileSync("CRUD folder/hello.txt","jai shree ram");
var test =require("./call");
var obj =new file();
console.log(obj.print())