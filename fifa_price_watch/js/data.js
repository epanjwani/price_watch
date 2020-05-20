function getData(req, time)//time in days, pass in as 7 for week
{
    current_time = time;
    current_req = req;
    clearChart();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200)
        {
            let data = JSON.parse(this.responseText);
            console.log("Data successfully parsed from server");
            if (req == "fitness")
            {
                let fitnessdata = data.fitness;
                checkButtons(fitnessdata.length, time);
                processData(fitnessdata, "fitness", time);
            }
            else if (req == "position")
            {
                let positiondata = data.position;
                checkButtons(positiondata.length, time);
                processData(positiondata, "position", time);
            }
            else if (req == "chemistry")
            {
                let chemistrydata = data.chemistry;
                checkButtons(chemistrydata.length, time);
                processData(chemistrydata, "chemistry", time);
            }
        }
    };
    xhttp.open("GET", "processed_data.json");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}
function getDateObject(date_str)
{
    let hour = date_str.substring(0,2);
    let minute = date_str.substring(3,5);
    let year = date_str.substring(6,10);
    let month_num = date_str.substring(11,13);
    let day = date_str.substring(14,16);
    let date = new Date();
    date.setFullYear(year);
    date.setHours(hour);
    date.setMinutes(minute);
    date.setDate(day);
    date.setMonth(((month_num-1)+12)%12);
    return date;
}
function processData(data, req, time)
{
    let dates_array = [];
    if (req == "fitness")
    {
        let bronze_array = [];
        let silver_array = [];
        let gold_array = [];
        let days_data;
        if (offset_from_beginning == 0)
            days_data = data.slice(-2*24*time);
        else
            days_data = data.slice((((offset_from_beginning*-1)+1)*-2*24*time), ((offset_from_beginning*-1)*-2*24*time));
        for (let i = 0; i < days_data.length; i++)
        {
            let dict = days_data[i];
            let dateLabel;
            for (let key in dict)
            {
                gold_array.push(dict[key].gold);
                silver_array.push(dict[key].silver);
                bronze_array.push(dict[key].bronze);
                dateLabel = generateDateLabel(key);
            }
            dates_array.push(dateLabel);
        }
        generateFitnessChart(dates_array, bronze_array, silver_array, gold_array);       
    }
    else if (req == "position")
    {
        let lwb_lb_array = []
        let lb_lwb_array = []
        let rwb_rb_array = []
        let rb_rwb_array = []
        let lm_lw_array = []
        let lw_lm_array = []
        let rw_rm_array = []
        let rm_rw_array = []
        let lw_lf_array = []
        let lf_lw_array = []
        let rw_rf_array = []
        let rf_rw_array = []
        let cm_cam_array = []
        let cam_cm_array = []
        let cm_cdm_array = []
        let cam_cf_array = []
        let cf_cam_array = []
        let cdm_cm_array = []
        let cf_st_array = []
        let st_cf_array = []
        let days_data;
        if (offset_from_beginning == 0)
            days_data = data.slice(-2*24*time);
        else
            days_data = data.slice((((offset_from_beginning*-1)+1)*-2*24*time), ((offset_from_beginning*-1)*-2*24*time));
        for (let i = 0; i < days_data.length; i++)
        {
            let dict = days_data[i];
            let dateLabel;
            for (let key in dict)
            {
                lwb_lb_array.push(dict[key].lwb_lb);
                lb_lwb_array.push(dict[key].lb_lwb);
                rwb_rb_array.push(dict[key].rwb_rb);
                rb_rwb_array.push(dict[key].rb_rwb);
                lm_lw_array.push(dict[key].lm_lw);
                lw_lm_array.push(dict[key].lw_lm);
                rw_rm_array.push(dict[key].rw_rm);
                rm_rw_array.push(dict[key].rm_rw);
                lw_lf_array.push(dict[key].lw_lf);
                lf_lw_array.push(dict[key].lf_lw);
                rw_rf_array.push(dict[key].rw_rf);
                rf_rw_array.push(dict[key].rf_rw);
                cm_cam_array.push(dict[key].cm_cam);
                cam_cm_array.push(dict[key].cam_cm);
                cm_cdm_array.push(dict[key].cm_cdm);
                cdm_cm_array.push(dict[key].cdm_cm);
                cam_cf_array.push(dict[key].cam_cf);
                cf_cam_array.push(dict[key].cf_cam);
                cf_st_array.push(dict[key].cf_st);
                st_cf_array.push(dict[key].st_cf);
                dateLabel = generateDateLabel(key);
            }
            dates_array.push(dateLabel);
        }
        generatePositionChart(dates_array, lwb_lb_array, lb_lwb_array, rwb_rb_array, rb_rwb_array, lm_lw_array, 
        lw_lm_array, rw_rm_array, rm_rw_array, lw_lf_array, lf_lw_array, rw_rf_array, rf_rw_array, cm_cam_array, 
        cam_cm_array, cm_cdm_array, cam_cf_array, cf_cam_array, cdm_cm_array, cf_st_array, st_cf_array);
    }
    else if (req == "chemistry")
    {
        let anchor_array = []
        let engine_array = []
        let shadow_array = []
        let deadeye_array = []
        let basic_array = []
        let hunter_array = []
        let catalyst_array = []
        let hawk_array = []
        let sniper_array = []
        let days_data;
        if (offset_from_beginning == 0)
            days_data = data.slice(-2*24*time);
        else
            days_data = data.slice((((offset_from_beginning*-1)+1)*-2*24*time), ((offset_from_beginning*-1)*-2*24*time));
        for (let i = 0; i < days_data.length; i++)
        {
            let dict = days_data[i];
            let dateLabel;
            for (let key in dict)
            {
                anchor_array.push(dict[key].anchor);
                engine_array.push(dict[key].engine);
                shadow_array.push(dict[key].shadow);
                deadeye_array.push(dict[key].deadeye);
                basic_array.push(dict[key].basic);
                hunter_array.push(dict[key].hunter);
                catalyst_array.push(dict[key].catalyst);
                hawk_array.push(dict[key].hawk);
                sniper_array.push(dict[key].sniper);
                dateLabel = generateDateLabel(key);
            }
            dates_array.push(dateLabel);
        }
        generateChemistryChart(dates_array, anchor_array, engine_array, shadow_array, deadeye_array, basic_array,
        hunter_array, catalyst_array, hawk_array, sniper_array);
    }
}
function generateQuery(date)
{
    let year = date.getFullYear().toString();
    let check_month = date.getMonth() + 1;
    if (check_month == 12)
        check_month = 0;
    let month = getStr(check_month);
    let day = getStr(date.getDate());
    let hour = getStr(date.getHours());
    let minute = getStr(date.getMinutes());
    let query = hour.concat("_", minute, "_", year, "_", month, "_", day);
    return query;
}
function generateDateLabel(query)
{
    let temp_date = getDateObject(query);
    let adjusted_date = new Date(temp_date.getTime()-1000*60*timezone_offset);
    let minute = adjusted_date.getMinutes().toString();
    if (minute == "0")
        minute = "00";
    let hour = adjusted_date.getHours().toString();
    if (hour == "0")
        hour = "00"
    let day = adjusted_date.getDate().toString();
    let month = (adjusted_date.getMonth()+1).toString();
    let year = adjusted_date.getFullYear().toString();
    switch(parseInt(month)){
        case 1:
            month = "January";
            break;
        case 2:
            month = "February";
            break;
        case 3:
            month = "March";
            break;
        case 4:
            month = "April";
            break;
        case 5:
            month = "May";
            break;
        case 6:
            month = "June";
            break;
        case 7:
            month = "July";
            break;
        case 8:
            month = "August";
            break;
        case 9:
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 12:
            month = "December";
            break;
    }
    let retstr = month.concat(" ", day, ", ", year, " ", hour, ":", minute);
    return retstr;
}
function getStr(num)
{
    if (num < 10)
        return '0'.concat(num.toString());
    else
        return num.toString();
}