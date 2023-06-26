
//fetch api 
let x = 0;
let y = 1;
async function fetchApi() {
    
    try {
        let res = await fetch("https://restcountries.com/v3.1/all");
        let JsonFormat = await res.json();

        for (let i = 0; i < JsonFormat.length; i++) {
            let CountryName = JsonFormat[i].name.common;
            let countrycapital = JsonFormat[i].capital[x];
            let countryflagimage = JsonFormat[i].flags.png;
            let countryregion = JsonFormat[i].region;
            let countrycode = JsonFormat[i].cca3;
            let latitude = JsonFormat[i].latlng[x];
            let longitude = JsonFormat[i].latlng[y];
            
            if (latitude == undefined || longitude == undefined) {
                throw new Error(`invalid:unable to read the data`);
            }
            

            div_row.innerHTML += `
      <div class="col-lg-4">
      <div class="card-group">
      <div class="card" class="card border-dark mb-3" style="width: 18rem;">
      <div class="card-header card-title">${CountryName}</div>
      <img src="${countryflagimage}" id="flag-img" class="card-img-top" alt="CountryName:,${CountryName}" />
      <div class="card-body">
        <h5 class="card-title ">CAPITAL : ${countrycapital}</h5>
        <h5 class="card-title ">REGION : ${countryregion}</h5>
        <h5 class="card-title "> COUNTRYCODE : ${countrycode}</h5>
        <button type="button" id="temp-btn" class="btn btn-secondary" onclick=openWeather(${latitude},${longitude})>Click for weather</button>
     
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      `;
        }
    } catch (error) {

        console.log(error.message);
    }
}



async function openWeather(latitude, longitude) {
    try {
        let res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b9d07e8d66a7c9c78d47685619746207`
        );
        let result = await res.json();
        let ans = result.main.temp;
        let ans2 = document.getElementById("footer");
        ans2.innerHTML = "";
        ans2.innerHTML = `COUNTRY-WEATHER ⏩${ans}⏪`;
    } catch (error) {
        console.log(error.message);
    }


}

fetchApi();

let div_container = document.createElement("div");
div_container.setAttribute("class", "container");
let div_head = document.createElement("div");
div_head.setAttribute("class", "heading");
div_head.innerHTML = "COUNTRIES - DATA";
let heading = document.createElement("h1");
heading.setAttribute("class", "text-center")
heading.innerHTML = "Weather Report";
//var card = document.querySelector('div.row div.col-sm-6.col-md-4.col-lg-4.col-xl-4 div.card');


let div_row = document.createElement("div");
div_row.setAttribute("class", "row");

document.body.append(div_container);
div_container.append(heading,div_row);

