const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//const d = new Date();
//let todayNum = d.getDay();
let todayNum = 1;

window.addEventListener("DOMContentLoaded", async () => {
  const { data } = await axios.get("/data.json");
  const allWeather = data.consolidated_weather;
  for (let i = 0; i < allWeather.length; i++) {
    const dayNum = todayNum + i;
    const dayName = weekdays[dayNum];
    const w = allWeather[i];

    const dayDiv = document.createElement("div");
    dayDiv.id = `day${i}`;
    dayDiv.classList.add("card");
    dayDiv.setAttribute("onclick", "window.open('https://www.metaweather.com/', '_blank')");

    const dayNameDiv = document.createElement("div");
    dayNameDiv.id = `day${i}_dayName`;
    dayNameDiv.classList.add("dayName");
    dayNameDiv.appendChild(document.createTextNode(dayName));

    const dayImg = document.createElement("img");
    dayImg.id = `day${i}_img`;
    dayImg.src = `/icons/${w.weather_state_abbr}.svg`;
    dayImg.classList.add("weatherImage");

    const dayTempsDiv = document.createElement("div");
    dayTempsDiv.id = `day${i}_temps`;
    dayTempsDiv.classList.add("temps");

    const dayLowDiv = document.createElement("div");
    dayLowDiv.id = `day${i}_low`;
    dayLowDiv.classList.add("temperatureLow");
    dayLowDiv.appendChild(document.createTextNode(w.min_temp.toFixed(1)));

    const dayHighDiv = document.createElement("div");
    dayHighDiv.id = `day${i}_high`;
    dayHighDiv.classList.add("temperatureHigh");
    dayHighDiv.appendChild(document.createTextNode(w.max_temp.toFixed(1)));

    dayDiv.appendChild(dayNameDiv);
    dayDiv.appendChild(dayImg);
    dayTempsDiv.appendChild(dayLowDiv);
    dayTempsDiv.appendChild(dayHighDiv);
    dayDiv.appendChild(dayTempsDiv);
    document.getElementById("weatherCards").appendChild(dayDiv);
  }
});
