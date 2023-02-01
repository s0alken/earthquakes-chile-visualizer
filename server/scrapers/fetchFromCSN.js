import axios from "axios";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const fetchFromCSN = async (date) => {

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const fullDate = `${year}${month}${day}`;

    const URL = `https://www.sismologia.cl/sismicidad/catalogo/${year}/${month}/${fullDate}.html`;

    const { data } = await axios.get(URL);

    const { document } = (new JSDOM(data)).window;

    const rows = document.querySelectorAll(".detalle tr:not(:first-child)");

    const features = [];

    rows.forEach(row => {
        const tds = row.querySelectorAll('td');

        const feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": tds[2].textContent.split(' ').reverse().map(Number)
            },
            "properties": {
                reference: tds[0].textContent.slice(19),
                localDateTime: tds[0].textContent.slice(0, 19),
                utcDateTime: tds[1].textContent,
                depth: tds[3].textContent,
                magnitude: Number(tds[4].textContent.split(' ')[0]),
                magnitudeType: tds[4].textContent.split(' ')[1],
                url: `https://www.sismologia.cl${tds[0].querySelector("a").href}`
            }
        }

        features.push(feature);

    })

    return { "type": "FeatureCollection", features };
}

export default fetchFromCSN;