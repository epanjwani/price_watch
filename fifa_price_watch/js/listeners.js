$(document).ready(function(){
    getData("fitness", 1);
});
$("#fitness_button").click(function(){
    getData("fitness", 1);
});
$("#chemistry_button").click(function(){
    getData("chemistry", 1);
});
$("#position_button").click(function(){
    getData("position", 1);
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
