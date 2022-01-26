function car(brand, model, color){
    this.Brand = brand; 
    this.Model = model; 
    this.Color = color; 

    this.drive = function(){
        console.log("I am driving " + this.Model);
    }
}

let car1 = new car('BMW', 'X5', 'red');
let car2 = new car('Mercedes', 'S Class', 'black');

// car1.Brand = 'Tata';
// console.log(car1);
// console.log(car2);
car1.drive();