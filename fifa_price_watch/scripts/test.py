import mysql.connector
from mysql.connector import Error
import os
import json

with open('/home/ep/public_html/price_watch/fifa_price_watch/processed_data.json') as data_file:
        data = json.load(data_file)
        fitnessdata = data['fitness']
        positiondata = data['position']
        chemistrydata = data['chemistry']
        for i in range (0, len(fitnessdata)):
            for key, value in fitnessdata[i].items():
                date = key
                gold = value['gold']
                silver = value['silver']
                bronze = value['bronze']
                try:
                    connection = mysql.connector.connect(host='localhost', database='fifa20_consumable_prices', user=os.environ.get('db_user'), password = os.environ.get('db_pass'))
                    if connection.is_connected():
                        db_Info = connection.get_server_info()
                        cursor = connection.cursor()
                        fitness_test = "INSERT INTO fitness (date, bronze_squad_fitness, silver_squad_fitness, gold_squad_fitness) VALUES (%s, %s, %s, %s)"
                        fitness_data = (date, bronze, silver, gold)
                        cursor.execute(fitness_test, fitness_data)
                        connection.commit()
                        print("Connected to MySQL Server version ", db_Info)
                except Error as e:
                    print("Error while connecting to MySQL", e)
                finally:
                    if (connection.is_connected()):
                        connection.close()
                        print("MySQL connection is closed")
        for i in range (0, len(positiondata)):
            for key, value in positiondata[i].items():
                date = key
                lwb_lb = value['lwb_lb']
                lb_lwb = value['lb_lwb']
                rwb_rb = value['rwb_rb']
                rb_rwb = value['rb_rwb']
                lm_lw = value['lm_lw']
                lw_lm = value['lw_lm']
                rw_rm = value['rw_rm']
                rm_rw = value['rm_rw']
                lw_lf = value['lw_lf']
                lf_lw = value['lf_lw']
                rw_rf = value['rw_rf']
                rf_rw = value['rf_rw']
                cm_cam = value['cm_cam']
                cam_cm = value['cam_cm']
                cdm_cm = value['cdm_cm']
                cm_cdm = value['cm_cdm']
                cam_cf = value['cam_cf']
                cf_cam = value['cf_cam']
                cf_st = value['cf_st']
                st_cf = value['st_cf']
                try:
                    connection = mysql.connector.connect(host='localhost', database='fifa20_consumable_prices', user=os.environ.get('db_user'), password = os.environ.get('db_pass'))
                    if connection.is_connected():
                        db_Info = connection.get_server_info()
                        cursor = connection.cursor()
                        position_query = "INSERT INTO position (date, lwb_lb, lb_lwb, rwb_rb, rb_rwb, lm_lw, lw_lm, rw_rm, rm_rw, lw_lf, lf_lw, rw_rf, rf_rw, cm_cam, cam_cm, cdm_cm, cm_cdm, cam_cf, cf_cam, cf_st, st_cf) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                        position_data = (date, lwb_lb, lb_lwb, rwb_rb, rb_rwb, lm_lw, lw_lm, rw_rm, rm_rw, lw_lf, lf_lw, rw_rf, rf_rw, cm_cam, cam_cm, cdm_cm, cm_cdm, cam_cf, cf_cam, cf_st, st_cf)
                        cursor.execute(position_query, position_data)
                        connection.commit()
                        print("Connected to MySQL Server version ", db_Info)
                except Error as e:
                    print("Error while connecting to MySQL", e)
                finally:
                    if (connection.is_connected()):
                        connection.close()
                        print("MySQL connection is closed")
        for i in range (0, len(chemistrydata)):
            for key, value in chemistrydata[i].items():
                date = key
                basic = value['basic']
                sniper = value['sniper']
                hunter = value['hunter']
                catalyst = value['catalyst']
                shadow = value['shadow']
                anchor = value['anchor']
                deadeye = value['deadeye']
                hawk = value['hawk']
                engine = value['engine']
                try:
                    connection = mysql.connector.connect(host='localhost', database='fifa20_consumable_prices', user=os.environ.get('db_user'), password = os.environ.get('db_pass'))
                    if connection.is_connected():
                        db_Info = connection.get_server_info()
                        cursor = connection.cursor()
                        chemistry_query = "INSERT INTO chemistry (date, basic, sniper, hunter, catalyst, shadow, engine, deadeye, hawk, anchor) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                        chem_data = (date, basic, sniper, hunter, catalyst, shadow, engine, deadeye, hawk, anchor)
                        cursor.execute(chemistry_query, chem_data)
                        connection.commit()
                        print("Connected to MySQL Server version ", db_Info)
                except Error as e:
                    print("Error while connecting to MySQL", e)
                finally:
                    if (connection.is_connected()):
                        connection.close()
                        print("MySQL connection is closed")



"""

try:
    connection = mysql.connector.connect(host='localhost', database='fifa20_consumable_prices', user=os.environ.get('db_user'), password = os.environ.get('db_pass'))
    if connection.is_connected():
        db_Info = connection.get_server_info()
        cursor = connection.cursor()
        fitness_test = "INSERT INTO fitness (date, bronze_squad_fitness, silver_squad_fitness, gold_squad_fitness) VALUES (%s, %s, %s, %s)"
        fitness_data = ("15_00_2020_05_16", 600, 700, 750)
        cursor.execute(fitness_test, fitness_data)
        connection.commit()
        print("Connected to MySQL Server version ", db_Info)

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if (connection.is_connected()):
        connection.close()
        print("MySQL connection is closed")

"""

