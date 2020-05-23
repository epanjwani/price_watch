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
    if(current_chart)
        current_chart.destroy();
}
