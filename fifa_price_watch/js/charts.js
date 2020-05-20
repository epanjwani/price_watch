function generateFitnessChart(dates, bronze, silver, gold)
{
    createCanvas();
    let select = $("#testchart")
    currentchart = new Chart(select, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Bronze Squad Fitness',
            data: bronze,
            borderColor: "#cd7f32",
            fill: false
        },
        {
            label: 'Silver Squad Fitness',
            data: silver,
            borderColor: "#C0C0C0",
            fill: false
        },
        {
            label: 'Gold Squad Fitness',
            data: gold,
            borderColor: "#FFD700",
            fill:false
        }]
    },
    options: {
        maintainAspectRatio: false,
        events: ['click'],
        animation: false,
    },
    });
}

function generatePositionChart(dates_array, lwb_lb_array, lb_lwb_array, rwb_rb_array, rb_rwb_array, lm_lw_array, 
lw_lm_array, rw_rm_array, rm_rw_array, lw_lf_array, lf_lw_array, rw_rf_array, rf_rw_array, cm_cam_array, cam_cm_array, 
cm_cdm_array, cam_cf_array, cf_cam_array, cdm_cm_array, cf_st_array, st_cf_array)
{
    createCanvas();
    let select = $("#testchart")
    currentchart = new Chart(select, {
    type: 'line',
    data: {
        labels: dates_array,
        datasets: [{
            label: 'LWB -> LB',
            data: lwb_lb_array,
            borderColor: "#ABDEE6",
            fill: false
        },
        {
            label: 'LB -> LWB',
            data: lb_lwb_array,
            borderColor: "#CBAACB",
            fill: false
        },
        {
            label: 'RWB -> RB',
            data: rwb_rb_array,
            borderColor: "#FFFFBS",
            fill: false
        },
        {
            label: 'RB -> RWB',
            data: rb_rwb_array,
            borderColor: "#FFCCB6",
            fill: false
        },
        {
            label: 'LM -> LW',
            data: lm_lw_array,
            borderColor: "#C6DBDA",
            fill: false
        },
        {
            label: 'LW -> LM',
            data: lw_lm_array,
            borderColor: "#F6EAC2",
            fill: false
        },
        {
            label: 'RW -> RM',
            data: rw_rm_array,
            borderColor: "#FF968A",
            fill: false
        },
        {
            label: 'RM -> RW',
            data: rm_rw_array,
            borderColor: "#D4F0F0",
            fill: false
        },
        {
            label: 'LW -> LF',
            data: lw_lf_array,
            borderColor: "#CCE2CB",
            fill: false
        },
        {
            label: 'LF -> LW',
            data: lf_lw_array,
            borderColor: "#97C1A9",
            fill: false
        },
        {
            label: 'RW -> RF',
            data: rw_rf_array,
            borderColor: "#ECEAE4",
            fill: false
        },
        {
            label: 'RF -> RW',
            data: rf_rw_array,
            borderColor: "#55CBCD",
            fill: false
        },
        {
            label: 'CM -> CAM',
            data: cm_cam_array,
            borderColor: "#445A67",
            fill: false
        },
        {
            label: 'CAM -> CM',
            data: cam_cm_array,
            borderColor: "#50B4D8",
            fill: false
        },
        {
            label: 'CM -> CDM',
            data: cm_cdm_array,
            borderColor: "#D7E2EA",
            fill: false
        },
        {
            label: 'CDM -> CM',
            data: cdm_cm_array,
            borderColor: "#6E7B8F",
            fill: false
        },
        {
            label: 'CAM -> CF',
            data: cam_cf_array,
            borderColor: "#B7EAF7",
            fill: false
        },
        {
            label: 'CF -> CAM',
            data: cf_cam_array,
            borderColor: "#187B30",
            fill: false
        },
        {
            label: 'CF -> ST',
            data: cf_st_array,
            borderColor: "#B30019",
            fill: false
        },
        {
            label: 'ST -> CF',
            data: st_cf_array,
            borderColor: "#BC7576",
            fill: false
        }]
    },
    options: {
        maintainAspectRatio: false,
        events: ['click'],
        animation: false,
    },
    });
}
function generateChemistryChart(dates_array, anchor_array, engine_array, shadow_array, deadeye_array, basic_array,
hunter_array, catalyst_array, hawk_array, sniper_array)
{
    createCanvas();
    let select = $("#testchart")
    currentchart = new Chart(select, {
    type: 'line',
    data: {
        labels: dates_array,
        datasets: [{
            label: 'Basic',
            data: basic_array,
            borderColor: "#ABDEE6",
            fill: false
        },
        {
            label: 'Anchor',
            data: anchor_array,
            borderColor: "#CBAACB",
            fill: false
        },
        {
            label: 'Engine',
            data: engine_array,
            borderColor: "#FFFFBS",
            fill: false
        },
        {
            label: 'Hawk',
            data: hawk_array,
            borderColor: "#187B30",
            fill: false
        },
        {
            label: 'Deadeye',
            data: deadeye_array,
            borderColor: "#ECEAE4",
            fill: false
        },
        {
            label: 'Sniper',
            data: sniper_array,
            borderColor: "#B30019",
            fill: false
        },
        {
            label: 'Shadow',
            data: shadow_array,
            borderColor: "#55CBCD",
            fill: false
        },
        {
            label: 'Catalyst',
            data: catalyst_array,
            borderColor: "#BC7576",
            fill: false
        },
        {
            label: 'Hunter',
            data: hunter_array,
            borderColor: "#FF968A",
            fill: false
        }]
    },
    options: {
        maintainAspectRatio: false,
        events: ['click'],
        animation: false,
    },
    });
}