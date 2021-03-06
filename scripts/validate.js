const playerAmountBtn = document.querySelector(".playerAmount-btn");
const playerAmountInput = document.querySelector(".playerAmount--input");
let playerAmountValue = 0;
let names = [];
let allScores = [];
let highe = [];
let clickCount = 0;
let countOnlySeconds = 0;
let lineNumber = 0;
let itemCount = 0;
let highestScore = 0;
let secondScore = 0;
let thirdScore = 0;
let next = 0;
let sortedScores = [];
let firstPlace, secondPlace, thirdPlace;
let date = new Date();
let month = date.getUTCMonth() + 1; //miesiac
let day = date.getUTCDate(); // dzien
let year = date.getYear();
let nowDate = day + "." + month + "." + (year - 100);
let lastScores = [];
let lastRowResult = [];
let results = [];

document.querySelector(".gameWindow--gameDay").innerHTML = nowDate;

playerAmountBtn.addEventListener("click", function() {
    if (playerAmountInput.value < 1 || playerAmountInput.value > 6) {
        alert("Musisz wybrać liczbę graczy od 1 do 6");
        return;
    } else {
        playerAmountValue = playerAmountInput.value;
        document.querySelector(".playerAmount").classList.add("displayNone");
        return playerAmountValue, addPlayers(playerAmountValue);
    }
});


function addPlayers(playerAmountValue) {
    document.querySelector(".players").classList.remove("displayNone");

    // Pęta Tworząca tyle kart do uzupełnienia grających ile ustalił na wejście tworzący grę
    for (let i = 0; i < playerAmountValue; i++) {
        const createPlayerBox = [];
        createPlayerBox[i] = document.createElement("div");
        const createFirstHeader = document.createElement("h2");
        const createTextInput = document.createElement("input");
        document
            .querySelector(".addPlayers")
            .appendChild(createPlayerBox[i])
            .classList.add("addPlayers__player");
        createPlayerBox[i].appendChild(createFirstHeader).innerHTML =
            "Imię gracza:";
        createPlayerBox[i]
            .appendChild(createTextInput)
            .classList.add("addPlayers__player--name");
        for (let j = 0; j < document.querySelectorAll(".addPlayers__player--name").length; j++) {
            document
                .querySelectorAll(".addPlayers__player--name")[j].setAttribute("type", "text");
        }
    }
    // Odbieram informacje przy kliknieciu buttona "Dodaj graczy"
    document
        .querySelector(".addPlayers__btnAdd")
        .addEventListener("click", getNames);

    function getNames() {
        for (let i = 0; i < document.querySelectorAll(".addPlayers__player--name").length; i++) {
            names[i] = document.querySelectorAll(".addPlayers__player--name")[i].value;
        }
        drawMainPage();
    }
}

