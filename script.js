function getTimes() {
    //api key = AIzaSyC4u9PQxS13iaFlguDj-kfQrZ2kUrSVKSI
    //link = https://maps.googleapis.com/maps/api/geocode/json?address=city name&key=YOUR_API_KEY
    let addressInput = document.getElementById('addressInput');
    let req = new XMLHttpRequest();
    let link = "https://www.mapquestapi.com/geocoding/v1/address?key=Q81zD2FKku8TkEZ3SDZ8q5tT84BolrG4&location=Moscowhhugg"; // + addressInput;

    req.open("GET", link, true);

    req.onload = function() {
        let data = JSON.parse(this.response);
        let coords = data.results[0].locations[0].latLng;
        let lat = coords.lat;
        let long = coords.lng;

        let request = new XMLHttpRequest();
        let url = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + long;

        request.open("GET", url, true);

        request.onload = function() {
            let data = JSON.parse(this.response);
            //console.log(data);
            let sunriseHTML = document.getElementById("sunrise");
            let sunriseTime = convertToEST(data.results.sunrise);
            let sunsetHTML = document.getElementById("sunset");
            let sunsetTime = convertToEST(data.results.sunset);

            if (request.status >= 200 && request.status < 400) {
                sunriseHTML.textContent = sunriseTime;
                sunsetHTML.textContent = sunsetTime;

            }
        }

        request.send()

    }

    req.send();

}



function convertToEST(utc) {
    let utcHours = utc.substr(0, utc.indexOf(":"));
    let utcMinSec = utc.substr(utc.indexOf(":") + 1);

    let est = parseInt(utcHours, 10) - 5;
    est += ":" + utcMinSec;
    return est;
}
