const fs = require('fs')
const http = require('http');
const path = require('path');
const hostname = '127.0.0.1';

const experienceObj = require("./experience");
const bannerObj = require("./banner");
const carouselObj = require("./carousel")
const reviewsObj = require("./reviews")
const activitiesNatureObj = require("./activities-nature")
console.log(activitiesNatureObj);


function getRequestData(request) {
    console.log(request.url);
    if (request.url === '/experience') {
        return JSON.stringify(experienceObj);
    }
    else if (request.url === '/banner') {
        return JSON.stringify(bannerObj);
    }
    else if (request.url === '/carousel') {
        return JSON.stringify(carouselObj)
    }
    else if (request.url === '/reviews') {
        return JSON.stringify(reviewsObj)
    }
    else if (request.url === '/activitiesNature') {
        return JSON.stringify(activitiesNatureObj)
    }
    else {
        console.log("no data found");
    }
}

const ourServer = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.end(getRequestData(request));
});

let port = 8081
ourServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})