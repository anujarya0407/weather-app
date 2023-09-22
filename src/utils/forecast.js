const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f5ea4549d77501aeb34c3f8a0a6428d2&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot Connect", undefined);
    } else if (body.error) {
      callback("Wrong Coordinates", undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.precip,
      });
    }
  });
};

module.exports = forecast;
