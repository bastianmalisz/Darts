<link rel ="stylesheet" href ="table-results.css">
<?php
echo "<table style='border: solid 1px black;'>";
echo "<tr><thead><th>Numer gry</th><th>Gracz #1</th><th>Gracz #2</th><th>Gracz #3</th><th>Gracz #4</th><th>Gracz #5</th><th>Gracz #6</th><th>Wynik gracza #1</th><th>Wynik gracza #2</th><th>Wynik gracza #3</th><th>Wynik gracza #4</th><th>Wynik gracza #5</th><th>Wynik gracza #6</th><th>Najlepszy rzut</th><th>Data gry</th> <th>Trwanie</th> <th>Najlepszy rzut (kto)</th><th>Wygrał</th><th>2 miejsce</th> <th>3 miejsce</thead></tr>";

class TableRows extends RecursiveIteratorIterator { 
    function __construct($it) { 
        parent::__construct($it, self::LEAVES_ONLY); 
    }

    function current() {
        return "<td style='width:150px;border:1px solid black;'>" . parent::current(). "</td>";
    }

    function beginChildren() { 
        echo "<tr>"; 
    } 

    function endChildren() { 
        echo "</tr>" . "\n";
    } 
} 

$servername = "*****";
$username = "*****";
$password = "*****";
$dbname = "*****";


try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT * FROM dartstab"); 
    $stmt->execute();

    
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
        echo $v;
    }

}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
echo "</table>";

?>