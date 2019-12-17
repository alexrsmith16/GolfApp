const COURSES = document.getElementById("courses");
const cardHeaders = document.getElementsByClassName("card-header");
const LANDING_HEADER = document.getElementById("landing_header");
const GRID = document.getElementById('grid');
const HEAD = document.getElementById('head');
const BASE_URL = 'https://golf-courses-api.herokuapp.com/courses/';
let activeTee;
let activeCourse;

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
    startGame(element.id);
}

function startGame(courseID) {
    get(BASE_URL + courseID).then(res => {
        activeCourse = res.data.holes;
        console.log(res.data);
        printCard();
    });
}

function handleTeeSelect(element) {
    activeTee = element.getAttribute('data');
    printCard()
}

function printCard() {
    let active = '';
    let element = `<div class='tee_select'>`;
    for (let i of activeCourse[0].teeBoxes) {
        if (i.teeType === "auto change location") break;
        if (i.teeColorType === activeTee) active = 'active';
        element += `<button class='${i.teeColorType} ${active}' data='${i.teeColorType}' onClick='handleTeeSelect(this)'>${i.teeType}</button>`;
        active = '';
    }
    element += 
    `</div>
    <div class='game-option'>
        <button id='9_hole'>9 Holes</b onClick='handleGameOptionClick(this)'utton>
        <button id='18_hole' onClick='handleGameOptionClick(this)>18 Holes</button>
    </div>`
    HEAD.innerHTML = element;
    element = '';
    
    //Out
    element += `<div class='out'><div class='row'><div>Hole</div>`;
    for (let i = 1; i < 10; i++) element += `<div>${i}</div>`;
    element += `<div>Out</div></div>`;

    element += `</div>`;
    //In
    element += `<div class='in'><div class='row'>`;
    for (let i = 1; i < 10; i++) element += `<div>${i}</div>`;
    element += `<div>In</div><div>Total</div></div>`;

    element += `</div>`;


    GRID.innerHTML = element;
    //9/18
    //Grid
    //  numbers
    //  tee
    //  handicap
    //  players
    //  totals
    //  par
    
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
