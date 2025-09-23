const partyCap = document.getElementById("party-size");
const charName = document.getElementById("char-name")
const charClass = document.getElementById("char-class");
const randomize = document.getElementById("random");
const submitChar = document.getElementById("submit-char");
const partyMembers = document.getElementById("party-container");
const form = document.querySelector("#character-container form");
const stats = document.querySelectorAll(".stat-input");

var party = [];

form.addEventListener('submit', event => {
    event.preventDefault();
    var characterName = charName.value;
    var characterClass = charClass.value;
    var characterStats = Array.from(stats).map(input => input.value)
    var maxPartySize = Number(partyCap.value) || 5;
    if (characterName == ""){
        alert(`ERROR: Must Enter Character Name`)
        return;
    };
    for (var i=0; i<6; i++){
        var stat = characterStats[i]
        if (stat == ""){
            alert(`ERROR: Must Enter All Stat Values`);
            return;
        };
        if (4 > stat || stat > 24) {
            alert(`ERROR: ${stat} Is Out of Range (4-24)`);
            return;
    };
    if (party.length >= maxPartySize){
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
    party.push(character);

    const newMember = createPartyMember(character);
    partyMembers.innerHTML += newMember;

    form.reset();
});

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

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

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


