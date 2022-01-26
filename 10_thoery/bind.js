let person1 = {
    name : "Kumar",
    age : 22
}

let showDetails = function(city, state){
    console.log(this.name, this.age, city, state);
}

// let showDetailsBind = showDetails.bind(person1,"Kolkata", "WB");
// showDetailsBind();

Function.prototype.myBind = function(...args){
    let obj = this;
    let location = args.slice(1);
    return function(...args2){
        obj.apply(args[0],[...location, ...args2]);
    }
}

let showDetailsMyBind = showDetails.myBind(person1,'kolkata');
showDetailsMyBind('WB');