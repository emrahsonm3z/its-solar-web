import React from "react";
import QueueAnim from "rc-queue-anim";
import moment from "moment";

import Form from "./components/Form";
import Weather from "./components/Weather";
// import DayLight from "./components/DayLight";

import { OPENWEATHERMAP_API_KEY } from "config/env";

import WeatherStatus from "./components/WeatherStatus";

// import {
//   ThunderStorm
//   // Rain,
//   // BrokenClouds,
//   // ClearSky,
//   // FewClouds,
//   // ScatteredClouds,
//   // ShowerRain,
//   // Snow,
//   // Mist
// } from "./icon";

import "./style.scss";

const LocationList = [
  {
    id: 1,
    name: "Salihli",
    lat: "38.61",
    lon: "28.25"
  },
  {
    id: 2,
    name: "Sivrihisar",
    lat: "39.63",
    lon: "31.74"
  },
  {
    id: 3,
    name: "Atkaracalar",
    lat: "40.86",
    lon: "33.09"
  },
  {
    id: 4,
    name: "Kurşunlu",
    lat: "40.82",
    lon: "33.25"
  },
  {
    id: 5,
    name: "Polatlı",
    lat: "39.38",
    lon: "32.12"
  },
  {
    id: 6,
    name: "Kulu",
    lat: "38.25",
    lon: "32.70"
  }
];

class WeatherMap extends React.Component {
  state = {
    location: "",
    city: undefined,
    country: undefined,
    dt: undefined,
    temperature: undefined,
    humidity: undefined,
    clouds: undefined,
    description: undefined,
    type: undefined,
    sunrise: undefined,
    sunset: undefined,
    windSpeed: undefined,
    windDeg: undefined,
    error: undefined
  };
  getWeather = async e => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;
    const locationId = parseInt(e.target.elements.locationSelect.value);
    let location = "";
    switch (locationId) {
      case 1:
        location = "Salihli, Manisa, TR";
        city = "Salihli";
        country = "tr";
        break;
      case 2:
        location = "Sivrihisar, Eskişehir, TR";
        city = "Sivrihisar";
        country = "tr";
        break;
      case 3:
        location = "Atkaracalar, Çankırı, TR";
        city = "Atkaracalar";
        country = "tr";
        break;
      case 4:
        location = "Kurşunlu, Çankırı, TR";
        city = "Kurşunlu";
        country = "tr";
        break;
      case 5:
        location = "Polatlı, Ankara, TR";
        city = "Polatlı";
        country = "tr";
        break;
      case 6:
        location = "Kulu, Konya, TR";
        city = "Kulu";
        country = "tr";
        break;

      default:
        location = "";
        break;
    }

    // const data = {};
    let api_call;

