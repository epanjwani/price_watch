$(document).ready(function(){
    initializeChart();
    getSidebarData();
});
$("#fitness_button").click(function(){
    getData("fitness", current_time);
});
$("#chemistry_button").click(function(){
    getData("chemistry", current_time);
});
$("#position_button").click(function(){
    getData("position", current_time);
});
$("#day_button").click(function(){
    offset_from_beginning=0;
    getData(current_req, 1);
});
$("#week_button").click(function(){
    offset_from_beginning=0;
    getData(current_req, 7);
});
$("#back_button").click(function(){
    offset_from_beginning--;
    getData(current_req, current_time);
});
$("#forward_button").click(function(){
    offset_from_beginning++;
    getData(current_req, current_time);
});
