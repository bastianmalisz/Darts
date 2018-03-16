const playerAmountBtn  = document.querySelector(".playerAmount-btn");
const playerAmountInput = document.querySelector(".playerAmount--input");
let playerAmountValue = 0;
let names = [];
let clickCount=0 ;
let lineNumber = 0;
let itemCount =0;
let highestScore=0;
let next = 0;
let whoScores="";
let firstPlace, secondPlace, thirdPlace;
playerAmountBtn.addEventListener("click",function(){
    if(playerAmountInput.value <1 || playerAmountInput.value > 6){
        alert("Musisz wybrać liczbę graczy od 1 do 6");
        return;
    }else{
        playerAmountValue = playerAmountInput.value;
        document.querySelector(".playerAmount").classList.add("displayNone");
        return playerAmountValue, addPlayers(playerAmountValue);
        
    }
    
   
})

function addPlayers(playerAmountValue){
    document.querySelector(".players").classList.remove("displayNone");
    
    // Pęta Tworząca tyle kart do uzupełnienia grających ile ustalił na wejście tworzący grę
    for(let i =0; i<playerAmountValue;i++){
        const createPlayerBox =[];
        createPlayerBox[i] = document.createElement("div");
        const createFirstHeader = document.createElement("h2");
        const createTextInput = document.createElement("input");
        document.querySelector(".addPlayers").appendChild(createPlayerBox[i]).classList.add("addPlayers__player");
        createPlayerBox[i].appendChild(createFirstHeader).innerHTML="Imię gracza:";
        createPlayerBox[i].appendChild(createTextInput).classList.add("addPlayers__player--name");
        for(let j=0;j<document.querySelectorAll(".addPlayers__player--name").length; j++){
            document.querySelectorAll(".addPlayers__player--name")[j].setAttribute("type", "text");
            }
    }
    // Odbieram informacje przy kliknieciu buttona "Dodaj graczy" 
         document.querySelector(".addPlayers__btnAdd").addEventListener("click",getNames);
         function getNames(){
            for(let i =0; i < document.querySelectorAll(".addPlayers__player--name").length;i++){
                names[i] = document.querySelectorAll(".addPlayers__player--name")[i].value;
                }
                drawMainPage();
            }    
            
}

function drawMainPage(){
    document.querySelector(".players").classList.add("displayNone");
    document.querySelector(".gameWindow").classList.remove("displayNone");
    
    // Tworzę strukturę tabeli wyników
    const tableRow = [50];
    for(let i = 0; i <50;i++){
        tableRow[i] = document.createElement("tr");
    }
    
    
    const tableHeader =[];
    for(let i = 0;i<playerAmountValue;i++){
        tableHeader[i] = document.createElement("th");
    }
    
    document.querySelector(".gameWindow__tableBox__table").appendChild(tableRow[0]);
    tableRow[0].classList.add("gameWindow__tableBox__table--tr");
    for(let i=0;i<playerAmountValue;i++){
        document.querySelector(".gameWindow__tableBox__table--tr").appendChild(tableHeader[i])
        tableHeader[i].innerHTML=names[i];
    }
    lineNumber = newLine(lineNumber);

    // Tworzę wiersz do przechowywania punktów
    function newLine(lineNumber){
        
        lineNumber++;
        console.log(lineNumber)
        document.querySelector(".gameWindow__tableBox__table").appendChild(tableRow[lineNumber]);
        tableRow[lineNumber].classList.add("gameWindow__tableBox__table--tr");
        tableRow[lineNumber].id="table--tr"+lineNumber;
        return lineNumber;
        
    }
    document.querySelector(".gameWindow__tableBox__btn").addEventListener("click",function(){
        if(document.querySelector(".gameWindow__tableBox__input").value > 180 || document.querySelector(".gameWindow__tableBox__input").value < 0 ||document.querySelector(".gameWindow__tableBox__input").value == "" ){
            alert("To są niemożliwe do zdobycia wartości");
        }else{
            lineNumber = recordTable(lineNumber,clickCount);
            document.querySelector(".gameWindow__tableBox__input").value=""
            return lineNumber;
        }
         
        
    });

    function recordTable(lineNumber){
        // Przy okazji tworzenia nowych komorek mogę oznaczyć te, które mają największą i najmniejszą wartość
        
        clickCount++;
        itemCount = clickCount;
        // console.log(lineNumber)
        let tableCell = document.createElement("td");
        let tableCellDiv = document.createElement("div");
        let throwScore = parseInt(document.querySelector(".gameWindow__tableBox__input").value);
        
        // Rejestrowanie najwyzeszego trafienia i kto trafil
        if(throwScore > highestScore){
            highestScore = throwScore;
            whoScores = names[clickCount-1];
        }
        
        // Aktualizacja wyniku w tabeli rekordow
        document.querySelector(".gameWindow__facts__bestThrow--who").innerHTML=whoScores;
        document.querySelector(".gameWindow__facts__bestThrow--amount").innerHTML=highestScore;

        console.log("rekord wynosi: "+highestScore, "rekord nalezy do: "+whoScores,"Ostatni rzut: "+throwScore,)
        tableCell.classList.add("table__cell");
        document.getElementById("table--tr"+lineNumber+"").appendChild(tableCell);
        tableCell.id = "l"+lineNumber+"r"+clickCount;
        id ="l"+lineNumber+"r"+clickCount;
        
       


        
       
        
        if(lineNumber > 1){
            tableCell.innerHTML = parseInt(throwScore) + (parseInt((document.querySelector("#l"+(lineNumber-1)+"r"+clickCount).textContent)));
        }else{
            tableCell.innerHTML = throwScore;
        }
        
    
    
        
        console.log(clickCount,playerAmountValue,lineNumber,itemCount,next)
        if(clickCount == (parseInt(playerAmountValue))){
            let cells = document.querySelectorAll(".table__cell");
            let lastChilds = [];
            let lastRowResult = [];

            

            // Generuje do tablicy ostatnie element z klasy table__cells (wszystkie komorki) zeby zapisywac je do tablicy wyników i potem konczyc gre
             for(let i =1; i<=playerAmountValue;i++){
                lastChilds[i] = cells[cells.length - i];
                lastRowResult[i-1] = parseInt(lastChilds[i].textContent);
            

                if( lastRowResult[i-1] >  lastRowResult[i]){
                    console.log("wiekszy jest "+lastRowResult[i-1])
                }else{
                    console.log("wiekszy jest "+lastRowResult[i+1])
                }
                console.log(lastRowResult);
                if(lastRowResult[i] > 500){
                    alert("KONIEC GRY");
                }

                }
            clickCount = 0;
            newLine(lineNumber);
            console.log("NOWA LINIA")
            lineNumber++;
            
        }
        next ++;
        return clickCount,lineNumber;
    }
    }
