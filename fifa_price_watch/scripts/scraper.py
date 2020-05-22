from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import datetime
import json

#$ sudo chown -R <user-name> <directory-name> -> this was the line used to write in this file on VS

def getPageSource(url):
    options = Options()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'lxml')
    driver.quit()
    return soup

def fitnessScraper():
    page_source = getPageSource("https://www.futwiz.com/en/consumables/fitness")
    results = page_source.find(id="results").find("tbody")
    rows = results.find_all("tr")
    pricemap = {}
    pricemap["goldsquadfitness"] = rows[0].find('b').text 
    pricemap["silversquadfitness"] = rows[2].find('b').text
    pricemap["bronzesquadfitness"] = rows[4].find('b').text
    return pricemap
    
def positionScraper():
    page_source = getPageSource("https://www.futwiz.com/en/consumables/positions")
    results = page_source.find(id="results").find("tbody")
    rows = results.find_all("tr")
    pricemap = {}
    pricemap["lwb_lb"] = rows[0].find('b').text
    pricemap["lb_lwb"] = rows[1].find('b').text
    pricemap["rwb_rb"] = rows[2].find('b').text
    pricemap["rb_rwb"] = rows[3].find('b').text
    pricemap["lm_lw"] = rows[4].find('b').text
    pricemap["rm_rw"] = rows[5].find('b').text
    pricemap["lw_lm"] = rows[6].find('b').text
    pricemap["rw_rm"] = rows[7].find('b').text
    pricemap["lw_lf"] = rows[8].find('b').text
    pricemap["rw_rf"] = rows[9].find('b').text
    pricemap["lf_lw"] = rows[10].find('b').text
    pricemap["rf_rw"] = rows[11].find('b').text
    pricemap["cm_cam"] = rows[12].find('b').text
    pricemap["cam_cm"] = rows[13].find('b').text
    pricemap["cdm_cm"] = rows[14].find('b').text
    pricemap["cm_cdm"] = rows[15].find('b').text
    pricemap["cam_cf"] = rows[16].find('b').text
    pricemap["cf_cam"] = rows[17].find('b').text
    pricemap["cf_st"] = rows[18].find('b').text
    pricemap["st_cf"] = rows[19].find('b').text
    return pricemap

def chemStyleScraperHelper(tobeformatted): #the inner HTML for the divs containing price for the chem style page includes time since update, so needs to be reformatted
    p_index = tobeformatted.index('(')
    first = tobeformatted[1:p_index-1]
    return first.replace(',', '')

def chemStyleScraper():
    page_source = getPageSource("https://www.futwiz.com/en/consumables/chemistry-styles")
    results = page_source.find_all(class_="mb-20")
    pricemap = {}
    pricemap["basic"] = chemStyleScraperHelper(results[0].find(style="font-family:'DIN Pro Condensed Bold';").text)
    pricemap["sniper"] = chemStyleScraperHelper(results[1].find(style="font-family:'DIN Pro Condensed Bold';").text)
    pricemap["deadeye"] = chemStyleScraperHelper(results[3].find(style="font-family:'DIN Pro Condensed Bold';").text)
    pricemap["hawk"] = chemStyleScraperHelper(results[5].find(style="font-family:'DIN Pro Condensed Bold';").text)
    pricemap["engine"] = chemStyleScraperHelper(results[10].find(style="font-family:'DIN Pro Condensed Bold';").text)
    pricemap["anchor"] = chemStyleScraperHelper(results[15].find(style="font-family:'DIN Pro Condensed Bold';").text)
    pricemap["hunter"] = chemStyleScraperHelper(results[16].find(style="font-family:'DIN Pro Condensed Bold';").text)
    pricemap["catalyst"] = chemStyleScraperHelper(results[17].find(style="font-family:'DIN Pro Condensed Bold';").text)
    pricemap["shadow"] = chemStyleScraperHelper(results[18].find(style="font-family:'DIN Pro Condensed Bold';").text)
    return pricemap
    
def exporter():
    chem_dict = chemStyleScraper()
    pos_dict = positionScraper()
    fit_dict = fitnessScraper()
    date_time = datetime.datetime.now().strftime("%H_%M_%Y_%m_%d") #utc time, need to adjust on front-end for user
    fitnessjson = {date_time : fit_dict}
    positionjson = {date_time : pos_dict}
    chemistryjson = {date_time : chem_dict}
    data = {}
    with open('/home/ep/public_html/price_watch/fifa_price_watch/data/data.json') as data_file:
        data = json.load(data_file)
        fit = data['fitness']
        fit.append(fitnessjson)
        pos = data['position']
        pos.append(positionjson)
        chem = data['chemistry']
        chem.append(chemistryjson)
    with open('/home/ep/public_html/price_watch/fifa_price_watch/data/data.json', "w") as data_file:
        json.dump(data, data_file)
        
exporter()



