async function loadWorld() {
    const res = await fetch("/world");
    const data = await res.json();
    const worldDiv = document.getElementById("world-container");
    worldDiv.innerHTML = "";

   // Loop through regions
    data.regions.forEach(region => {
        const regionDiv = document.createElement("div");
        regionDiv.innerHTML = `<h2>${region.name} (Climate: ${region.climate})</h2>`;
        
        // Loop through towns
        region.towns.forEach(town => {
            const townDiv = document.createElement("div");
            townDiv.style.marginLeft = "20px"; 
            townDiv.innerHTML = `<h3>${town.name} (Population: ${town.population})</h3>`;
            
            // Loop through notable people
            town.notable_people.forEach(person => {
                const personDiv = document.createElement("div");
                personDiv.style.marginLeft = "20px"; 
                personDiv.innerHTML = `<strong>${person.name} (${person.gender || "N/A"})</strong> - ${person.role || "No role"}`;

                if (Array.isArray(person.items) && person.items.length > 0) {
                    const itemsUl = document.createElement("ul");
                    itemsUl.style.marginLeft = "20px"; 
                    person.items.forEach(item => {
                        const li = document.createElement("li");
                        if (typeof item === "object") {
                            li.textContent = item.name || JSON.stringify(item);
                        } else {
                            li.textContent = item;
                        }
                        itemsUl.appendChild(li);
                    });
                    personDiv.appendChild(itemsUl);
                }

                townDiv.appendChild(personDiv);
            });
            regionDiv.appendChild(townDiv);
        });
        worldDiv.appendChild(regionDiv);
    });
    populateTownSelect(data);
}

function populateTownSelect(worldData) {
    const townSelect = document.querySelector("#town-select");
    if (!townSelect) return;

    townSelect.innerHTML = "<option value=''>Select Town</option>";

    worldData.regions.forEach(region => {
        region.towns.forEach(town => {
            const opt = document.createElement("option");
            opt.value = `${region.name}||${town.name}`; 
            opt.textContent = `${town.name} (${region.name})`;
            townSelect.appendChild(opt);
        });
    });
}

loadWorld();

const addItemButton = document.querySelector("#add-item");
const itemsDiv = document.querySelector("#items");

addItemButton.addEventListener("click", e => {
    e.preventDefault();

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "items";
    newInput.placeholder = "Enter Item";
    newInput.style.display = "block"; 
    newInput.style.marginTop = "5px"; 

    itemsDiv.appendChild(newInput);
});

const personForm = document.querySelector("#person-form");

personForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(personForm);
    const personObj = Object.fromEntries(formData.entries());
    personObj.items = formData.getAll("items").filter(i => i.trim() !== "");    

    const [regionName, townName] = personObj.town.split("||");
    delete personObj.town;

    const res = await fetch("/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regionName, townName, newPerson: personObj })
    });

    const updatedWorld = await res.json();
    loadWorld();

    personForm.reset();

    const itemsDiv = document.querySelector("#items");
    itemsDiv.innerHTML = `<input type="text" name="items" placeholder="Enter Item">`;
});