let offset_from_beginning = 0;
let current_chart;
let current_req;
let current_time;
let timezone_offset = new Date().getTimezoneOffset();

function checkButtons(data_length, time)
{
    if (offset_from_beginning==0)
        $("#forward_button").hide();
    else
        $("#forward_button").show();
    let pageCounter = -1*Math.floor(data_length/(time*48));
    if (offset_from_beginning==pageCounter)
        $("#back_button").hide();
    else
        $("#back_button").show();
}
function clearChart()
{
    $("#chart_div").empty();
}
function createCanvas()
{
    $("#chart_div").append('<canvas id = "testchart" width="500" height="500"></canvas>');
}
