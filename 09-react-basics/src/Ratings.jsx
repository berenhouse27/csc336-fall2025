import keyData from "../keys/key.json";

const API_KEY = keyData.key;
const ACCESS_TOKEN = keyData.readAccess;
const API_LINK = "https://api.themoviedb.org/3/";

function Ratings() {
    async function getIMDB(imdbID) {
        const response = await fetch(`${API_LINK}find/${imdbID}?api_key=${API_KEY}&external_source=imdb_id`)

        const jsonData = await response.json()

        return jsonData
    }
}
