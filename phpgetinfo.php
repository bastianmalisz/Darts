<?php
$servername = "*****";
$username = "*****";
$password = "*****";
$dbname = "*****";


try { 
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt2 = $conn -> prepare("SELECT MAX(gameid) FROM dartstab");
    $stmt2 -> execute();

    $result2 = $stmt2 ->fetchAll(PDO::FETCH_ASSOC);
      
      $gameid = $result2[0]['MAX(gameid)'];
    
    $stmt3 = $conn -> prepare("SELECT `winner` FROM `dartstab` GROUP BY `winner` ORDER BY COUNT(*) DESC LIMIT 1");
    $stmt3 -> execute();
    $result3 = $stmt3 ->fetchAll(PDO::FETCH_ASSOC);
    
    $winner = $result3[0]['winner'];
    

    $stmt4 = $conn -> prepare('SELECT MIN(gameDuration) FROM dartstab');
    $stmt4 -> execute();
    $result4 = $stmt4 ->fetchAll(PDO::FETCH_ASSOC);
    
    $gameDuration = $result4[0]['MIN(gameDuration)'];
     

    $stmt5 = $conn -> prepare('SELECT bestThrow, bestThrowWho FROM dartstab WHERE bestThrow IN (SELECT MAX(bestThrow) FROM dartstab) LIMIT 1');
    $stmt5 -> execute();
    $result5 = $stmt5 ->fetchAll(PDO::FETCH_ASSOC);
    
    $bestThrowNumber = $result5[0]['bestThrow'];
    $bestThrowPlayer = $result5[0]['bestThrowWho'];
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
    // zmienne do wyrzucenia do JS przez ajax: $gameid , $winner , $gameDuration , $bestThrowNumber , $bestThrowPlayer
$dataFromPhp = array($gameid,$winner,$gameDuration,$bestThrowPlayer,$bestThrowNumber);

echo json_encode($dataFromPhp);

?>