
import { parse } from "csv-parse/parse";

const sheet_id = "11XhA5zlgcSNtbhrCKjInq330YgjbAxXrl41rbtzc8Yw"
const sheet_url = `https://docs.google.com/spreadsheets/d/${sheet_id}/export?format=csv`

async function fetchAndParseSheet() {
    try {
        const res = await fetch(sheet_url);
        const text = await res.text();

        let lines = text.split('\n');
        let headers = lines[0].split(',');
        
        const data = lines.slice(1).map(line => {
            const values = line.trim().split(",");
            return Object.fromEntries(headers.map((h, i) => [h, values[i]]))
        })
        console.log(data)
    } catch {

    }
}
fetchAndParseSheet();