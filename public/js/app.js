const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.querySelector("#forecast");
const place = document.querySelector("#place");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          forecast.textContent = data.error;
        } else {
          forecast.textContent = `${data.description} feels like ${data.feelslike} temperature ${data.temperature}`;
          place.textContent = data.location;
          console.log(data);
        }
      });
    }
  );
});
