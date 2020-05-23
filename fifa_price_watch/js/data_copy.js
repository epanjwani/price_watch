function getData(type, length)
{
    current_time = length;
    current_req = type;
    clearChart();
    let now = new Date();
    timezone_offset = now.getTimezoneOffset()/60;
    let startTime = (new Date(now.getTime() - 1000*60*60*24*length + 1000*60*60*24*length*offset_from_beginning)).toUTCString();
    let increments = (2*24*length).toString();
    let request_url = ("http://ec2-18-188-83-141.us-east-2.compute.amazonaws.com/~ep/price_watch/fifa_price_watch/php/getdata.php").concat(
    "?startTime=", startTime, "&increments=", increments, "&table=", type, "&offset=", timezone_offset);
    $.ajax({
        method: "GET",
        url: request_url,
        success: function(unparsed_data){
            data = JSON.parse(unparsed_data);
            if (type == "fitness")
                generateFitnessChart(data[0], data[3], data[2], data[1]);
            else if (type == "position")
                generatePositionChart(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12], data[13], data[14], data[15], data[16], data[17], data[18], data[19], data[20]);
            else if (type == "chemistry")
                generateChemistryChart(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9]);
        }
    });
}
