import * as fs from 'fs';

const data = fs.readFileSync('./world.json', 'utf-8');
const world = JSON.parse(data);

// Men of Arlen
console.log("Men of Arlen:");
world.regions.forEach(region => {
  region.towns.forEach(town => {
    console.log(town.name + ':')
    town.notable_people.forEach(person => {
        if (person.gender == 'male') {
            console.log(`   ${person.name} (${person.role})`)
            person.items.forEach( item => {
                if (typeof item === "object") {
                    console.log('         -' + item.name)
                    const attributes = Object.entries(item)
                    for (const entry of attributes){
                        if (entry[0] != 'name')
                            console.log('             ' + entry[0] + ': ' + entry[1])
                    }
                }
                else
                    console.log('         -' + item)
            })
        }
        })
    })
})

console.log('')

// Women of Arlen
console.log("Women of Arlen:");
world.regions.forEach(region => {
  region.towns.forEach(town => {
    console.log(town.name + ':')
    town.notable_people.forEach(person => {
        if (person.gender == 'female') {
            console.log(`   ${person.name} (${person.role})`)
            person.items.forEach( item => {
                if (typeof item === "object") {
                    console.log('         -' + item.name)
                    const attributes = Object.entries(item)
                    for (const entry of attributes){
                        if (entry[0] != 'name')
                            console.log('             ' + entry[0] + ': ' + entry[1])
                    }
                }
                else
                    console.log('         -' + item)
            })
        }
        })
    })
})