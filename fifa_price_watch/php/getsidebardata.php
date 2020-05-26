<?php
require "database.php";
$initial_utc = substr($_GET['initial_utc'], 5, -7);
$startDate = date_create_from_format("d M Y H:i", $initial_utc);
$date_query = date_format($startDate, "H_i_Y_m_d");

//fitness, max, min
$fitness_id_stmt = $connection->prepare("SELECT id FROM fitness WHERE date = '$date_query'");
$fitness_id_stmt->execute();
$fitness_id_stmt->bind_result($fitness_id);
$fitness_id_stmt->fetch();
$fitness_id_stmt->close();
$fitness_stmt = $connection->prepare("SELECT min(gold_squad_fitness), min(silver_squad_fitness), min(bronze_squad_fitness), max(gold_squad_fitness), max(silver_squad_fitness), max(bronze_squad_fitness) FROM fitness WHERE id >= ?");
$fitness_stmt->bind_param('i', $fitness_id);
if (!$fitness_stmt)
{
    echo "error";
}
else{
$fitness_stmt->execute();
$fitness_stmt->bind_result($min_gold, $min_silver, $min_bronze, $max_gold, $max_silver, $max_bronze);
$fitness_stmt->fetch();
$fitness_stmt->close();
}

//fitness, current
$fitness_current_stmt = $connection->prepare("SELECT gold_squad_fitness, silver_squad_fitness, bronze_squad_fitness FROM fitness WHERE id=(
    SELECT max(id) FROM fitness
    )");
$fitness_current_stmt->execute();
$fitness_current_stmt->bind_result($current_gold, $current_silver, $current_bronze);
$fitness_current_stmt->fetch();
$fitness_current_stmt->close();

//fitness arrays
$gold_arr = [
    "max" => $max_gold,
    "min" => $min_gold,
    "current" => $current_gold
];
$silver_arr = [
    "max" => $max_silver,
    "min" => $min_silver,
    "current" => $current_silver
];
$bronze_arr = [
    "max" => $max_bronze,
    "min" => $min_bronze,
    "current" => $current_bronze
];
$fitnessdata = [
    'gold' => $gold_arr, 
    'silver' => $silver_arr, 
    'bronze' => $bronze_arr
];

//position, max, min
$pos_id_stmt = $connection->prepare("SELECT id FROM position WHERE date = '$date_query'");
$pos_id_stmt->execute();
$pos_id_stmt->bind_result($pos_id);
$pos_id_stmt->fetch();
$pos_id_stmt->close();
$pos_stmt = $connection->prepare("SELECT min(lwb_lb), min(lb_lwb), min(rwb_rb), min(rb_rwb), min(lm_lw), min(lw_lm), min(rw_rm), min(rm_rw), min(lw_lf), min(lf_lw), min(rw_rf), min(rf_rw), min(cm_cam), min(cam_cm), min(cdm_cm), min(cm_cdm), min(cam_cf), min(cf_cam), min(cf_st),min(st_cf), max(lwb_lb), max(lb_lwb), max(rwb_rb), max(rb_rwb), max(lm_lw), max(lw_lm), max(rw_rm), max(rm_rw), max(lw_lf), max(lf_lw), max(rw_rf), max(rf_rw), max(cm_cam), max(cam_cm), max(cdm_cm), max(cm_cdm), max(cam_cf), max(cf_cam), max(cf_st),max(st_cf) FROM position WHERE id >= ?");
$pos_stmt->bind_param('i', $pos_id);
if (!$pos_stmt)
{
    echo "error";
}
else{
$pos_stmt->execute();
$pos_stmt->bind_result($min_lwb_lb, $min_lb_lwb, $min_rwb_rb, $min_rb_rwb, $min_lm_lw, $min_lw_lm, $min_rw_rm, $min_m_rw, $min_lw_lf, $min_lf_lw, $min_rw_rf, $min_rf_rw, $min_cm_cam, $min_cam_cm, $min_cdm_cm, $min_cm_cdm, $min_cam_cf, $min_cf_cam, $min_cf_st, $min_st_cf, $max_lwb_lb, $max_lb_lwb, $max_rwb_rb, $max_rb_rwb, $max_lm_lw, $max_lw_lm, $max_rw_rm, $max_rm_rw, $max_lw_lf, $max_lf_lw, $max_rw_rf, $max_rf_rw, $max_cm_cam, $max_cam_cm, $max_cdm_cm, $max_cm_cdm, $max_cam_cf, $max_cf_cam, $max_cf_st, $max_st_cf);
$pos_stmt->fetch();
$pos_stmt->close();
}

