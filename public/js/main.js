const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");

const datahide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault(); // Prevents Refresh
  let cityVal = cityName.value;

  if (cityVal === "") {
    city_name.innerText = `Please enter the city name before search`;
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=67caf06f8aa4a685739700d095093d8e`;

      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];

      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp.innerHTML = `<p id="temp"><span>${arrData[0].main.temp}</span><sup> o</sup>C</p>`;

      const tempMood = arrData[0].weather[0].main;

      // Conditions to check the weather status
      if (tempMood == "Clear") {
        temp_status.innerHTML =
          '<i class="fa fa-sun" style="color: #eccc68"></i>';
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          '<i class="fa fa-cloud" style="color: #f1f2f6"></i>';
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          '<i class="fa fa-rain" style="color: #a4b0be"></i>';
      } else {
        temp_status.innerHTML =
          '<i class="fa fa-sun" style="color: #f1f2f6"></i>';
      }

      datahide.classList.remove("data_hide");
    } catch {
      city_name.innerHTML = `No such city exists. Please enter a valid city name before search`;
      datahide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);

const getCurrentDay = () => {
  const weekday = new Array(7);

  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentTime = new Date();
  days = weekday[currentTime.getDay()];

  let day = document.getElementById("day");
  day.innerText = days;
};

const getCurrentTime = () => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];

  const now = new Date();
  const month = months[now.getMonth()];
  const date = now.getDate();

  let today_data = document.getElementById("today_data");
  today_data.innerText = `${date} ${month}`;
};

getCurrentDay();
getCurrentTime();
