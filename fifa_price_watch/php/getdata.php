<?php
require "database.php";
$startTime = substr($_GET['startTime'], 5, -7);
$increments = (int)$_GET['increments'];
$table = $_GET['table'];
$offset_string = ($_GET['offset']) . " hours";
$startDate = date_create_from_format("d M Y H:i", $startTime);
if ((int)date_format($startDate, "i") >= 30)
    date_time_set($startDate, date_format($startDate, "H"), 30, date_format($startDate, "s"));
else
    date_time_set($startDate, date_format($startDate, "H"), 00, date_format($startDate, "s"));
if ($table == "fitness")
{
    $date_arr = array();
    $gold_arr = array();
    $silver_arr = array();
    $bronze_arr = array();
    for ($i = 0; $i < $increments; $i++)
    {
        $date_query = date_format($startDate, "H_i_Y_m_d");
        $newDate = clone $startDate;
        $offset_date = date_sub($newDate, date_interval_create_from_date_string($offset_string));
        $date_label = date_format($offset_date, "M d Y H:i");
        array_push($date_arr, $date_label);
        $stmt = $connection->prepare("SELECT gold_squad_fitness, silver_squad_fitness, bronze_squad_fitness FROM fitness WHERE date = '$date_query'");
        if(!$stmt)
        {
            array_push($gold_arr, null);
            array_push($silver_arr, null);
            array_push($bronze_arr, null);
            date_add($startDate, date_interval_create_from_date_string("30 minutes"));
            continue;
        }
        else
        {
            $stmt->execute();
            $stmt->bind_result($gold, $silver, $bronze);
            $stmt->fetch();
            array_push($gold_arr, $gold);
            array_push($silver_arr, $silver);
            array_push($bronze_arr, $bronze);
            $stmt->close();
            date_add($startDate, date_interval_create_from_date_string("30 minutes"));
        }
    }
    $data = array($date_arr, $gold_arr, $silver_arr, $bronze_arr);
    echo json_encode($data);
}
elseif ($table == "position")
{

}
elseif ($table == "chemistry")
{

}

?>