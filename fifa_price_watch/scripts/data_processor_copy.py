import json
import mysql.connector
from mysql.connector import Error
import os

def processData():
    with open('/home/ep/public_html/price_watch/fifa_price_watch/data/data.json') as data_file:
        data = json.load(data_file)
        fitnessdata = (data['fitness'])[-3:]
        positiondata = (data['position'])[-3:]
        chemistrydata = (data['chemistry'])[-3:]
        fit = processFitnessData(fitnessdata)
        chem = processChemistryData(chemistrydata)
        pos = processPositionData(positiondata)
        try:
            connection = mysql.connector.connect(host='localhost', database='fifa20_consumable_prices', user=os.environ.get('db_user'), password = os.environ.get('db_pass'))
            if connection.is_connected():
                db_Info = connection.get_server_info()
                cursor = connection.cursor()
                fitness_query = "INSERT INTO fitness (date, bronze_squad_fitness, silver_squad_fitness, gold_squad_fitness) VALUES (%s, %s, %s, %s)"
                position_query = "INSERT INTO position (date, lwb_lb, lb_lwb, rwb_rb, rb_rwb, lm_lw, lw_lm, rw_rm, rm_rw, lw_lf, lf_lw, rw_rf, rf_rw, cm_cam, cam_cm, cdm_cm, cm_cdm, cam_cf, cf_cam, cf_st, st_cf) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                chemistry_query = "INSERT INTO chemistry (date, basic, sniper, hunter, catalyst, shadow, engine, deadeye, hawk, anchor) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(fitness_query, fit)
                cursor.execute(position_query, pos)
                cursor.execute(chemistry_query, chem)
                connection.commit()
                print("Connected to MySQL Server version ", db_Info)
        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            if (connection.is_connected()):
                connection.close()
                print("MySQL connection is closed")

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

def getProcessedValue(val_name, data):
    sum = 0
    for key, val in data[0].items():
        sum += int(val[val_name].replace(',', ''))
    for key, val in data[1].items():
        sum += int(val[val_name].replace(',', ''))
    for key, val in data[2].items():
        sum += int(val[val_name].replace(',', ''))
    return int(sum/3)

def processFitnessData(data):
    date = None
    newDate = None
    for key, value in data[2].items():
        date = key
    if (date is not None):
        min = isDateValid(date)
        if(min == 15):
            newDate = getNewDate(date, 15)
        elif(min == 45):
            newDate = getNewDate(date, 45)
    goldprice = getProcessedValue('goldsquadfitness', data)
    silverprice = getProcessedValue('silversquadfitness', data)
    bronzeprice = getProcessedValue('bronzesquadfitness', data)
    ret = (newDate, bronzeprice, silverprice, goldprice)
    return ret

def processPositionData(data):
    date = None
    newDate = None
    for key, value in data[2].items():
        date = key
    if (date is not None):
        min = isDateValid(date)
        if(min == 15):
            newDate = getNewDate(date, 15)
        elif(min == 45):
            newDate = getNewDate(date, 45)
    lwb_lb = getProcessedValue('lwb_lb', data)
    lb_lwb = getProcessedValue('lb_lwb', data)
    rwb_rb = getProcessedValue('rwb_rb', data)
    rb_rwb = getProcessedValue('rb_rwb', data)
    lm_lw = getProcessedValue('lm_lw', data)
    lw_lm = getProcessedValue('lw_lm', data)
    rw_rm = getProcessedValue('rw_rm', data)
    rm_rw = getProcessedValue('rm_rw', data)
    lw_lf = getProcessedValue('lw_lf', data)
    lf_lw = getProcessedValue('lf_lw', data)
    rw_rf = getProcessedValue('rw_rf', data)
    rf_rw = getProcessedValue('rf_rw', data)
    cm_cam = getProcessedValue('cm_cam', data)
    cam_cm = getProcessedValue('cam_cm', data)
    cdm_cm = getProcessedValue('cdm_cm', data)
    cm_cdm = getProcessedValue('cm_cdm', data)
    cam_cf = getProcessedValue('cam_cf', data)
    cf_cam = getProcessedValue('cf_cam', data)
    cf_st = getProcessedValue('cf_st', data)
    st_cf = getProcessedValue('st_cf', data)
    ret = (newDate, lwb_lb, lb_lwb, rwb_rb, rb_rwb, lm_lw, lw_lm, rw_rm, rm_rw, lw_lf, lf_lw, rw_rf, rf_rw, cm_cam, cam_cm, cdm_cm, cm_cdm, cam_cf, cf_cam, cf_st, st_cf)
    return ret

def processChemistryData(data):
    date = None
    newDate = None
    for key, value in data[2].items():
        date = key
    if (date is not None):
        min = isDateValid(date)
        if(min == 15):
            newDate = getNewDate(date, 15)
        elif(min == 45):
            newDate = getNewDate(date, 45)
    basic = getProcessedValue('basic', data)
    sniper = getProcessedValue('sniper', data)
    hunter = getProcessedValue('hunter', data)
    catalyst = getProcessedValue('catalyst', data)
    shadow = getProcessedValue('shadow', data)
    engine = getProcessedValue('engine', data)
    deadeye = getProcessedValue('deadeye', data)
    hawk = getProcessedValue('hawk', data)
    anchor = getProcessedValue('anchor', data)
    ret = (newDate, basic, sniper, hunter, catalyst, shadow, engine, deadeye, hawk, anchor)
    return ret

processData()

