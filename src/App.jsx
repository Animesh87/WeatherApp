import React, { useState } from "react";

const api = {
  key: "cf4330f028247fc2e9dbee8941549a69",
  base: "https://api.openweathermap.org/data/2.5/"
};

const MonthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const dayArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday"
];

const day = new Date();

const year = day.getFullYear();
const dayName = day.getDay();
const date = day.getDate();
const month = day.getMonth();

console.log(
  dayArray[dayName] + ", " + MonthArray[month] + " " + date + ", " + year
);

function App() {
  const [query, setQuery] = useState("");
  const [data, updateData] = useState({});

  function search() {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
      .then((res) => res.json())
      .then((result) => updateData(result), setQuery(""));

    console.log(data);
  }

  function handlechange(event) {
    setQuery(event.target.value);
  }

  return (
    <div
      className={
        (typeof data.main === "undefined") || (data.main.temp) < 20
          ? "Full"
          : "Full-warm"
      }
    >
      <div className="box">
        <input
          id="cityInput"
          type="text"
          name="cityName"
          placeholder="Enter city"
          className="input-box"
          onChange={handlechange}
          value={query}
        ></input>
        <i class="fas fa-search" onClick={search}></i>
      </div>
      {typeof data.main !== "undefined" ? (
        <div className="Main">
          <div className="header">
            <div className="c">
              {data.name}, {data.sys.country}
            </div>
            <div className="icon">
              <img
                src={
                  "https://openweathermap.org/img/wn/" +
                  data.weather[0].icon +
                  "@2x.png"
                }
                alt="img"
              />
            </div>
          </div>
          <div className="weather-box">
            <div className="country">
              {dayArray[dayName] +
                ", " +
                MonthArray[month] +
                " " +
                date +
                ", " +
                year}
            </div>
            <div className="temp">{Math.floor(data.main.temp)}°c</div>
            <div className="desc">{data.weather[0].main}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
