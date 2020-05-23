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
    $date_arr = array();
    $lwb_lb_array = array();
    $lb_lwb_array = array();
    $rwb_rb_array = array();
    $rb_rwb_array = array();
    $lm_lw_array = array();
    $lw_lm_array = array();
    $rw_rm_array = array();
    $rm_rw_array = array();
    $lw_lf_array = array();
    $lf_lw_array = array();
    $rw_rf_array = array();
    $rf_rw_array = array();
    $cm_cam_array = array();
    $cam_cm_array = array();
    $cm_cdm_array = array();
    $cam_cf_array = array();
    $cf_cam_array = array();
    $cdm_cm_array = array();
    $cf_st_array = array();
    $st_cf_array = array();
    for ($i = 0; $i < $increments; $i++)
    {
        $date_query = date_format($startDate, "H_i_Y_m_d");
        $newDate = clone $startDate;
        $offset_date = date_sub($newDate, date_interval_create_from_date_string($offset_string));
        $date_label = date_format($offset_date, "M d Y H:i");
        array_push($date_arr, $date_label);
        $stmt = $connection->prepare("SELECT lwb_lb, lb_lwb, rwb_rb, rb_rwb, lm_lw, lw_lm, rw_rm, rm_rw, lw_lf, lf_lw, rw_rf, rf_rw, cm_cam, cam_cm, cdm_cm, cm_cdm, cam_cf, cf_cam, cf_st, st_cf FROM position WHERE date = '$date_query'");
        if(!$stmt)
        {
            array_push($lwb_lb_array, null);
            array_push($lb_lwb_array, null);
            array_push($rwb_rb_array, null);
            array_push($rb_rwb_array, null);
            array_push($lm_lw_array, null);
            array_push($lw_lm_array, null);
            array_push($rw_rm_array, null);
            array_push($rm_rw_array, null);
            array_push($lw_lf_array, null);
            array_push($lf_lw_array, null);
            array_push($rw_rf_array, null);
            array_push($rf_rw_array, null);
            array_push($cm_cam_array, null);
            array_push($cam_cm_array, null);
            array_push($cam_cf_array, null);
            array_push($cf_cam_array, null);
            array_push($cm_cdm_array, null);
            array_push($cdm_cm_array, null);
            array_push($cf_st_array, null);
            array_push($st_cf_array, null);
            date_add($startDate, date_interval_create_from_date_string("30 minutes"));
            continue;
        }
        else
        {
            $stmt->execute();
            $stmt->bind_result($lwb_lb, $lb_lwb, $rwb_rb, $rb_rwb, $lm_lw, $lw_lm, $rw_rm, $rm_rw, $lw_lf, $lf_lw, $rw_rf, $rf_rw, $cm_cam, $cam_cm, $cdm_cm, $cm_cdm, $cam_cf, $cf_cam, $cf_st, $st_cf);
            $stmt->fetch();
            array_push($lwb_lb_array, $lwb_lb);
            array_push($lb_lwb_array, $lb_lwb);
            array_push($rwb_rb_array, $rwb_rb);
            array_push($rb_rwb_array, $rb_rwb);
            array_push($lm_lw_array, $lm_lw);
            array_push($lw_lm_array, $lw_lm);
            array_push($rw_rm_array, $rw_rm);
            array_push($rm_rw_array, $rm_rw);
            array_push($lw_lf_array, $lw_lf);
            array_push($lf_lw_array, $lf_lw);
            array_push($rw_rf_array, $rw_rf);
            array_push($rf_rw_array, $rf_rw);
            array_push($cm_cam_array, $cm_cam);
            array_push($cam_cm_array, $cam_cm);
            array_push($cam_cf_array, $cam_cf);
            array_push($cf_cam_array, $cf_cam);
            array_push($cm_cdm_array, $cm_cdm);
            array_push($cdm_cm_array, $cdm_cm);
            array_push($cf_st_array, $cf_st);
            array_push($st_cf_array, $st_cf);
            $stmt->close();
            date_add($startDate, date_interval_create_from_date_string("30 minutes"));
        }
    }
    $data = array($date_arr, $lwb_lb_array, $lb_lwb_array, $rwb_rb_array, $rb_rwb_array, $lm_lw_array, $lw_lm_array, $rw_rm_array, $rm_rw_array, $lw_lf_array, $lf_lw_array, $rw_rf_array, $rf_rw_array, $cm_cam_array, $cam_cm_array, $cam_cf_array, $cf_cam_array, $cm_cdm_array, $cdm_cm_array, $cf_st_array, $st_cf_array);
    echo json_encode($data);
}
elseif ($table == "chemistry")
{
    $date_arr = array();
    $anchor_array = array();
    $engine_array = array();
    $hawk_array = array();
    $deadeye_array = array();
    $basic_array = array();
    $shadow_array = array();
    $hunter_array = array();
    $catalyst_array = array();
    $sniper_array = array();
    for ($i = 0; $i < $increments; $i++)
    {
        $date_query = date_format($startDate, "H_i_Y_m_d");
        $newDate = clone $startDate;
        $offset_date = date_sub($newDate, date_interval_create_from_date_string($offset_string));
        $date_label = date_format($offset_date, "M d Y H:i");
        array_push($date_arr, $date_label);
        $stmt = $connection->prepare("SELECT basic, sniper, hunter, catalyst, shadow, engine, deadeye, hawk, anchor FROM chemistry WHERE date = '$date_query'");
        if(!$stmt)
        {
            array_push($anchor_array, null);
            array_push($hawk_array, null);
            array_push($engine_array, null);
            array_push($deadeye_array, null);
            array_push($basic_array, null);
            array_push($shadow_array, null);
            array_push($hunter_array, null);
            array_push($catalyst_array, null);
            array_push($sniper_array, null);
            date_add($startDate, date_interval_create_from_date_string("30 minutes"));
            continue;
        }
        else
        {
            $stmt->execute();
            $stmt->bind_result($anchor, $hawk, $engine, $deadeye, $basic, $shadow, $hunter, $catalyst, $sniper);
            $stmt->fetch();
            array_push($anchor_array, $anchor);
            array_push($hawk_array, $hawk);
            array_push($engine_array, $engine);
            array_push($deadeye_array, $deadeye);
            array_push($basic_array, $basic);
            array_push($shadow_array, $shadow);
            array_push($hunter_array, $hunter);
            array_push($catalyst_array, $catalyst);
            array_push($sniper_array, $sniper);
            $stmt->close();
            date_add($startDate, date_interval_create_from_date_string("30 minutes"));
        }
    }
    $data = array($date_arr, $anchor_array, $hawk_array, $engine_array, $deadeye_array, $basic_array, $shadow_array, $hunter_array, $catalyst_array, $sniper_array);
    echo json_encode($data);
}

?>