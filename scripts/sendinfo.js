function sendInfo(results) {

    //Wysylam info: co - nazwa zmiennej
    // imiona wszystkich graczy (w kolejnosci dodawania) - names[]
    // wyniki wszystkich graczy (w kolejnosci) lastRowResult
    // najlepszy rzut - highestscore
    // imie osoby ktora rzucila najlepiej - whoScores



    // Przetwarzanie wyników
    results = [];
    for (let i = 0; i < playerAmountValue; i++) {
        results.push({
            name: names[i],
            score: lastRowResult[i]
        })
    }
    console.log(whoScores, results);

    alert("Dziękuję, informacje zostały wysłane do bazy danych");
    // document.location.reload();
    return results;
}