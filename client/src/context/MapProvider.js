import { createContext, useContext } from "react";

const MapContext = createContext();

export const useMap = () => {
    return useContext(MapContext);
}

export const MapProvider = ({ map, setMap, children }) => {

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    )

}