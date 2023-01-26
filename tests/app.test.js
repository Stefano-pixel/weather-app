import app from "../src/app.js";
import supertest from "supertest";
import tap from "tap";
import nock from "nock";
import mockCitiesCoordinates from "../mocks/mockLatLonCities.js";
import { BASE_BUSINESS_URL, BASE_WEATHER_URL } from "../src/latLonCities.js";
import deepEqual from "deep-equal";

tap.beforeEach((t) => {
  // Intercept the requests and
  // define the expected request and the mock response
  Object.values(mockCitiesCoordinates).forEach((city) => {
    nock(BASE_WEATHER_URL)
      .get("/data/2.5/forecast")
      .query({
        lat: city.latitude,
        lon: city.longitude,
        appid: process.env.OPEN_WEATHER_KEY,
      })
      .reply(200, city.weatherInfoExpected)
      .persist();
  });
  Object.keys(mockCitiesCoordinates).forEach((city) => {
    nock(BASE_BUSINESS_URL)
      .get("/v3/businesses/search")
      .query({
        location: city,
      })
      .reply(200, mockCitiesCoordinates[city].businessInfoExpected)
      .persist();
  });
});

tap.afterEach((t) => {
  nock.cleanAll();
});

tap.test("Test weather and business for each city", async (t) => {
  const response = await supertest(app)
    .get("/cities/weather-and-businesses")
    .expect("Content-Type", /json/)
    .expect(200);

  const keysResponse = Object.keys(response.body);
  const keysMock = Object.keys(mockCitiesCoordinates);
  const checkKeys =
    keysResponse.length == keysMock.length && deepEqual(keysResponse, keysMock);

  //compares the values returned with the value in the mock
  const checkValuesOfKeys = keysResponse.some((key) => {
    const checkAllWeather = deepEqual(
      response.body[key].weather,
      mockCitiesCoordinates[key].weatherInfoExpected.list
    );
    const checkAllBusiness = deepEqual(
      response.body[key].business,
      mockCitiesCoordinates[key].businessInfoExpected.businesses
    );
    return checkAllBusiness && checkAllWeather;
  });

  t.equal(checkKeys, true);
  t.equal(checkValuesOfKeys, true);
});
