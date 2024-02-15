import { useEffect, useState } from "react";

function App() {
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });

      if (lat.length === 0 && lat.length === 0) return;

      await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }forecast?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_APP_ID
        }&cnt=${import.meta.env.VITE_NO_OF_TIMESTAMPS}&units=metric`
      ).then((data) =>
        data.json().then((result) => {
          setData(result);
        })
      );
    };

    fetchData();
  }, [lat, lon]);

  return (
    <>
      <h2 className="mt-3 mb-5 text-3xl font-bold text-center text-white">
        {data.city ? data.city.name : ""}
      </h2>
      <div className="flex flex-wrap items-start content-start justify-center gap-3 card-wrapper">
        {data.list
          ? data.list.map((item, index) => <Card data={item} key={index} />)
          : "Loading..."}
      </div>
    </>
  );
}

function Card({ data }) {
  return (
    <div className="px-5 py-3 text-black bg-white rounded">
      <h6>📅{data.dt_txt}</h6>
      <p>Temperature: {Math.round(data.main.temp)}°C</p>
      <p>Weather: {data.weather[0].description}</p>
      <p>Wind speed: {data.wind.speed} mph</p>
    </div>
  );
}

export default App;