function drawMainPage(results) {
    document.querySelector(".players").classList.add("displayNone");
    document.querySelector(".gameWindow").classList.remove("displayNone");

    // licze czas gry
    countOnlySeconds = 0;
    let seconds = 0;
    let mins = 0;
    let secsAfter;
    let el = document.querySelector(".gameWindow--gameTime");

    function incrementSeconds() {
        countOnlySeconds += 1;
        seconds += 1;
        secsAfter = seconds;

        if (seconds / 60 == 1 || seconds > 60) {
            seconds = 0;
            mins += 1;
            el.innerText = mins + " minut i " + secsAfter + " sekund.";
        } else if (mins >= 1) {
            el.innerText = mins + " minut i " + seconds + " sekund.";
        } else el.innerText = seconds + " sekund.";
    }
    let cancel = setInterval(incrementSeconds, 1000);

    // Tworzę strukturę tabeli wyników
    const tableRow = [50];
    for (let i = 0; i < 50; i++) {
        tableRow[i] = document.createElement("tr");
    }

    const tableHeader = [];
    for (let i = 0; i < playerAmountValue; i++) {
        tableHeader[i] = document.createElement("th");
    }

    document
        .querySelector(".gameWindow__tableBox__table")
        .appendChild(tableRow[0]);
    tableRow[0].classList.add("gameWindow__tableBox__table--tr-1");

    for (let i = 0; i < playerAmountValue; i++) {
        document
            .querySelector(".gameWindow__tableBox__table--tr-1")
            .appendChild(tableHeader[i]);
        tableHeader[i].innerHTML = names[i];
    }
    lineNumber = newLine(lineNumber);

    // Tworzę wiersz do przechowywania punktów
    function newLine(lineNumber) {
        lineNumber++;
        document
            .querySelector(".gameWindow__tableBox__table")
            .appendChild(tableRow[lineNumber]);
        tableRow[lineNumber].classList.add("gameWindow__tableBox__table--tr");
        tableRow[lineNumber].id = "table--tr" + lineNumber;
        return lineNumber;
    }
    document
        .querySelector(".gameWindow__tableBox__btn")
        .addEventListener("click", function() {
            if (
                document.querySelector(".gameWindow__tableBox__input").value > 180 ||
                document.querySelector(".gameWindow__tableBox__input").value < 0 ||
                document.querySelector(".gameWindow__tableBox__input").value == ""
            ) {
                alert("To są niemożliwe do zdobycia wartości");
            } else {
                lineNumber = recordTable(lineNumber, clickCount);
                document.querySelector(".gameWindow__tableBox__input").value = "";
                return lineNumber;
            }
        });

    function recordTable(lineNumber) {
        clickCount++;
        itemCount = clickCount;
        let tableCell = document.createElement("td");
        let tableCellDiv = document.createElement("div");
        let throwScore = parseInt(
            document.querySelector(".gameWindow__tableBox__input").value
        );

        // Rejestrowanie najwyzszych trafien i kto trafil
        if (throwScore > highestScore) {
            highestScore = throwScore;
            whoScores = names[clickCount - 1];
        }

        // Aktualizacja wyniku w tabeli rekordow
        document.querySelector(
            ".gameWindow__facts__bestThrow--who"
        ).innerHTML = whoScores;
        document.querySelector(
            ".gameWindow__facts__bestThrow--amount"
        ).innerHTML = highestScore;
        tableCell.classList.add("table__cell");
        document
            .getElementById("table--tr" + lineNumber + "")
            .appendChild(tableCell)
            .setAttribute("data-colNum", clickCount);
        tableCell.id = "l" + lineNumber + "r" + clickCount;
        id = "l" + lineNumber + "r" + clickCount;

        if (lineNumber > 1) {
            tableCell.innerHTML =
                parseInt(throwScore) +
                parseInt(
                    document.querySelector("#l" + (lineNumber - 1) + "r" + clickCount)
                    .textContent
                );
        } else {
            tableCell.innerHTML = throwScore;
        }

        let playerResult = [];
        if (clickCount == parseInt(playerAmountValue)) {
            let cells = document.querySelectorAll(".table__cell");
            let lastChilds = [];

            // Generuje do tablicy ostatnie element z klasy table__cells (wszystkie komorki) zeby zapisywac je do tablicy wyników i potem konczyc gre
            for (let i = 1; i <= playerAmountValue; i++) {
                lastChilds[i] = cells[cells.length - i];
                lastRowResult[i - 1] = parseInt(lastChilds[i].textContent);
                // Koniec gry
                if (lastRowResult[i - 1] > 500) {
                    endGame();
                }
            }
            clickCount = 0;
            newLine(lineNumber);
            lineNumber++;
        }
        next++;
        return clickCount, lineNumber;
    }

    function endGame(results) {
        document
            .querySelector(".results__send")
            .addEventListener("click", function(results) {
                document
                    .querySelector(".password__popup")
                    .classList.remove("displayNone");
                document.querySelector(".layer").classList.add("darkLayer");
                document
                    .querySelector(".pw_send_btn")
                    .addEventListener("click", sendInfo);
            });
        drawResults();

        function drawResults() {
            results = [];
            for (let i = 0; i < playerAmountValue; i++) {
                results.push({
                    name: names[i],
                    score: lastRowResult[i]
                })
            }

            var byScore = results.slice(0);
            byScore.sort(function(a, b) {
                return a.score - b.score;
            });

            const lastRowCells = document.querySelectorAll(".table__cell");
            let lastRowChildsNumber = [];
            for (let i = 1; i <= playerAmountValue; i++) {
                lastRowChildsNumber[i - 1] = lastRowCells[lastRowCells.length - i].dataset.colnum;
            }
            document.querySelector(".gameWindow").classList.add("displayNone");
            document.querySelector(".results").classList.remove("displayNone");
            document.querySelector(".resultBestThrowWho").innerHTML = highestScore;
            document.querySelector(".resultBestThrowAmount").innerHTML = whoScores;
            document.querySelector(".resultGameDuration").innerHTML =
                countOnlySeconds + " sekund";
            let cells = document.querySelectorAll(".table__cell");

            for (let i = 0; i < cells.length; i++) {
                if (cells[i].innerText == byScore[byScore.length - 1].score) {
                    document.querySelector(".result_firstWho").innerHTML = names[(parseInt(cells[i].dataset.colnum) - 1)];
                    firstPlace = names[(parseInt(cells[i].dataset.colnum) - 1)];
                }
            }
            document.querySelector(".result_firstAmount").innerHTML = byScore[byScore.length - 1].score;

            for (let i = 0; i < cells.length; i++) {
                if (cells[i].innerText == byScore[byScore.length - 2].score) {
                    document.querySelector(".result_secondWho").innerHTML = names[(parseInt(cells[i].dataset.colnum) - 1)]
                    secondPlace = names[(parseInt(cells[i].dataset.colnum) - 1)]
                }
            }
            document.querySelector(".result_secondAmount").innerHTML =
                byScore[byScore.length - 2].score;

            for (let i = 0; i < cells.length; i++) {
                if (cells[i].innerText == byScore[byScore.length - 3].score) {
                    document.querySelector(".result_thirdWho").innerHTML = names[(parseInt(cells[i].dataset.colnum) - 1)];
                    thirdPlace = names[(parseInt(cells[i].dataset.colnum) - 1)];
                }
            }
            document.querySelector(".result_thirdAmount").innerHTML =
                byScore[byScore.length - 3].score;
        }
    }

}

document.querySelector(".results__link").addEventListener("click", function() {
    document.querySelector(".resultsTable").classList.remove("displayNone");
    document.querySelector(".closeBTN").addEventListener("click", function() {
        document.querySelector(".resultsTable").classList.add("displayNone");
    })
})

function fillInfo(json) {
    const jsonData = json;
    document.querySelector(".gameWindow__facts__bestEverThrow--who").innerHTML = jsonData[3];
    document.querySelector(".gameWindow__facts__bestEverThrow--who--amount").innerHTML = jsonData[4];
    document.querySelector(".gameWindow__facts__fastestGame--howLong").innerHTML = jsonData[2] + " sekund";
    document.querySelector(".gameWindow__facts__bestPlayer--who").innerHTML = jsonData[1];
    document.querySelector(".gameWindow--gameNumber").innerHTML = parseInt(jsonData[0]) + 1;
}

function run() {
    $.getJSON(
        "/phpgetinfo.php",
        fillInfo
    )
}
run();