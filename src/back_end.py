from xml.etree import ElementTree as ET
import urllib2
import htmlPy
import time
from thread import start_new_thread

class BackEnd(htmlPy.Object):
    STATION_1 = '2000119'
    STATION_1_BIKE = 4
    STATION_1_RUN = 9
    STATION_1_STAY = 5

    #STATION_1 = '2000170'
    #STATION_1_BIKE = 3
    #STATION_1_RUN = 5
    #STATION_1_STAY = 15

    STATION_2 = '2000127'
    STATION_2_BIKE = 4
    STATION_2_RUN = 9
    STATION_2_STAY = 15


    def __init__(self, app):
        super(BackEnd, self).__init__()
        self.app = app

    def feed_data(self,station,table,bike_time,run_time,stay_time):
        #First Request
        response = urllib2.urlopen('https://efa.avv-augsburg.de/avv2/XML_DM_REQUEST?sessionID=0&type_dm=any&name_dm='+station+'&itdDateTimeArr=dep')
        xml = response.read()
        tree = ET.fromstring(xml)
        #self.app.html = unicode(tree.get('sessionID'), "utf-8")
        sid = tree.get('sessionID')

        #Secound Request
        response2 = urllib2.urlopen('https://efa.avv-augsburg.de/avv2/XML_DM_REQUEST?sessionID='+sid+'&requestID=1&dmLineSelection=4:0')
        xml2 = response2.read()
        departures_tree = ET.fromstring(xml2)
        hours = departures_tree.find('itdDepartureMonitorRequest').find('itdDateTime').find('itdTime').get('hour')
        if int(hours) < 10:
            hours = '0'+hours
        minutes = departures_tree.find('itdDepartureMonitorRequest').find('itdDateTime').find('itdTime').get('minute')
        if int(minutes) < 10:
            minutes = '0'+minutes
        time = hours+'<blink>'+':'+'</blink>'+minutes
        station_name = departures_tree.find('itdDepartureMonitorRequest').find('itdOdv').find('itdOdvName').find('odvNameElem').text
        self.app.evaluate_javascript("document.getElementById('"+table+"_time').innerHTML = '"+time+"';")
        self.app.evaluate_javascript("document.getElementById('"+table+"_name').innerHTML = '"+station_name+"';")
        #print 'Zeit: ' + time


        count = 1
        for itdDeparture in departures_tree.find('itdDepartureMonitorRequest').find('itdDepartureList'):
            abfahrt_class = ""
            abfahrt = itdDeparture.get('countdown')
            line = itdDeparture.find('itdServingLine').get('number')
            destination = itdDeparture.find('itdServingLine').get('direction')
            count += 1
            if count > 6:
                break

            if int(abfahrt) <= 1:
                #print 'arriving!'
                abfahrt_class = "arriving"
                self.app.evaluate_javascript("cell3 = document.getElementById('"+str(count)+"_"+table+"_time');cell3.className = '"+abfahrt_class+"';cell3.innerHTML = '';")

            else:
                abfahrt_class = "entry"
                self.app.evaluate_javascript("cell3 = document.getElementById('"+str(count)+"_"+table+"_time');cell3.innerHTML = '"+abfahrt+"min';cell3.className = '"+abfahrt_class+"';")

            self.app.evaluate_javascript("cell1 = document.getElementById('"+str(count)+"_"+table+"_line');cell1.innerHTML = '"+line+"';")
            self.app.evaluate_javascript("cell2 = document.getElementById('"+str(count)+"_"+table+"_dest');cell2.innerHTML = '"+destination+"';")

            if int(abfahrt) <= bike_time:
                reach_class = "reach_bad"
            else:
                if int(abfahrt) <= run_time:
                    reach_class = "reach_medium"
                else:
                    if int(abfahrt) <= stay_time:
                        reach_class = "reach_good"
                    else:
                        reach_class = "reach_verygood"

            self.app.evaluate_javascript("cell4 = document.getElementById('"+str(count)+"_"+table+"_reach');cell4.className = '"+reach_class+"';")

        return


    def create_table(self,table):
        for count in range(2, 7):
            self.app.evaluate_javascript("var table = document.getElementById('"+table+"');var row = table.insertRow('"+str(count)+"');row.className = 'entry';row.style.color = '#f19a34';var cell1 = row.insertCell(0);var cell2 = row.insertCell(1);var cell3 = row.insertCell(2);var cell4 = row.insertCell(3);cell1.id = '"+str(count)+"_"+table+"_line';cell2.id = '"+str(count)+"_"+table+"_dest';cell3.id = '"+str(count)+"_"+table+"_time';cell4.id = '"+str(count)+"_"+table+"_reach';")
        return

    @htmlPy.Slot()
    def start_table(self):
        self.create_table('2')
        self.create_table('3')

    def run_request(self):
        self.feed_data(self.STATION_1,'2',self.STATION_1_BIKE,self.STATION_1_RUN,self.STATION_1_STAY)
        self.feed_data(self.STATION_2,'3',self.STATION_2_BIKE,self.STATION_2_RUN,self.STATION_2_STAY)
        #self.feed_data('2000127','3',3,8,15)
        return

    @htmlPy.Slot()
    def start_request(self):
        self.run_request()
