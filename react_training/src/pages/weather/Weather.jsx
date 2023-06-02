import React, { useState, useEffect } from "react";
import ButtonField from "../../components/buttons/ButtonField";
import InputFields from "../../components/input/InputFields";
import Navbar from "../../components/navbar/Navbar";
import WeatherApi from "../../services/api/weatherService";
import styles from "./Weather.module.scss";

function Weather() {
  const getWeatherApi = new WeatherApi();
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [locationCoords, setLocationCoords] = useState({});
  const [fetch, setFetch] = useState(false);
  const [defaultWeatherInfo, setDefaultWeatherInfo] = useState({});

  const getWeatherData = () => {
    getWeatherApi
      .getDefaultWeatherDetails({
        q: search,
        appid: "f281c88825fc95be5f3fa2d092876bcc",
      })
      .then((response) => setWeather(response));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLocationCoords(position.coords);
        setFetch(true);
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (fetch) {
      getWeatherApi
        .getDefaultWeatherDetails({
          lat: locationCoords.latitude,
          lon: locationCoords.longitude,
          appid: "f281c88825fc95be5f3fa2d092876bcc",
          units: "metric",
        })
        .then((response) => setDefaultWeatherInfo(response));
    }
  }, [fetch]);

  return (
    <div>
      <section>
        <Navbar text="WEATHER APP" />

        {typeof defaultWeatherInfo.main !== "undefined" ? (
          <div>
            <p>Your Current Location Weather Info Below </p>
            <div>
              <p>Country : {defaultWeatherInfo.sys.country}</p>
              <p>Temperature : {defaultWeatherInfo.main.temp}</p>
              <p>
                Coordinates : Longitude - {defaultWeatherInfo.coord.lon}{" "}
                {" &  "}
                Latitude - {defaultWeatherInfo.coord.lat}
              </p>
              <p> Name : {defaultWeatherInfo.name}</p>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={styles.weather__search}>
          <InputFields
            name="cityName"
            type={"text"}
            placeholder="Enter your city name"
            onChange={(e) => setSearch(e.target.value)}
          />

          <ButtonField
            buttonText="Search"
            type="button"
            onClick={getWeatherData}
          />
        </div>

        {typeof weather.main !== "undefined" ? (
          <div className={styles.weather__body}>
            <p> - Your Location : {weather.name} </p>

            <p>
              - Your Temperature : {weather.main.temp} <sup>o</sup> c
            </p>

            <div>
              - Condition summary Below
              <p> * {weather.weather[0].main} </p>
              <p> * {weather.weather[0].description} </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default Weather;
