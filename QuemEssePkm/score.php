<?php
//include "bin/config.php";
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kakarotogames";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$scores = getScores();

return $scores;

function getScores(){
    $sql = "SELECT * FROM esmdp_score";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $scores[$row["id"]]["user"] = $row["user"];
            $scores[$row["id"]]["time"] = $row["time"];
        }
    } else {
        echo "0 results";
    }
    return json_encode($scores);
}

?>