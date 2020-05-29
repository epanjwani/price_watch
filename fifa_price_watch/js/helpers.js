let offset_from_beginning = 0;
let current_chart;
let current_req;
let current_time;
let timezone_offset = new Date().getTimezoneOffset();
let favorites = [];
let sidebar_data;

function checkButtons(data_length, time)
{
    if (offset_from_beginning==0)
        $("#forward_button").hide();
    else
        $("#forward_button").show();
    let currDate = new Date();
    let UTCDate = new Date(currDate.getTime() + 1000*60*60*timezone_offset + 1000*60*60*24*time*(offset_from_beginning-1));
    let startDate = new Date(2020, 4, 7, 03, 0, 0, 0);
    if (startDate.getTime() >= UTCDate.getTime())
        $("#back_button").hide();
    else
        $("#back_button").show();
}
function clearChart()
{
    if (current_chart)
        current_chart.destroy();
}
function updateDisplayText(current_start, current_end)
{
    let displaystr = current_start.concat(" to ", current_end);
    $("#display_text").html(displaystr);
}

function selectedState()
{
    switch(current_req)
    {
        case "fitness":
            $("#fitness_button").addClass("selected");
            break;
        case "position":
            $("#position_button").addClass("selected");
            break;
        case "chemistry":
            $("#chemistry_button").addClass("selected");
            break;
    }
    switch(current_time)
    {
        case 1:
            $("#day_button").addClass("selected");
            break;
        case 7:
            $("#week_button").addClass("selected");
            break;
    }
}

function clearSelectedState(){
    $("#fitness_button").removeClass("selected");
    $("#position_button").removeClass("selected");
    $("#chemistry_button").removeClass("selected");
    $("#day_button").removeClass("selected");
    $("#week_button").removeClass("selected");
}

function clearDivs(){
    $("#fitness_container").empty();
    $("#chemistry_container").empty();
    $("#position_container").empty();
}
function initializeChart()
{
    let select = $("#testchart");
    let this_chart = new Chart(select, {
    type: 'line',
    data: {
        labels: null,
        datasets: null,
    },
    options: {
        maintainAspectRatio: false,
        events: ['click'],
        animation: false,
        spanGaps: true,
        scales: {
            yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Average Lowest BIN Price'
            }
        }]
    },
    },
    });
    current_chart = this_chart;
    getData("fitness", 1);
}