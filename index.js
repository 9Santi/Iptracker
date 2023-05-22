var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

document.addEventListener("submit", searchIP);

function searchIP(event) {
  event.preventDefault();
  const ipInput = document.querySelector("#ipInput").value;
  const ipUrl = `http://ip-api.com/json/${ipInput}`;
  fetch(ipUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showData(data);
    })

    .catch((error) => {
      console.error(error);
    });
}

function showData(data) {
  const ipValue = data.query;
  const locValue = data.city;
  const timValue = data.timezone;
  const ispValue = data.isp;
  const latValue = data.lat;
  const lonValue = data.lon;
  document.querySelector("#IP").textContent = ipValue;
  document.querySelector("#Location").textContent = locValue;
  document.querySelector("#Timezone").textContent = timValue;
  document.querySelector("#ISP").textContent = ispValue;

  L.marker([latValue, lonValue])
    .addTo(map)
    .bindPopup("You are <br> here!")
    .openPopup();
}
