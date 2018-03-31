function sendInfo(results) {
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