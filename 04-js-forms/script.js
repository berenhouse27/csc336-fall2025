const partyCap = document.getElementById("party-size");     // Max # of party members
const charName = document.getElementById("char-name")       // Character name input box
const charClass = document.getElementById("char-class");    // Charcater class input box
const randomize = document.getElementById("random");        // Randomize stat button
const submitChar = document.getElementById("submit-char");  // Submit button
const partyMembers = document.getElementById("party-container");    // Container for party members
const form = document.querySelector("#character-container form");   // Form containing character info
const stats = document.querySelectorAll(".stat-input");             // Collection of stat input fields

var party = [];     // Array of party members

// Submit Character
form.addEventListener('submit', event => {
    event.preventDefault();
    var characterName = charName.value;
    var characterClass = charClass.value;
    var characterStats = Array.from(stats).map(input => input.value)
    var maxPartySize = Number(partyCap.value) || 5; // Default party limit of 5
    if (characterName == ""){                       // Name must be filled out
        alert(`ERROR: Must Enter Character Name`)
        return;
    };
    for (var i=0; i<6; i++){                       
        var stat = characterStats[i]
        if (stat == ""){                            // All Stat values must be filled out
            alert(`ERROR: Must Enter All Stat Values`);
            return;
        };
        if (4 > stat || stat > 24) {                // All Stat values must be between 4-24 (4d6 dice)
            alert(`ERROR: ${stat} Is Out of Range (4-24)`); 
            return;
    };
    if (party.length >= maxPartySize){             // Cannot add members beyond party limit
        alert(`ERROR: Maximum Party Size Reached`)
        return;
    };
    };
    var character = {
        name: characterName,
        class: characterClass,
        str: characterStats[0],
        dex: characterStats[1],
        con: characterStats[2],
        int: characterStats[3],
        wis: characterStats[4],
        cha: characterStats[5]
    };
    party.push(character); // Add member to party list
    displayPartyMembers(party)
    form.reset();
});

// Stat Randomizer Button
randomize.addEventListener("click", function() {   
    var statValues = [];
    for (var i=0; i<6; i++){
        var stat = 0;
        for (var roll=0; roll<4; roll++) {
            var dieRoll = getRandomInt(1,6);
            stat += dieRoll;
        };
        statValues.push(stat);
    };
    for (var i=0; i < 6; i++){
        stats[i].value = statValues[i];
    };
});

// Generate random num within range 
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Traverse party list, displaying all members
function displayPartyMembers(party){
    partyMembers.innerHTML = "";
    for (var i=0; i<party.length; i++){
        const partyMember = party[i];
        const memberHTML = createPartyMember(partyMember);
        partyMembers.innerHTML += memberHTML;
    }
}

// Format HTML for new member
function createPartyMember(character){
    return `
    <div class="party-member">
        <span class="entry-name"><b>${character.name}:</b> </span>
        <span class="entry-class">${character.class}</span>
        <div class="stat-container">
            <div class="label">
                <label for="str">STR</label>
                <div name="str">${character.str}</div>
            </div>
            <div class="label">
                <label for="dex">DEX</label>
                <div name="dex">${character.dex}</div>
            </div>
            <div class="label">
                <label for="con">CON</label>
                <div name="con">${character.con}</div>
            </div>
            <div class="label">
                <label for="int">INT</label>
                <div name="int">${character.int}</div>
            </div>
            <div class="label">
                <label for="wis">WIS</label>
                <div name="wis">${character.wis}</div>
            </div>
            <div class="label">
                <label for="cha">CHA</label>
                <div name="cha">${character.cha}</div>
            </div>
        </div>
    </div>

    `;
};


