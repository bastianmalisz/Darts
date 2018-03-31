<?php

// gathering data from JS json POST
$text1 = $_POST['text1'];
$json = json_decode($text1);

// gathering data and filling with it created variables for ease of usage
$phpNames = array();
$phpGameResults = array();
$phpBestThrow = $json -> bestThrow;
$phpbestThrowWho = $json -> whoThrowsBest;
$phpWinner = $json -> firstWho;
$phpSecondPlace = $json -> secondWho;
$phpThirdPlace = $json -> thirdWho;
$phpGameDuration = $json -> gameDuration;
$phpGameDate = $json -> gameDate;
$i = 0;
$lengthNames = count($json -> playerNames);
$j = $lengthNames;


//check if working correctly
echo("wygrał: ".$phpWinner.", ".$phpSecondPlace);

// filling empty variables if there are less than maximum amount of players (for correct data input into database)
if($lengthNames<6){
    for($i;$i<$lengthNames;$i++){
        $phpNames[$i] = $json -> playerNames[$i];
        $phpGameResults[$i] = $json -> lastRowNumbers[$i];
    }
    for($j;$j<=6;$j++){
        $phpNames[$j] = "empty";
        $phpGameResults[$j] = "empty";
    }
}else{
    for($i;$i<$lengthNames;$i++){
        $phpNames[$i] = $json -> playerNames[$i];
        $phpGameResults[$i] = $json -> lastRowNumbers[$i];
    }
}

// connecting to database 

$servername = "*****";
$username = "*****";
$password = "*****";
$dbname = "*****";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// making an database insert
$sql = "INSERT INTO dartstab (name1,name2,name3,name4,name5,name6,result1,result2,result3,result4,result5,result6,bestThrow,gameDay,gameDuration,bestThrowWho,winner,secondplace,thirdplace)
  VALUES ('$phpNames[0]','$phpNames[1]','$phpNames[2]','$phpNames[3]','$phpNames[4]','$phpNames[5]','$phpGameResults[0]','$phpGameResults[1]','$phpGameResults[2]','$phpGameResults[3]','$phpGameResults[4]','$phpGameResults[5]','$phpBestThrow','$phpGameDate','$phpGameDuration','$phpbestThrowWho','$phpWinner','$phpSecondPlace','$phpThirdPlace')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>