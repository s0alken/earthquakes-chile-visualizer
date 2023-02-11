import { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useMap } from '../context/MapProvider';
import usePulsingDot from '../hooks/usePulsingDot';
import useFlyToCoordinates from '../hooks/useFlyToCoordinates';
import useCreatePopup from '../hooks/useCreatePopup';
import smoothScrollIntoView from 'scroll-into-view-if-needed'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map({ data, setIsActive }) {
    const mapContainer = useRef(null);
    const { map, setMap } = useMap();

    const pulsingDot = usePulsingDot();
    const flytoCoordinates = useFlyToCoordinates();
    const createPopup = useCreatePopup();

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/s0alken/clccfip7z005415qs2xbiakcf',
            center: data.features.length ? data.features[0].geometry.coordinates : [-70.673676, -33.447487],
            zoom: 7,
            pitch: 40,
            bearing: -40
        });

        map.addControl(new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true
        }));

        const handleWindowResize = () => {
            const menu = document.querySelector('.menu');

            const padding = window.innerWidth >= 992 ?
                { left: menu.offsetWidth * .6, bottom: 0 } :
                { bottom: menu.offsetHeight * .6, left: 0 };

            map.easeTo({ padding });
        }

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);

        setMap(map);

        return () => {
            map.remove();
            window.removeEventListener('resize', handleWindowResize);
        };

    }, [data, setMap]);

    useEffect(() => {
        if (!map) return;

        map.on('load', () => {
            map.addSource('places', {
                type: 'geojson',
                data
            });

            map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

            map.addLayer({
                'id': 'pulsing-dot-layer',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': 'pulsing-dot',
                    'icon-pitch-alignment': 'map',
                    'icon-allow-overlap': true
                }
            });

            if (data.features.length) {
                setIsActive(data.features[0]);
                createPopup(data.features[0]);
            };
    
        });

        map.on('mouseenter', 'pulsing-dot-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'pulsing-dot-layer', () => {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', (event) => {
            const features = map.queryRenderedFeatures(event.point, {
                layers: ['pulsing-dot-layer']
            });

            if (!features.length) return;

            const clickedPoint = features[0];

            const item = document.getElementById(clickedPoint.properties.id);

            smoothScrollIntoView(item, {
                scrollMode: 'if-needed',
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
                boundary: document.querySelector('.timeline')
            })

            flytoCoordinates(clickedPoint);
            createPopup(clickedPoint);
            setIsActive(clickedPoint);

        });

    }, [data, map, pulsingDot, flytoCoordinates, createPopup, setIsActive])

    return (
        <div ref={mapContainer} className="map" />
    );
}

export default Map;