const rest_name = document.getElementById("rest-name");
const footer_name = document.getElementById("footer-name");
const hours_box = document.getElementById("hours-box");
const chef_image = document.getElementById("chef-image")
const footer_image = document.getElementById("footer-image");
const footer = document.getElementById("footer")
const mood_switch = document.getElementById("speakeasy-entrance");
const rest_blurb = document.getElementById("rest-blurb");
const button = document.getElementById("speakeasy-entrance");
const door = document.getElementById("door");
const menu = document.getElementById("menu");
const body = document.getElementById("body");

mode = "chophouse";
door_status = "closed"

chef_image.addEventListener("click", function(){  // Click on chef to open door
    open_door()
})

mood_switch.addEventListener("click", function(){
    changeTitle(mode);
    changeChefImage(mode);
    changeBlurb(mode);
    changeMenu(mode);
    changeFooter();

    if (mode == "chophouse") {
        mode = "dim sum"
        mood_switch.textContent = "Leave"
        body.style.backgroundColor = "rgba(80, 41, 41, 1)"
        body.style.color = "rgba(193, 173, 55, 1)"
        footer.style.backgroundColor = "rgba(101, 26, 26, 1)"
        footer.style.color = "rgba(193, 173, 55, 1)"
    }
    else {
        mode = "chophouse"
        mood_switch.textContent = "Enter..."
        body.style.backgroundColor = "rgba(255, 255, 255, 1)"
        body.style.color = "rgba(0, 0, 0, 1)"
        footer.style.backgroundColor = "rgb(168, 209, 250)"
        footer.style.color = "rgb(19, 50, 20)"
        close_door()
    }
})

function open_door() {
    door_status = "open"
    gsap.to(door, {
        duration: 1,
        rotateY: -120,
        transformOrigin: "left center",
        ease: "power2.inOut",
        backgroundColor: "rgb(186, 185, 185)"
    });
}

function close_door() {
    door_status = "closed"
    gsap.to(door, {
        duration: 1,
        rotateY: 0,
        transformOrigin: "left center",
        ease: "power2.inOut",
        backgroundColor: "rgba(255, 255, 255, 1)"
    });
}


function changeTitle(mode) {
    if (mode == "chophouse")
        rest_name.innerHTML = `<h1 id="rest-name">J. Hollinger's Waterman's Dim Sum Speakeasy Palace</h1>`
    else if (mode == "dim sum")
        rest_name.innerHTML = `<h1 id="rest-name">J. Hollinger's Waterman's Chophouse</h1>`
}

function changeBlurb(mode) {
    if (mode == "chophouse")
        rest_blurb.textContent = "... J. Hollinger's Waterman's Chophouse turns into a bustling dim sum speakeasy bar and lounge filled with highest class of socialites and financiers."
    else if (mode == "dim sum")
        rest_blurb.textContent = "During the Day, a haven for the weary business man looking to get a great meal and an even better drink. But, when the sun sets..."
}

function changeChefImage(mode) {
    if (mode == "chophouse")
        chef_image.src = "dim-chef.jpeg"
    else if (mode == "dim sum")
        chef_image.src = "chop-chef.jpg"
}

function changeMenu(mode) {
    if (mode == "chophouse")
        menu.innerHTML = `<img src="dim-menu.jpg" class="menu">`
    else if (mode == "dim sum")
        menu.innerHTML = `
            <img src="chop-menu-1.png" class="menu">
            <img src="chop-menu-2.png" class="menu">`
}

function changeFooter() {
    footer_name.innerHTML = changeFooterHeader(mode);
    hours_box.innerHTML = changeHours(mode);
    footer_image.src = changeFooterImage(mode);
}

function changeFooterImage(mode) {
    if (mode == "chophouse")
        return "food2.jpg"
    else if (mode == "dim sum")
        return "food1.jpg"

}

function changeFooterHeader(mode) {
    if (mode == "chophouse")
        return `
                <h3 id="footer-name">J. Hollinger's Waterman's Dim Sum Speakeasy Palace</h3>`
    else if (mode == "dim sum")
        return `
                <h3 id="footer-name">J. Hollinger's Waterman's Chophouse</h3>`
}

function changeHours(mode) {
    if (mode == "chophouse")
        return `
                <div class="hours row-flexbox">
                    <div>Monday</div>   
                    <div>Closed</div>
                </div>
                <div class="hours row-flexbox">
                    <div>Tuesday - Saturday</div>   
                    <div>10:00pm - 3:00am</div>
                </div>
                <div class="hours row-flexbox">
                    <div>Sunday</div>   
                    <div>9:00pm - 5:00am</div>
                </div>`
    else if (mode == "dim sum")
        return `
                <div class="hours row-flexbox">
                    <div>Monday</div>   
                    <div>Closed</div>
                </div>
                <div class="hours row-flexbox">
                    <div>Tuesday - Saturday</div>   
                    <div>9:00am - 9:00pm</div>
                </div>
                <div class="hours row-flexbox">
                    <div>Sunday</div>   
                    <div>10:00am - 5:00pm</div>
                </div>`
}