//position, current
$pos_current_stmt = $connection->prepare("SELECT lwb_lb, lb_lwb, rwb_rb, rb_rwb, lm_lw, lw_lm, rw_rm, rm_rw, lw_lf, lf_lw, rw_rf, rf_rw, cm_cam, cam_cm, cdm_cm, cm_cdm, cam_cf, cf_cam, cf_st, st_cf FROM position WHERE id=(
    SELECT max(id) FROM position
    )");
$pos_current_stmt->execute();
$pos_current_stmt->bind_result($current_lwb_lb, $current_lb_lwb, $current_rwb_rb, $current_rb_rwb, $current_lm_lw, $current_lw_lm, $current_rw_rm, $current_rm_rw, $current_lw_lf, $current_lf_lw, $current_rw_rf, $current_rf_rw, $current_cm_cam, $current_cam_cm, $current_cdm_cm, $current_cm_cdm, $current_cam_cf, $current_cf_cam, $current_cf_st, $current_st_cf);
$pos_current_stmt->fetch();
$pos_current_stmt->close();

//position arrays

$lwb_lb_array = [
    "max" => $max_lwb_lb,
    "min" => $min_lwb_lb,
    "current" => $current_lwb_lb
];
$lb_lwb_array = [
    "max" => $max_lb_lwb,
    "min" => $min_lb_lwb,
    "current" => $current_lb_lwb
];
$rwb_rb_array = [
    "max" => $max_rwb_rb,
    "min" => $min_rwb_rb,
    "current" => $current_rwb_rb
];
$rb_rwb_array = [
    "max" => $max_rb_rwb,
    "min" => $min_rb_rwb,
    "current" => $current_rb_rwb
];
$lm_lw_array = [
    "max" => $max_lm_lw,
    "min" => $min_lm_lw,
    "current" => $current_lm_lw
];
$lw_lm_array = [
    "max" => $max_lw_lm,
    "min" => $min_lw_lm,
    "current" => $current_lw_lm
];
$rw_rm_array = [
    "max" => $max_rw_rm,
    "min" => $min_rw_rm,
    "current" => $current_rw_rm
];
$rm_rw_array = [
    "max" => $max_rm_rw,
    "min" => $min_rm_rw,
    "current" => $current_rm_rw
];
$lw_lf_array = [
    "max" => $max_lw_lf,
    "min" => $min_lw_lf,
    "current" => $current_lw_lf
];
$lf_lw_array = [
    "max" => $max_lf_lw,
    "min" => $min_lf_lw,
    "current" => $current_lf_lw
];
$rw_rf_array = [
    "max" => $max_rw_rf,
    "min" => $min_rw_rf,
    "current" => $current_rw_rf
];
$rf_rw_array = [
    "max" => $max_rf_rw,
    "min" => $min_rf_rw,
    "current" => $current_rf_rw
];
$cm_cam_array = [
    "max" => $max_cm_cam,
    "min" => $min_cm_cam,
    "current" => $current_cm_cam
];
$cam_cm_array = [
    "max" => $max_cam_cm,
    "min" => $min_cam_cm,
    "current" => $current_cam_cm
];
$cm_cdm_array = [
    "max" => $max_cm_cdm,
    "min" => $min_cm_cdm,
    "current" => $current_cm_cdm
];
$cam_cf_array = [
    "max" => $max_cam_cf,
    "min" => $min_cam_cf,
    "current" => $current_cam_cf
];
$cf_cam_array = [
    "max" => $max_cf_cam,
    "min" => $min_cf_cam,
    "current" => $current_cf_cam
];
$cdm_cm_array = [
    "max" => $max_cdm_cm,
    "min" => $min_cdm_cm,
    "current" => $current_cdm_cm
];
$cf_st_array = [
    "max" => $max_cf_st,
    "min" => $min_cf_st,
    "current" => $current_cf_st
];
$st_cf_array = [
    "max" => $max_st_cf,
    "min" => $min_st_cf,
    "current" => $current_st_cf
];
$positiondata = [
    'lwb_lb' => $lwb_lb_array, 
    'lb_lwb' => $lb_lwb_array, 
    'rwb_rb' => $rwb_rb_array, 
    'rb_rwb' => $rb_rwb_array, 
    'lm_lw' => $lm_lw_array, 
    'lw_lm' => $lw_lm_array, 
    'rw_rm' => $rw_rm_array, 
    'rm_rw' => $rm_rw_array, 
    'lw_lf' => $lw_lf_array, 
    'lf_lw' => $lf_lw_array, 
    'rw_rf' => $rw_rf_array, 
    'rf_rw' => $rf_rw_array, 
    'cm_cam' => $cm_cam_array, 
    'cam_cm' => $cam_cm_array, 
    'cam_cf' => $cam_cf_array, 
    'cf_cam' => $cf_cam_array, 
    'cm_cdm' => $cm_cdm_array, 
    'cdm_cm' => $cdm_cm_array, 
    'cf_st' => $cf_st_array, 
    'st_cf' => $st_cf_array
];
//chemistry, max, min
$chem_id_stmt = $connection->prepare("SELECT id FROM chemistry WHERE date = '$date_query'");
$chem_id_stmt->execute();
$chem_id_stmt->bind_result($chem_id);
$chem_id_stmt->fetch();
$chem_id_stmt->close();
$chemistry_stmt = $connection->prepare("SELECT min(basic), min(sniper), min(hunter), min(catalyst), min(shadow), min(engine), min(deadeye), min(hawk), min(anchor), max(basic), max(sniper), max(hunter), max(catalyst), max(shadow), max(engine), max(deadeye), max(hawk), max(anchor) FROM chemistry WHERE id >= ?");
$chemistry_stmt->bind_param('i', $chem_id);
if (!$chemistry_stmt)
{
    echo "error";
}
else{
$chemistry_stmt->execute();
$chemistry_stmt->bind_result($min_basic, $min_sniper, $min_hunter, $min_catalyst, $min_shadow, $min_engine, $min_deadeye, $min_hawk, $min_anchor, $max_basic, $max_sniper, $max_hunter, $max_catalyst, $max_shadow, $max_engine, $max_deadeye, $max_hawk, $max_anchor);
$chemistry_stmt->fetch();
$chemistry_stmt->close();
}

