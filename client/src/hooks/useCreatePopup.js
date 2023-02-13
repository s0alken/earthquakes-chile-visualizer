import { useMap } from "../context/MapProvider";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

function useCreatePopup() {

    const { map } = useMap();

    return feature => {
        const popUps = document.getElementsByClassName('mapboxgl-popup');

        if (popUps[0]) popUps[0].remove();

        const { properties: { reference, depth }, geometry: { coordinates } } = feature;

        const popupHTML = `
        <h1 class="mapboxgl-popup-content__heading">${reference}</h1>
        <div class="mapboxgl-popup-content__body">
        <span>Profundidad: ${depth}</span>
        <span>Latitud: ${coordinates[1]}</span>
        <span>Longitud: ${coordinates[0]}</span>
        </div>`;

        const options = {
            closeOnClick: true,
            maxWidth: 'none',
            closeButton: false
        }

        return new mapboxgl.Popup(options)
            .setLngLat(coordinates)
            .setHTML(popupHTML)
            .addTo(map)
    }
}

export default useCreatePopup;