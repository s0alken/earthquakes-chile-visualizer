import { useState, useEffect } from 'react';
import api from '../api';
import Map from './Map';
import Menu from './Menu';
import LoadingScreen from './LoadingScreen';
import { MapProvider } from '../context/MapProvider';

function App() {

  const [map, setMap] = useState();
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSource, setSelectedSource] = useState('csn');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);

      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();

      const formattedDate = `${year}-${month}-${day}`;

      const response = await api.get('/',
        {
          params: {
            date: formattedDate,
            source: selectedSource
          }
        });

      setData(response.data);
      setIsLoading(false);

    }

    fetchData();
  }, [selectedDate, selectedSource]);

  return (
    !data ? <LoadingScreen /> :
      <MapProvider map={map} setMap={setMap}>
        <Map data={data} />
        <Menu
          data={data}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </MapProvider>
  )
}

export default App;
