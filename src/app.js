import express from "express";
import request from "request-promise";
import {
  citiesCoordinates,
  BASE_WEATHER_URL,
  BASE_BUSINESS_URL,
} from "./latLonCities.js";

const app = express();

const getPromiseWeather = (latitude, longitude) => {
  const options = {
    url:
      BASE_WEATHER_URL +
      "/data/2.5/forecast?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      process.env.OPEN_WEATHER_KEY,
    method: "GET",
    rejectUnauthorized: false,
    json: true,
  };
  return request(options);
};

const getPromiseBusiness = (name) => {
  const options = {
    url: BASE_BUSINESS_URL + "/v3/businesses/search?location=" + name,
    method: "GET",
    rejectUnauthorized: false,
    headers: {
      Authorization: "Bearer " + process.env.YEPL_KEY,
    },
    json: true,
  };
  return request(options);
};

//returns the list of weather information for each city
const getListWeather = async (citiesCoordinates) => {
  let listPromiseWeather = Object.values(citiesCoordinates).map((c) =>
    getPromiseWeather(c.latitude, c.longitude)
  );
  const listWeatherResult = await Promise.all(listPromiseWeather);
  const listWeather = listWeatherResult.map((l) => l.list);
  return listWeather;
};

//returns information about the businesses for each city
const getListBusiness = async (citiesCoordinates) => {
  let listPromiseBusiness = Object.keys(citiesCoordinates).map((c) =>
    getPromiseBusiness(c)
  );
  const listBusinessResult = await Promise.all(listPromiseBusiness);
  const listBusiness = listBusinessResult.map((l) => l.businesses);
  return listBusiness;
};

app.get("/cities/weather-and-businesses", async (req, res) => {
  try {
    const finalObject = {};
    Object.keys(citiesCoordinates).forEach((property) => {
      finalObject[property] = { weather: [], business: [] };
    });

    //once all the weather and business information are gathered it's
    //possible to store them in the finalObject
    const listWeather = await getListWeather(citiesCoordinates);
    const listBusiness = await getListBusiness(citiesCoordinates);

    //for each city we set the weather and the business information
    //in the finalObject that will be sent
    Object.keys(finalObject).forEach((key, index) => {
      finalObject[key].weather = listWeather[index];
      finalObject[key].business = listBusiness[index];
    });

    res.status(200).send(finalObject);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error has occurred");
  }
});

export default app;
