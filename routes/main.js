var router = express.Router();

var fs = require('fs')
var newsContainer = document.getElementById("news-info")
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', '/news/approve');
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        renderjade(ourData);
    }
    ourRequest.send();
})


function renderjade(data) {

    var mineString = "";
    for (i = 0; i < data.length; i++) {
        mineString += "<p>" + data[i].title;
    }


}