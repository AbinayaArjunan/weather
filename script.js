
//fetch api 
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => console.log(data))



//refrence html tag element
let Container = document.createElement("div");
Container.className = "container  bg-gradient d-flex justify-content-center align-items-center"
document.body.appendChild(Container);


let Row = document.createElement("div");
Row.className = "row col d-flex justify-content-center align-items-center"
Row.id = "row"
Container.appendChild(Row);

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        data.forEach((data, index) => {

            function datafilter(data) {
                if (data === undefined) {
                    return "Data Not available"
                } else {
                    return data[0];
                }
            }
            function idfilter(data) {
                if (data === undefined) {
                    return "Data Not available"
                } else {
                    return data
                }
            }
            function suffixidfilter(data) {
                if (data === undefined) {
                    return "";
                } else {
                    return data[0];
                }
            }
            let Name = data.name.common;
            let flag = data.flags.png;
            let CapitalName = datafilter(data.capital);
            let RegionName = data.region
            let CountryCode =data.cca3   
            let latlng = data.latlng;
            let latitude = latlng[0];
            let longitude = latlng[1];


            let Row = document.querySelector("#row");
            let ColTag = document.createElement("div");
            ColTag.className = "col-lg-4 col-sm-12  p-2 text-center d-flex justify-content-center align-items-center"
            Row.appendChild(ColTag);

            let Card = document.createElement("div");
            Card.className = "card";
            Card.style.width = "18rem"
            ColTag.appendChild(Card);

            let CardHeader = document.createElement("div");
            CardHeader.className = "card-header bg-dark text-white  d-flex justify-content-center align-items-center"
            CardHeader.textContent = Name;

            let CardBody = document.createElement("div");
            CardBody.className = "card-body bg-secondary bg-gradient text-white "
            let Image = document.createElement("img");
            Image.className = "card-body"
            Image.src = `${flag}`
            Image.alt = "flag"
            Image.style.width = "15rem"
            Image.style.height = "8rem"

            let Para1 = document.createElement("p");
            Para1.innerText = `Capital : ${CapitalName}`;

            let Para2 = document.createElement("p");
            Para2.innerText = `Region : ${RegionName}`

            let Para3 = document.createElement("p");
            Para3.innerText = `Country Code : ${CountryCode}`



            let Button = document.createElement("button");
            Button.className = "btn btn-primary text-center"
            Button.innerText = "Click for Weather"
            let Id = `${index}`
            Button.setAttribute("id", Id);
            Button.setAttribute("latitude", latitude);
            Button.setAttribute("longitude", longitude)
            Button.setAttribute("onclick", `weather(${index})`)

            Card.append(CardHeader, CardBody);
            CardBody.append(Image, Para1, Para2, Para3, Button)

        });


    })


function weather(Index) {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach((data, index) => {

                if (index === Index) {
                    let element = document.getElementById(`${Index}`);
                    let latitude = element.getAttribute("latitude");
                    let longitude = element.getAttribute("longitude");

                    const weatherApiKey = `1ba86a17871d3a90c0a032ae7f58d594`
                    let weatherApiURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
                    navigator.geolocation.getCurrentPosition(position => {
                        let url = weatherApiURL
                            .replace("{lat}", latitude)
                            .replace("{lon}", longitude)
                            .replace("{API key}", weatherApiKey)
                        fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                let Temp = Math.round(data.main.temp - 273.15)
                                element.textContent = `Weather :${data.weather["0"].main} Temp: ${Temp} DegC `
                            })
                    })


                }
            })
        })
}




