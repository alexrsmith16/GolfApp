let numplayers = 5;
let numholes = 18;
function table() {
    let toappend = "";
    for (let i = 0; i < numholes; i++) {
        toappend += `<div class="table-column">`;
        for (let j = 0; j < numplayers; j++) {
            toappend += `<div>${i},${j}</div>`;
            console.log(j);
        }
        toappend += `</div>`;
    }
    $(".table").html(toappend);
}
table();
