let COURSES = document.getElementById("courses");
let cardHeaders = document.getElementsByClassName("card-header");
let LANDING_HEADER = document.getElementById("landing_header");
for (let i of cardHeaders) {
    i.addEventListener('mouseenter', e => {
        i.previousElementSibling.style.filter = "blur(2px)";
    });

    i.addEventListener('mouseleave', e => {
        i.previousElementSibling.style.filter = "";
    });
}

function get(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

function clickCard(element) {
    LANDING_HEADER.classList.add("disappear");
    COURSES.classList.add("playing-game");
    element.classList.add("active");
    switch (element.id) {
        case 0:


    }
    startGame()
}

function startGame(test) {

}










// let numplayers = 5;
// let numholes = 18;
// function table() {
//     let toappend = "";
//     for (let i = 0; i < numholes; i++) {
//         toappend += `<div class="table-column">`;
//         for (let j = 0; j < numplayers; j++) {
//             toappend += `<div>${i},${j}</div>`;
//             console.log(j);
//         }
//         toappend += `</div>`;
//     }
//     $(".table").html(toappend);
// }
// table();
