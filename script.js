const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");
const creatureName = document.querySelector("#creature-name");
const creatureId = document.querySelector("#creature-id");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const types = document.querySelector("#types");
const specialName = document.querySelector("#special-name");
const specialDescription = document.querySelector("#special-description");

const hp = document.querySelector("#hp");
const attack = document.querySelector("#attack");
const defense = document.querySelector("#defense");
const specialAttack = document.querySelector("#special-attack");
const specialDefense = document.querySelector("#special-defense");
const speed = document.querySelector("#speed");

const fetchData = async () => {
    try {
        const creature = searchInput.value.toLowerCase();
        await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creature}`)
            .then((res) => res.json())
            .then((data) => {
                /*card*/
                const nameValue = data.name;
                const idValue = data.id;
                const weightValue = data.weight;
                const heightValue = data.height;
                const specialNameValue = data.special.name;
                const specialDescriptionValue = data.special.description;
                /*set values */
                creatureName.innerText = nameValue.toUpperCase();
                weight.innerText = `Weight: ${weightValue}`;
                height.innerText = `Height: ${heightValue}`;
                creatureId.innerText = `#${idValue}`;
                types.innerHTML = data.types
                    .map(obj => `<span class="type ${obj.name}">${obj.name}</span>`)
                    .join('');

                /*stats*/
                const hpValue = data.stats[0].base_stat;
                const attackValue = data.stats[1].base_stat;
                const defenseValue = data.stats[2].base_stat;
                const specialAttackValue = data.stats[3].base_stat;
                const specialDefenseValue = data.stats[4].base_stat;
                const speedValue = data.stats[5].base_stat;
                /*text */
                specialDescription.innerText = specialDescriptionValue;
                specialName.innerText = specialNameValue;

                hp.innerText = `${hpValue}`;
                attack.innerText = attackValue;
                defense.innerText = defenseValue;
                specialAttack.innerText = specialAttackValue;
                specialDefense.innerText = specialDefenseValue;
                speed.innerText = speedValue;
            });
    } catch (err) {
        emptyAll();
        alert("Creature not found");
        console.log(`Creature not found: ${err}`);
    }
}

function emptyAll() {
    searchInput.value = "";
    creatureName.innerText = "";
    creatureId.innerText = "";
    weight.innerText = "";
    height.innerText = "";
    types.innerHTML = "";
    hp.innerText = "";
    attack.innerText = "";
    defense.innerText = "";
    specialAttack.innerText = "";
    specialDefense.innerText = "";
    speed.innerText = "";
    specialDescription.innerText = "";
    specialName.innerText = ""
}

searchBtn.addEventListener("click", () => {
    fetchData();
});