    if (location === "") {
      api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${OPENWEATHERMAP_API_KEY}&units=metric&lang=tr`
      );
    } else {
      const loc = LocationList.filter(x => x.id === locationId)[0];
      api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${
          loc.lon
        }&appid=${OPENWEATHERMAP_API_KEY}&units=metric&lang=tr`
      );
    }

    const data = await api_call.json();
    console.log(data);
    // debugger;
    /**
     * city: data.name
     * country: data.sys.country
     * clouds.all   bulut yoğunlupu %
     * dt  Data receiving time UTC
     * main.humidity  new  %
     * main.temp   C
     * sys.sunrise  dt UTC
     * sys.sunset  dt UTC
     * weather[0].description
     * weather[0].icon   (01d/01n) day/night
     * 01 - clear sky
     * 02 -	few clouds
     * 03 -	scattered clouds
     * 04 -	broken clouds
     * 09 - shower rain
     * 10 -	rain
     * 11 -	thunderstorm
     * 13 -	snow
     * 50 -	mist
     * wind.speed  meter/sec
     * wind.deg degrees
     */
    if (city && country) {
      this.setState({
        location: location || `${city},${country}`,
        city: data.name,
        country: data.sys.country,
        recevingTime: moment.unix(data.dt),
        temperature: `${data.main.temp} °C`,
        humidity: `%${data.main.humidity}`,
        clouds: `%${data.clouds.all}`,
        description: data.weather[0].description,
        type: data.weather[0].icon.slice(0, 2),
        sunrise: moment.unix(data.sys.sunrise).format("HH:mm"),
        sunset: moment.unix(data.sys.sunset).format("HH:mm"),
        windSpeed: `${data.wind.speed} m/s`,
        error: ""
      });

      console.log(this.state);
    } else {
      this.setState({
        location: "",
        city: undefined,
        country: undefined,
        dt: undefined,
        temperature: undefined,
        humidity: undefined,
        clouds: undefined,
        description: undefined,
        type: undefined,
        sunrise: undefined,
        sunset: undefined,
        windSpeed: undefined,
        error: "Please enter the values."
      });
    }
  };

  render() {
    return (
      <div className="container-fluid p-0">
        <QueueAnim type="bottom" className="ui-animate">
          {this.state.location !== "" && (
            <section className="cover weather py-4">
              <div className="container-fluid">
                <div className="row">
                  <div className="weather__block">
                    <div className="weather__title">
                      <div className="weather__icon">
                        <WeatherStatus statusId={this.state.type} />
                      </div>
                      <span className="weather__item weather--location">
                        {this.state.location}
                      </span>
                      {/* <span className="weather__item weather--location">
                        {this.state.city}, {this.state.country}
                      </span> */}
                    </div>
                    <div className="weather__body">
                      {/* <div className="weather__body-item">
                        <div className="weather__description">
                          <div className="weather__icon">
                            <WeatherStatus statusId={this.state.type} />
                          </div>
                          <span>{this.state.description}</span>
                        </div>
                        <div className="weather__item">
                          <span>Güneş doğuş/batış</span>
                          <span>:</span>
                          <span>
                            {this.state.sunrise}-{this.state.sunset}
                          </span>
                        </div>
                        <div className="weather__item">
                          <span>Bulut yoğunluğu</span>
                          <span>:</span>
                          <span>{this.state.clouds}</span>
                        </div>
                        <div className="weather__item">
                          <span>Sıcaklık</span>
                          <span>:</span>
                          <span>{this.state.temperature}</span>
                        </div>
                        <div className="weather__item">
                          <span>Nem</span>
                          <span>:</span>
                          <span>{this.state.humidity}</span>
                        </div>
                        <div className="weather__item">
                          <span>Rüzgar</span>
                          <span>:</span>
                          <span>{this.state.windSpeed}</span>
                        </div>
                      </div> */}

                      <div className="contenedor">
                        <ul>
                          {/* <li>
                            <div className="weather__description">
                              <div className="weather__icon">
                                <WeatherStatus statusId={this.state.type} />
                              </div>
                              <span>{this.state.description}</span>
                            </div>
                          </li> */}
                          <li>
                            <span>Hava durumu</span>
                            <span>:</span>
                            <span>{this.state.description}</span>
                          </li>
                          <li>
                            <span>Gündoğumu</span>
                            <span>:</span>
                            <span>
                              {this.state.sunrise} / {this.state.sunset}
                            </span>
                          </li>
                          <li>
                            <span>Bulut yoğunluğu</span>
                            <span>:</span>
                            <span>{this.state.clouds}</span>
                          </li>
                          <li>
                            <span>Sıcaklık</span>
                            <span>:</span>
                            <span>{this.state.temperature}</span>
                          </li>
                          <li>
                            <span>Nem</span>
                            <span>:</span>
                            <span>{this.state.humidity}</span>
                          </li>
                          <li>
                            <span>Rüzgar</span>
                            <span>:</span>
                            <span>{this.state.windSpeed}</span>
                          </li>
                        </ul>
                      </div>

                      {/* <div className="weather__body-item">
                        <div className="weather__daylight">
                          <DayLight
                            sunrise={this.state.sunrise}
                            sunset={this.state.sunset}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <article className="row blog-card-list-v1 border-0 mdc-elevation--z1 mb-4">
            <div className="blog-card__body col-lg-7">
              <Weather
                temperature={this.state.temperature}
                humidity={this.state.humidity}
                city={this.state.city}
                country={this.state.country}
                description={this.state.description}
                type={this.state.type}
                error={this.state.error}
              />
            </div>

            <div className="blog-card__body col-lg-5">
              <Form getWeather={this.getWeather} />
            </div>
          </article>
        </QueueAnim>
      </div>
    );
  }
}

export default WeatherMap;
