const fs = require('fs/promises')
const http = require('http');
const path = require('path');
const hostname = '127.0.0.1';

const experienceObj = require("./experience");
const bannerObj = require("./banner");
const carouselObj = require("./carousel")
const reviewsObj = require("./reviews")
const activitiesNatureObj = require("./activities-nature")
const { parse } = require('querystring')



function getRequestData(request) {
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

async function fileRead(formData) {
    let dataFromFile = await fs.readFile("./formData.txt", "utf8");
    dataFromFile = JSON.parse(dataFromFile)
    dataFromFile.push(formData)
    await fs.writeFile("./formData.txt", JSON.stringify(dataFromFile));

}

const ourServer = http.createServer((request, response) => {
    try {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        let formData = "";
        request.on("data", (formDataPeices) => {
            formData = formDataPeices.toString()
        });
        request.on("end", () => {
            let parsed = parse(formData)
            if (Object.keys(parsed).length > 0) {
                fileRead(parsed)
            }
        });
        response.end(getRequestData(request));
    }
    catch (err) {
        console.log(err);
    }
});

let port = 8081
ourServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})