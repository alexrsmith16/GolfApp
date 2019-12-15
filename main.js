const COURSES = document.getElementById("courses");
const cardHeaders = document.getElementsByClassName("card-header");
const LANDING_HEADER = document.getElementById("landing_header");
const SCORECARD = document.getElementById('scorecard');
const BASE_URL = 'https://golf-courses-api.herokuapp.com/courses/';

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
    console.log(element.id);
    // switch (element.id) {
    //     case 0:


    // }
    startGame(element.id);
}

function startGame(courseID) {
    get(BASE_URL + courseID).then(res => {
        printCard(res.data.holes);
        console.log(res);
    });
}

function printCard(holes) {
    console.log(holes);
    let height = holes[0].teeBoxes.length;
    let element = '';
    for (let i = 0; i < height; i++) {
        element += `<div class='row'>`;
        for (let j = 0; j < 19; j++) {
            if (i === 0) {
                if (j === 0) element += `<div class='first'>Holes</div>`;
                else element += `<div>${j}</div>`;
            }
            else {
                if (j === 0) element += `<div class='first'>${holes[0].teeBoxes[i].teeColorType}</div>`;
                else {
                    let cell = holes[j - 1].teeBoxes[i];
                    element += `<div class=${cell.teeColorType}>${cell.yards}</div>`;
                }
            }
        }
        element += `</div>`;
    }
    SCORECARD.innerHTML = element;
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
