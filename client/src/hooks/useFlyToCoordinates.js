import { useMap } from "../context/MapProvider";

function useFlyToCoordinates() {
    const { map } = useMap();

    return feature => {
        map.flyTo({
            center: feature.geometry.coordinates,
            zoom: 8
        });
    }
}

export default useFlyToCoordinates;