let cp = require("child_process");
console.log("Trying to open calculator");
cp.execSync("calc");
console.log("opened calculator");

console.log("Trying to open vs code");
cp.execSync("code");
console.log("opened vs code");

