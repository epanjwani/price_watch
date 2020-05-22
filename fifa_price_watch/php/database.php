<?php
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');
$db = "fifa20_consumable_prices";
$server = "localhost";
$connection = new mysqli($server, $user, $pass, $db);
if ($connection->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } 
?>