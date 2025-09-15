const cards = document.querySelectorAll(".card");
const button = document.querySelector(".button");
const textbox = document.querySelector(".textbox");
const output = document.getElementById("output");
const encodeSwitch = document.getElementById("encode");
const decodeSwitch = document.getElementById("decode");
const encodeHist = document.getElementById("encodeHist");
const decodeHist = document.getElementById("decodeHist");
const timeSwitch = document.getElementById("timeSwitch");
var dayTime = false;

timeSwitch.addEventListener("click", function() {
    if (dayTime){
        document.body.style.backgroundColor = "antiquewhite";
        document.body.style.color = "rgb(33,33,33)";
        cards.forEach(card=>card.style.backgroundColor = "rgb(160, 205, 166)");
        timeSwitch.textContent= "Dark Mode"
        dayTime=false;
    }
    else{
        document.body.style.backgroundColor = "rgb(33,33,33)";
        document.body.style.color = "antiquewhite";
        cards.forEach(card=>card.style.backgroundColor = "rgb(92, 42, 42)");
        timeSwitch.textContent = "Light Mode"
        dayTime=true;
    }
})
encodeSwitch.addEventListener("click", function() {
    textbox.value = "";
    button.textContent = "Encode";
    textbox.placeholder = "Enter Message To Encode";
})
decodeSwitch.addEventListener("click", function() {
    textbox.value = "";
    button.textContent = "Decode";
    textbox.placeholder = "Enter Code to Decode";
})
button.addEventListener("click", function() {
    const text = textbox.value;
    const arrow = "\u2192"
    if (text.length < 1)
        return;
    if (checkSelector()){
        const encodedText = encodeText(text);
        output.textContent = encodedText;
        let newHistory = document.createElement("p");
        newHistory.textContent = text + arrow + encodedText;
        encodeHist.insertBefore(newHistory, encodeHist.children[1] || null);
    }
    else {
        const numbers = text.trim().split(/\s+/).map(Number);
        const decodedText = decodeText(numbers);
        output.textContent = decodedText;
        const newHistory = document.createElement("p");
        newHistory.textContent = text +' '+ arrow +' '+ decodedText;
        decodeHist.insertBefore(newHistory, decodeHist.children[1] || null);
    }
})

function checkSelector(){
    return encodeSwitch.checked
}
function encodeText(text){
    var encodedText = [];
    for (let i=0; i < text.length; i++){
        const letter=text[i];
        const encodedLetter = letter.charCodeAt(0) + (i+1);
        encodedText.push(encodedLetter);
    }
    return encodedText.join(" ");
}
function decodeText(encodedText){
    var decodedText = "";
    for(let i=0; i < encodedText.length; i++){
        const encodedLetter = encodedText[i];
        const decodedLetter = String.fromCharCode(encodedLetter - (i + 1));
        decodedText = decodedText + decodedLetter;
    }
    return decodedText;
}