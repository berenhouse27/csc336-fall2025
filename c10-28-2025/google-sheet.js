
const sheet_id = "11XhA5zlgcSNtbhrCKjInq330YgjbAxXrl41rbtzc8Yw"
const sheet_url = `https://docs.google.com/spreadsheets/d/${sheet_id}/export?format=csv`

async function getInfo(url) {
    if (url.charAt(url.length - 1) === '/') {
        url = url.slice(0, url.length - 1);
    }
    let promise = await fetch(`${url}/world`);
    let response = await promise.json();
    return response
}

async function fetchAndParseSheet() {
    try {
        const res = await fetch(sheet_url);
        const text = await res.text();

        let lines = text.split('\n');
        let headers = lines[0].split(',');
        let entries = []
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            let newEntry = line.split(',');
            let newStudent = {}
            for (let j = 0; j < newEntry.length; j++) {
                newStudent[headers[j].trim()] = entries[j];
            }
            entries.push(newStudent)
        }
        for (student of entries) {
            if (student["render"] !== "") {
                let response = await getInfo(student["render"]);
                let worldJSON = await response.json()
                console.log(worldJSON);
            }
        }
    } catch {

    }
}
fetchAndParseSheet();