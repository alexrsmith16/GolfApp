const COURSES = document.getElementById("courses");
const cardHeaders = document.getElementsByClassName("card-header");
const LANDING_HEADER = document.getElementById("landing_header");
const GRID = document.getElementById('grid');
const HEAD = document.getElementById('head');
const BASE_URL = 'https://golf-courses-api.herokuapp.com/courses/';
let activeTee = 'white';
let activeCourse;
let activeHole = '18_hole';
let playerArray = [{name: "", arr: []}];

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
    printCard();
}

function handleGameOptionClick(element) {
    activeHole = element.id;
    printCard();
}

function handleAddPlayer() {
    playerArray.push({name: "", arr: []});
    printCard();
}

function handleNameChange(e) {
    for (let i of playerArray) {
        if (i.name === e.value) {
            e.value = "";
            alert('Cannot have duplicate names');
            return;
        }
    }
    playerArray[e.id.charAt(7)].name = e.value;
}

function handleScoreInput(e) {
    if (!parseInt(e.value)) {
        e.value = "";
        return;
    }
    let x = parseInt(e.id.split('_')[0]);
    let y = parseInt(e.id.split('_')[1]);
    playerArray[x].arr[y] = parseInt(e.value);
    let id = 'out_' + x;
    let index = [0,9];
    if (y >= 9) {
        id = 'in_' + x;
        index = [9,18];
    }
    document.getElementById(id).innerText = playerArray[x].arr.slice(index[0],index[1]).reduce((a,b) => a + b, 0);
    document.getElementById('tot_' + x).innerText = playerArray[x].arr.reduce((a,b) => a + b, 0);
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
        <button id='9_hole' class='${activeHole === '9_hole' ? 'active' : ''}' onClick='handleGameOptionClick(this)'>9 Holes</button>
        <button id='18_hole' class='${activeHole === '18_hole' ? 'active' : ''}' onClick='handleGameOptionClick(this)'>18 Holes</button>
    </div>
    <div class='add-player'><button onclick='handleAddPlayer()'>Add Player</button>`
    HEAD.innerHTML = element;
    element = '';
    
    //Out
    let found = activeCourse[0].teeBoxes.findIndex(element => element.teeColorType === activeTee);
    let tee = activeCourse[0].teeBoxes[found];
    console.log(tee);
    let teeTypeUpper = tee.teeType.charAt(0).toUpperCase() + tee.teeType.slice(1, tee.teeType.length);
    let teeColor = tee.teeColorType;
    let outerTotalYards = 0;
    let parOut = 0;
    let hcpOut = 0;
    
    //header row
    element += `<div class='out'><div class='row'><div class='first'>Hole</div>`;
    for (let i = 1; i < 10; i++) element += `<div>${i}</div>`;
    element += `<div>OUT</div></div>`
    //tee row
    element +=`<div class='row'><div class='first ${teeColor}'>${teeTypeUpper}</div>`;
    for (let i = 0; i < 9; i++) {
        let temp = tee.yards;
        outerTotalYards += temp;
        element += `<div class='${teeColor}'>${temp}</div>`;
    }
    element += `<div class='${teeColor}'>${outerTotalYards}</div></div>`
    //handicap row
    element +=`<div class='row handicap'><div class='first'>Handicap</div>`;
    for (let i = 0; i < 9; i++) {
        let temp = activeCourse[i].teeBoxes[found].hcp;
        hcpOut += temp;
        element += `<div>${temp}</div>`;
    }
    element += `<div>${hcpOut}</div></div>`
    //player rows
    for (let i = 0; i < playerArray.length; i++) {
        element += 
        `<div class='row'>
            <input 
            class='first'
            id='player_${i}' 
            onblur='handleNameChange(this)'
            value='${playerArray[i].name}'>
            </input>`;
        for (let j = 0; j < 9; j++) {
            let content = playerArray[i].arr[j];
            element += `<input onblur='handleScoreInput(this)' id='${i}_${j}' value='${content ? content : ""}'></input>`
        }
        element += `<div id='out_${i}'>${playerArray[i].arr.slice(0,9).reduce((a,b) => a + b, 0)}</div></div>`
    }
    //par row
    element +=`<div class='row par'><div class='first'>Par</div>`;
    for (let i = 0; i < 9; i++) {
        let temp = activeCourse[i].teeBoxes[found].par;
        parOut += temp;
        element += `<div>${temp}</div>`;
    }
    element += `<div>${parOut}</div></div>`

    element += `</div>`;

    //In
    if (activeHole === '18_hole') {
        //header row
        element += `<div class='in'><div class='row'>`;
        for (let i = 1; i < 10; i++) element += `<div>${i}</div>`;
        element += `<div>IN</div>`
        //tee row
        element += `<div>Total</div></div><div class='row'>`;
        let innerTotalYards = 0;
        for (let i = 9; i < 18; i++) {
            let temp = tee.yards;
            innerTotalYards += temp;
            element += `<div class='${teeColor}'>${temp}</div>`;
        }
        element += `<div class='${teeColor}'>${innerTotalYards}</div>
                    <div class='${teeColor}'>${innerTotalYards + outerTotalYards}</div>
                    </div>`
        //handicap row
        element +=`<div class='row handicap'>`;
        let hcpIn = 0;
        for (let i = 9; i < 18; i++) {
            let temp = activeCourse[i].teeBoxes[found].hcp;
            hcpIn += temp;
            element += `<div>${temp}</div>`;
        }
        element += `<div>${hcpIn}</div><div>${hcpOut + hcpIn}</div></div>`
        //player rows
        for (let i = 0; i < playerArray.length; i++) {
            element += `<div class='row'>`;
            for (let j = 9; j < 18; j++) {
                let content = playerArray[i].arr[j];
                element += `<input onblur='handleScoreInput(this)' id='${i}_${j}' value='${content ? content : ""}'></input>`
            }
            element += `<div id='in_${i}'>${playerArray[i].arr.slice(9,18).reduce((a,b) => a + b, 0)}</div>
                        <div id='tot_${i}'>${playerArray[i].arr.reduce((a,b) => a + b, 0)}</div></div>`
        }
        //par row
        element +=`<div class='row par'>`;
        let parIn = 0;
        for (let i = 9; i < 18; i++) {
            let temp = activeCourse[i].teeBoxes[found].par;
            parIn += temp;
            element += `<div>${temp}</div>`;
        }
        element += `<div>${parIn}</div><div>${parOut + parIn}</div></div>`
        element += `</div>`;
    }
        

    GRID.innerHTML = element;
}