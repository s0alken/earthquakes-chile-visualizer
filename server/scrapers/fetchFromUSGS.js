import axios from 'axios';

const convertUTCDateToLocalDate = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}

const formatDate = (date) => {
    return date.toISOString().slice(0, 19).split('T').join(' ');
}

const fetchFromUSGS = async (date) => {
    
    const newDate = new Date(date);
    
    newDate.setDate(date.getDate() - 1);

    const [starttime] = formatDate(newDate).split(' ');
    const [endtime] = formatDate(date).split(' ');

    const URL = `https://earthquake.usgs.gov/fdsnws/event/1/query`;

    const { data: { features } } = await axios.get(URL, {
        params: {
            'format': 'geojson',
            starttime,
            endtime
        }
    });

    let filtered = features.filter(f => f.properties.place?.includes('Chile'));

    filtered = filtered.map(f => {
        const {
            place: reference,
            time,
            mag: magnitude,
            magType: magnitudeType,
            url
        } = f.properties;

        const depth = f.geometry.coordinates.pop();

        const dateTime = new Date(time);

        const localDateTime = formatDate(convertUTCDateToLocalDate(dateTime));
        const utcDateTime = formatDate(dateTime);

        const properties = {
            reference: reference.replace(', Chile', ''),
            localDateTime,
            utcDateTime,
            depth: `${Math.trunc(depth)} km`,
            magnitude,
            magnitudeType,
            url
        };

        const feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": f.geometry.coordinates
            },
            properties
        }

        return feature;
    })

    return { "type": "FeatureCollection", "features": filtered };

}

export default fetchFromUSGS;