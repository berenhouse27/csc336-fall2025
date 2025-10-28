import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("./public"));

app.use(express.json());

console.log("Starting server...");

// GET
app.get("/world", async (req, res) => {
    const dataString = await fs.readFileSync("world.json", "utf-8");
    const dataObject = JSON.parse(dataString);
    res.json(dataObject);
});

// POST
app.post("/update", async (req, res) => {
    const { regionName, townName, newPerson } = req.body;

    const worldData = fs.readFileSync("world.json", "utf-8");
    const world = JSON.parse(worldData);

    const region = world.regions.find(r => r.name === regionName);
    if (!region) return res.status(400).json({ error: "Region not found" });

    const town = region.towns.find(t => t.name === townName);
    if (!town) return res.status(400).json({ error: "Town not found" });

    town.notable_people.push(newPerson);

    town.population = (town.population || 0) + 1;

    fs.writeFileSync("world.json", JSON.stringify(world, null, 2));
    res.json(world);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