//chemistry, current
$chemistry_current_stmt = $connection->prepare("SELECT basic, sniper, hunter, catalyst, shadow, engine, deadeye, hawk, anchor FROM chemistry WHERE id=(
    SELECT max(id) FROM chemistry
    )");
$chemistry_current_stmt->execute();
$chemistry_current_stmt->bind_result($current_basic, $current_sniper, $current_hunter, $current_catalyst, $current_shadow, $current_engine, $current_deadeye, $current_hawk, $current_anchor);
$chemistry_current_stmt->fetch();
$chemistry_current_stmt->close();

//chemisty arrays
$anchor_array = [
    "max" => $max_anchor,
    "min" => $min_anchor,
    "current" => $current_anchor
];
$engine_array = [
    "max" => $max_engine,
    "min" => $min_engine,
    "current" => $current_engine
];
$hawk_array = [
    "max" => $max_hawk,
    "min" => $min_hawk,
    "current" => $current_hawk
];
$deadeye_array = [
    "max" => $max_deadeye,
    "min" => $min_deadeye,
    "current" => $current_deadeye
];
$basic_array = [
    "max" => $max_basic,
    "min" => $min_basic,
    "current" => $current_basic
];
$shadow_array = [
    "max" => $max_shadow,
    "min" => $min_shadow,
    "current" => $current_shadow
];
$hunter_array = [
    "max" => $max_hunter,
    "min" => $min_hunter,
    "current" => $current_hunter
];
$catalyst_array = [
    "max" => $max_catalyst,
    "min" => $min_catalyst,
    "current" => $current_catalyst
];
$sniper_array = [
    "max" => $max_sniper,
    "min" => $min_sniper,
    "current" => $current_sniper
];
$chemistrydata = [
    'anchor' => $anchor_array, 
    'hawk' => $hawk_array, 
    'engine' => $engine_array, 
    'deadeye' => $deadeye_array, 
    'basic' => $basic_array, 
    'shadow' => $shadow_array, 
    'hunter' => $hunter_array, 
    'catalyst' => $catalyst_array, 
    'sniper' => $sniper_array
];
//export
$data = [
    'fitness' => $fitnessdata,
    'position' => $positiondata,
    'chemistry' =>$chemistrydata
];
echo json_encode($data);
?>
