
// --ARROW FUNCTIONS--
const button = document.getElementById("myButton");
// Generic Function
function buttonClicked(e){
    console.log("Button Pressed");
    console.log(e);
    console.log(this); // "this" refers to the button in this context
};
button.addEventListener("click", buttonClicked);
// Example Arrow Function
button.addEventListener("click", (e)=>{ 
    console.log("Button Pressed");
    console.log(e);
    console.log(this); // "this" refers to the entire window in this context
});
/*
Both buttonClicked() and the code in the second event listener will run when the button is clicked
Outputs will be the same, but "this" will be diffirent due to what is calling the function
*/

// --CLASSES--
class Person{
    // Initialization
    constructor(name) {
        this.name = name;
    }
    // Method
    printName() {
        console.log(`Hello, my name is ${this.name}`);
    }
    repeatName(timesRepeated) {
        for (var i=0; i<timesRepeated; i++){
            this.printName();
        }
    }
}
// Instantiating an object from a class
var mike = new Person("Mike");
// Calling methods
console.log(mike);
mike.repeatName(12);

// --LOCAL STORAGE--
// Store a key/value pair that persists even after a page refresh, but keys/values must be strings
console.log(localStorage.getItem("key"));
localStorage.setItem("key", "storedValue");
// Console will show "null" first, but "mike" after refreshing once

// --JAVASCRIPT OBJECT NOTATION (JSON)--
let stringVersion = JSON.stringify(mike); // Turns an object into a string
localStorage.setItem("mike",stringVersion);   // This allows you to store objects between as strings with localStorage
console.log(localStorage.getItem("mike"));
let mikeObject = JSON.parse(localStorage.getItem("mike"));
console.log(mikeObject)
console.log(mikeObject.name);  // Will print "Mike" even after refreshes

// --CANVAS--
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
let x = 100
let y = 100
// Draw filled rectangle
function draw(){
    ctx.fillStyle = "rgba(56, 109, 163, 1)";
    ctx.fillRect(x,y,10,25);
}
