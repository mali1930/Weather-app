import axios from "axios";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./style.css";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=c508a4dbd8953f10db186f119e1497c3`;

  const searchLocation = (event) => {
    setLoading(true);
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setLoading(false);
      });
      setLocation("");
    }
  };

  return (
    <div className="img flex flex-col justify-between">
      <div className="text-white  md:text-4xl text-2xl px-2">
        <div className="flex  justify-center mt-8 text-white">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
            className="p-2 text-lg w-[390px] bg-gray-500 opacity-70 border-2 rounded-full text-white"
          />
        </div>
        {loading ? (
          <h1 className="flex justify-center items-center h-screen">
            <AiOutlineLoading3Quarters size={65} />
            
          </h1>
        ) : (
          <div className="flex justify-center px-20">
            <div className="flex flex-col gap-10 mt-20 ">
              <div>
                <h1 className="font-bold mt-10 mb-3 md:text-7xl text-4xl tracking-[2px]">
                  {data?.name}
                </h1>
              </div>
              <div>
                <h1 className="md:text-6xl text-center text-4xl ">
                  {data?.main ? <p> {data?.main?.temp.toFixed()} °F</p> : null}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end -mt-28 text-white ">
        <h1 className="-rotate-90 text-xl tracking-[1px] ">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </h1>
      </div>
      {data?.name !== undefined && (
        <div className="flex justify-center">
          <div className="flex text-center md:gap-24  gap-10 flex-wrap justify-center bg-black  p-10  max-w-4xl rounded-lg opacity-50 font-bold text-white  ">
            <div>
              {data?.main?.feels_like.toFixed()} °F
              <p>Feels Like</p>
            </div>
            <div>
              {data?.main?.humidity}%<p>Humidity</p>
            </div>
            <div>
              {data?.wind?.speed.toFixed()} MPH
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
