const button = document.getElementById("load-button");

const cities = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Chicago", lat: 41.8781, lon: -87.6298 },
  { name: "Houston", lat: 29.7604, lon: -95.3698 },
  { name: "Phoenix", lat: 33.4484, lon: -112.074 },
  { name: "Philadelphia", lat: 39.9526, lon: -75.1652 },
  { name: "San Antonio", lat: 29.4241, lon: -98.4936 },
  { name: "San Diego", lat: 32.7157, lon: -117.1611 },
  { name: "Dallas", lat: 32.7767, lon: -96.797 },
  { name: "San Jose", lat: 37.3382, lon: -121.8863 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Madrid", lat: 40.4168, lon: -3.7038 },
  { name: "Rome", lat: 41.9028, lon: 12.4964 },
  { name: "Moscow", lat: 55.7558, lon: 37.6173 },
  { name: "Beijing", lat: 39.9042, lon: 116.4074 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Seoul", lat: 37.5665, lon: 126.978 },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Melbourne", lat: -37.8136, lon: 144.9631 },
  { name: "Brisbane", lat: -27.4698, lon: 153.0251 },
  { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
  { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
  { name: "Lima", lat: -12.0464, lon: -77.0428 },
  { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
  { name: "Toronto", lat: 43.6532, lon: -79.3832 },
  { name: "Vancouver", lat: 49.2827, lon: -123.1207 },
  { name: "Montreal", lat: 45.5017, lon: -73.5673 },
  { name: "Dubai", lat: 25.276987, lon: 55.296249 },
  { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Johannesburg", lat: -26.2041, lon: 28.0473 },
  { name: "Nairobi", lat: -1.2921, lon: 36.8219 },
  { name: "Karachi", lat: 24.8607, lon: 67.0011 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Delhi", lat: 28.7041, lon: 77.1025 },
  { name: "Kuala Lumpur", lat: 3.139, lon: 101.6869 },
  { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
  { name: "Manila", lat: 14.5995, lon: 120.9842 },
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
  { name: "Shanghai", lat: 31.2304, lon: 121.4737 },
  { name: "Barcelona", lat: 41.3851, lon: 2.1734 },
  { name: "Lisbon", lat: 38.7169, lon: -9.139 },
  { name: "Athens", lat: 37.9838, lon: 23.7275 },
  { name: "Warsaw", lat: 52.2297, lon: 21.0122 },
  { name: "Prague", lat: 50.0755, lon: 14.4378 },
  { name: "Budapest", lat: 47.4979, lon: 19.0402 },
  { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
  { name: "Oslo", lat: 59.9139, lon: 10.7522 },
  { name: "Helsinki", lat: 60.1695, lon: 24.9354 },
  { name: "Copenhagen", lat: 55.6761, lon: 12.5683 },
  { name: "Reykjavik", lat: 64.1355, lon: -21.8954 }
];

button.addEventListener("click", fetchCityData);

async function fetchCityData() {
  const city = cities[Math.floor(Math.random() * cities.length)];

    // Wikepedia API
    let imageUrl = "";
    const wikiRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(city.name)}&prop=pageimages&format=json&pithumbsize=600&origin=*`
    );
    const wikiData = await wikiRes.json();
    const pages = wikiData.query.pages;
    const page = Object.values(pages)[0];
    imageUrl = page && page.thumbnail ? page.thumbnail.source : "";

  // Open-Meteo API
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
  );
  const weatherData = await weatherRes.json();
  const weatherDesc = weatherData.current_weather ? `Temp: ${weatherData.current_weather.temperature} \u00B0C, Wind: ${weatherData.current_weather.windspeed} km/h` : "N/A";

  document.getElementById("output").innerHTML = `
    <h2>${city.name}</h2>
    <p>${weatherDesc}</p>
    <img src="${imageUrl}" alt="Image of ${city.name}">
  `;
}
