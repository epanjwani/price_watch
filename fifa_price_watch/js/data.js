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
            updateDisplayText(data['date'][0], data['date'][data['date'].length -1]);
            checkButtons(data.length, length);
            if (type == "fitness")
                generateFitnessChart(data['date'], data['bronze'], data['silver'], data['gold']);
            else if (type == "position")
                generatePositionChart(data['date'], data['lwb_lb'], data['lb_lwb'], data['rwb_rb'], data['rb_rwb'], data['lm_lw'], data["lw_lm"], data["rw_rm"], data["rm_rw"], data['lw_lf'], data['lf_lw'], data['rw_rf'], data['rf_rw'], data['cm_cam'], data['cam_cm'], data['cam_cf'], data['cf_cam'], data['cm_cdm'], data['cdm_cm'], data['cf_st'], data['st_cf']);
            else if (type == "chemistry")
                generateChemistryChart(data['date'], data['anchor'], data['hawk'], data['engine'], data['deadeye'], data['basic'], data['shadow'], data['hunter'], data['catalyst'], data['sniper']);
        }
    });
}

function getSidebarData()
{
    let initial = new Date();
    initial.setHours(0);
    initial.setMinutes(0);
    let initial_utc = initial.toUTCString();
    let request_url = ("http://ec2-18-188-83-141.us-east-2.compute.amazonaws.com/~ep/price_watch/fifa_price_watch/php/getsidebardata.php").concat(
    "?initial_utc=", initial_utc); 
    $.ajax({
        method: "GET",
        url: request_url,
        success: function(unparsed_data){
            data = JSON.parse(unparsed_data);
            for (let key in data)
            {
                for (let innerkey in data[key])
                    createDataDiv(key, innerkey, (data[key])[innerkey])
            }
        }
    });
}
