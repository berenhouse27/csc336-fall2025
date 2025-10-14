import * as fs from 'fs';

const data = fs.readFileSync('./world.json', 'utf-8');
const world = JSON.parse(data);

console.log("Notable people:");

world.regions.forEach(region => {
  region.towns.forEach(town => {
    town["notable people"].forEach(person => {
      console.log(person.name);
    });
  });
});
