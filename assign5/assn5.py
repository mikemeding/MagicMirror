 #!/usr/bin/python3

#required libraries
import sys                                 
import ssl
import json
import paho.mqtt.client as mqtt

# for motion pir_pin
import RPi.GPIO as GPIO
import time
from datetime import datetime


#called while client tries to establish connection with the server 
def on_connect(mqttc, obj, flags, rc):
    if rc==0:
        print ("Subscriber Connection status code: " + str(rc) + " | Connection status: successful")
        mqttc.subscribe("$aws/things/MagicMirror/shadow/update/acceptd", qos=0)
    elif rc==1:
        print ("Subscriber Connection status code: " + str(rc) + " | Connection status: Connection refused")

#called when a topic is successfully subscribed to
def on_subscribe(mqttc, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos) + " Data: " + str(obj))

#called when a message is received by a topic
def on_message(mqttc, obj, msg):
    print("Received message from topic: " + msg.topic + " | QoS: " + str(msg.qos) + " | Data Received: " + str(msg.payload))

#creating a client with client-id=mqtt-test
mqttc = mqtt.Client(client_id="mqtt-mirror")

mqttc.on_connect = on_connect
mqttc.on_subscribe = on_subscribe
mqttc.on_message = on_message

#Configure network encryption and authentication options. Enables SSL/TLS support.
#adding client-side certificates and enabling tlsv1.2 support as required by aws-iot service
mqttc.tls_set(ca_certs="/home/pi/AWSiot/certs/rootCA.pem.crt",
              certfile="/home/pi/AWSiot/certs/67e5ff5ad1-certificate.pem.crt",
              keyfile="/home/pi/AWSiot/certs/67e5ff5ad1-private.pem.key",
              tls_version=ssl.PROTOCOL_TLSv1_2, 
              ciphers=None)

#connecting to aws-account-specific-iot-endpoint
mqttc.connect("A3KYXDU6ZKR6VS.iot.us-west-2.amazonaws.com", port=8883) #AWS IoT service hostname and portno

#automatically handles reconnecting
#start a new thread handling communication with AWS IoT
mqttc.loop_start()

pir_pin = 8

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(pir_pin,GPIO.IN)

rc=0
try:
    while rc == 0:
        i = GPIO.input(pir_pin)
        print(i)     # i = 1: Motion detected; i = 0: No Motion
        data={}
        data['motion']=i
        data['time']=datetime.now().strftime('%Y/%m/%d %H:%M:%s')
        playload = '{"state":{"reported":' + json.dumps(data) + '}}'
        print(playload)

        #the topic to publish to
        #the names of these topics start with $aws/things/thingName/shadow.
        msg_info = mqttc.publish("$aws/things/MagicMirror/shadow/update", playload, qos=1)


        time.sleep(1.5)  

except KeyboardInterrupt:
    pass

GPIO.cleanup()