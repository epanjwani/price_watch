function setDateAndTime()
{
    let now = new Date();
    $("#container_current_time").html(("Current time: ").concat(now.toTimeString().substring(0,5)));
    $("#container_current_date").html(("Current date: ").concat(now.toString().substring(4,15)));
}