let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let hrsText = document.getElementById("hrsText");
let minText = document.getElementById("minText");
let secText = document.getElementById("secText");


setInterval(() => {
    let currentTime = new Date();

    // The first way: 
    hrs.innerHTML = currentTime.getHours() < 10 ? `0${currentTime.getHours()}` : currentTime.getHours();
    min.innerHTML = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes();
    sec.innerHTML = currentTime.getSeconds() < 10 ? `0${currentTime.getSeconds()}` : currentTime.getSeconds();

    /*
    The second way: 

    hrs.textContent = (currentTime.getHours()<10 ? "0" : "") + currentTime.getHours();
    min.textContent = (currentTime.getMinutes()<10 ? "0" : "") +currentTime.getMinutes();
    sec.textContent = (currentTime.getSeconds()<10 ? "0" : "") + currentTime.getSeconds();
    */

}, 1000);



