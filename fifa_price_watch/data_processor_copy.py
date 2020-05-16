import json

def processData():
    with open('/home/ep/public_html/price_watch/fifa_price_watch/data.json') as data_file:
        data = json.load(data_file)
        fitnessdata = data['fitness']
        positiondata = data['position']
        chemistrydata = data['chemistry']
        fit = processFitnessData(fitnessdata)
        pos = processPositionData(positiondata)
        chem = processChemistryData(chemistrydata)
        exporter(fit, pos, chem)

def isDateValid(date):
    minute = int(date[3:5])
    if minute == 45 or minute == 15:
        return minute
    else:
        return False

def getNewDate(date, min):
    if (min == 45):
        return (date[0:3] + str(30) + date[5:])
    elif(min == 15):
        return (date[0:3]+ '00' + date[5:])

def getProcessedValue(val_name, i, data, date):
    counter = 0
    sum = 0
    for j in range(-2, 2):
        if ((i-j)<len(data)) and (data[i-j] is not None):
            val = None
            date = None
            for key, value in data[i-j].items():
                date = key
                val = value
            if (isDateValid(date) is False):
                continue
            price = int((val[val_name]).replace(',', ''))           
            sum+=price
            counter+=1
        else:
            continue
    return int(sum/counter)

def processPositionData(data):
    pos_json = {'position' : []}
    for i in range(2, len(data)):
        date = None
        val = None
        newDate = None
        for key, value in data[i].items():
            date = key
            val = value
        if (date is not None):
            min = isDateValid(date)
            if(min == 15):
                newDate = getNewDate(date, 15)
            elif(min == 45):
                newDate = getNewDate(date, 45)
            else:
                continue
        lwb_lb = getProcessedValue('lwb_lb', i, data, date)
        lb_lwb = getProcessedValue('lb_lwb', i, data, date)
        rwb_rb = getProcessedValue('rwb_rb', i, data, date)
        rb_rwb = getProcessedValue('rb_rwb', i, data, date)
        lm_lw = getProcessedValue('lm_lw', i, data, date)
        lw_lm = getProcessedValue('lw_lm', i, data, date)
        rw_rm = getProcessedValue('rw_rm', i, data, date)
        rm_rw = getProcessedValue('rm_rw', i, data, date)
        lw_lf = getProcessedValue('lw_lf', i, data, date)
        lf_lw = getProcessedValue('lf_lw', i, data, date)
        rw_rf = getProcessedValue('rw_rf', i, data, date)
        rf_rw = getProcessedValue('rf_rw', i, data, date)
        cm_cam = getProcessedValue('cm_cam', i, data, date)
        cam_cm = getProcessedValue('cam_cm', i, data, date)
        cdm_cm = getProcessedValue('cdm_cm', i, data, date)
        cm_cdm = getProcessedValue('cm_cdm', i, data, date)
        cam_cf = getProcessedValue('cam_cf', i, data, date)
        cf_cam = getProcessedValue('cf_cam', i, data, date)
        cf_st = getProcessedValue('cf_st', i, data, date)
        st_cf = getProcessedValue('st_cf', i, data, date)
        ind_json = {newDate: {'lwb_lb':lwb_lb, 'lb_lwb':lb_lwb, 'rwb_rb':rwb_rb, 
        'rb_rwb':rb_rwb,'lm_lw':lm_lw,'lw_lm':lw_lm,'rw_rm':rw_rm,'rm_rw':rm_rw,
        'lw_lf':lw_lf,'lf_lw':lf_lw,'rw_rf':rw_rf,'rf_rw':rf_rw,'cm_cam':cm_cam,
        'cam_cm':cam_cm,'cdm_cm':cdm_cm,'cm_cdm':cm_cdm, 'cam_cf':cam_cf,'cf_cam':cf_cam,'cf_st':cf_st,
        'st_cf':st_cf}}
        pos_json['position'].append(ind_json)
    return pos_json

def processFitnessData(data):
    fit_json = {'fitness' : []}
    for i in range(2, len(data)):
        date = None
        val = None
        newDate = None
        for key, value in data[i].items():
            date = key
            val = value
        if (date is not None):
            min = isDateValid(date)
            if(min == 15):
                newDate = getNewDate(date, 15)
            elif(min == 45):
                newDate = getNewDate(date, 45)
            else:
                continue
        goldprice = getProcessedValue('goldsquadfitness', i, data, date)
        silverprice = getProcessedValue('silversquadfitness', i, data, date)
        bronzeprice = getProcessedValue('bronzesquadfitness', i, data, date)
        ind_json = {newDate: {'gold':goldprice, 'silver':silverprice, 'bronze':bronzeprice}}
        fit_json['fitness'].append(ind_json)
    return fit_json

def processChemistryData(data):
    chem_json = {'chemistry' : []}
    for i in range(2, len(data)):
        date = None
        val = None
        newDate = None
        for key, value in data[i].items():
            date = key
            val = value
        if (date is not None):
            min = isDateValid(date)
            if(min == 15):
                newDate = getNewDate(date, 15)
            elif(min == 45):
                newDate = getNewDate(date, 45)
            else:
                continue
        basic = getProcessedValue('basic', i, data, date)
        sniper = getProcessedValue('sniper', i, data, date)
        hunter = getProcessedValue('hunter', i, data, date)
        catalyst = getProcessedValue('catalyst', i, data, date)
        shadow = getProcessedValue('shadow', i, data, date)
        engine = getProcessedValue('engine', i, data, date)
        deadeye = getProcessedValue('deadeye', i, data, date)
        hawk = getProcessedValue('hawk', i, data, date)
        anchor = getProcessedValue('anchor', i, data, date)
        ind_json = {newDate: {'basic':basic, 'sniper':sniper,'hunter':hunter,'catalyst':catalyst,'shadow':shadow,
        'engine':engine, 'deadeye':deadeye,'hawk':hawk,'anchor':anchor}}
        chem_json['chemistry'].append(ind_json)
    return chem_json

def exporter(fit, pos, chem):
    data = {**fit, **pos, **chem}
    with open('/home/ep/public_html/price_watch/fifa_price_watch/processed_data.json', "w") as data_file:
        json.dump(data, data_file)

processData()        



