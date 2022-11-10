from bs4 import BeautifulSoup
import requests
import os
import sys

def get_datas(web_site):
    if ("://www." in web_site):
        site = web_site.split("://www.")[1].split(".")[0]
        site = site+ "-"+ web_site.split("://www.")[1].split(".")[1].split("/")[0]
    else:
        site = site = web_site.split("://")[1].split(".")[0]
        site = site+ "-"+ web_site.split("://")[1].split(".")[1].split("/")[0]
    link = "https://www.websitecarbon.com/website/"+site
    sock = requests.get(link)
    htmlSource = sock.content 
    sock.close()
    # soup = BeautifulSoup(htmlSource,'html.parser')
    soup = BeautifulSoup(htmlSource,"html5lib")                                                                       
    #GET if report is dirtier or cleaner + percent 
    report = soup.find("p",{"class":"report-summary__heading"})
    percent = str(soup.find("div",{"class":"media__content"}).find("span",{"class":"js-countup"}))
    percent = percent.split('data-count="')[1].split('"')[0]
    if ("cleaner" in (report.text.lower())):
        bilan = "Cleaner than "
    else:
        bilan = "Dirtier than "
    bilan = bilan + percent + "% than other website."

    #GET carbon by visit 
    carbon_by_visit = str(soup.find("span",{"class":"report-carbon__amount highlight"}))
    carbon_by_visit = carbon_by_visit.split('data-count="')[1].split('"')[0]

    # GET energy by visit 1 kg CO2  =  4.289 KWH
    energy_by_visit = (float(carbon_by_visit)/1000)*4.289
    
    # write on .txt file
    file = open("datas.txt","w+")
    file.write(bilan+"\n"+carbon_by_visit+"g of CO2."+"\n"+str(energy_by_visit)+"kW/h")
    file.close()
    
    print(bilan+"<br>"+carbon_by_visit+":g of CO2."+"<br>"+str(energy_by_visit)+":kW/h<br>"+site)
    

get_datas(sys.argv[1])