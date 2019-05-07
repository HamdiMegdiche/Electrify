#include <WiFiEsp.h>
#include <WiFiEspClient.h>
#include <WiFiEspUdp.h>
#include <SoftwareSerial.h>
#include <PubSubClient.h>
#include <SPI.h>
#include <SPI.h>
#include <RFID.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

IPAddress server(172,20,10,4);
char ssid[] = "Ska"; // your network SSID (name)
char pass[] = "skander2"; // your network password
int status = WL_IDLE_STATUS; // the Wifi radio's status
//char server[] =  "172.20.10.5";
// Initialize the Ethernet client object
WiFiEspClient espclient;
SoftwareSerial soft(9, 8); // RX, TX
// RFID pins
#define SS_PIN 7
#define RST_PIN 6

RFID rfid(SS_PIN, RST_PIN);

//----------------------------


int serNum0;
int serNum1;
int serNum2;
int serNum3;
int serNum4;
String card = "";

void setup() {
  // initialize serial for debugging

  Serial.begin(9600);
  // initialize serial for ESP module
  lcd.begin();
  lcd.backlight();

  soft.begin(9600);
  // initialize ESP module
  WiFi.init(&soft);
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    while (true);
  }
  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Connecting..");

    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);
  }
  // you're connected now, so print out the data
  Serial.println("You're connected to the network");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connected");

  /******************************************/
  SPI.begin();
  rfid.init();


}

void loop() {

  // Fill the sensorReading with the information from sensor
  // Connect to the server (your computer or web page)

  if (rfid.isCard()) {
    if (rfid.readCardSerial()) {
      if (rfid.serNum[0] != serNum0
          && rfid.serNum[1] != serNum1
          && rfid.serNum[2] != serNum2
          && rfid.serNum[3] != serNum3
          && rfid.serNum[4] != serNum4
         ) {
        /* With a new cardnumber, show it. */
        Serial.println(" ");
        Serial.println("Card found");
        serNum0 = rfid.serNum[0];
        serNum1 = rfid.serNum[1];
        serNum2 = rfid.serNum[2];
        serNum3 = rfid.serNum[3];
        serNum4 = rfid.serNum[4];

        //Serial.println(" ");
        Serial.println("Cardnumber:");
        Serial.print("Dec: ");
        Serial.print(rfid.serNum[0], DEC);
        Serial.print(".");
        Serial.print(rfid.serNum[1], DEC);
        Serial.print(".");
        Serial.print(rfid.serNum[2], DEC);
        Serial.print(".");
        Serial.print(rfid.serNum[3], DEC);
        Serial.print(".");
        Serial.println(rfid.serNum[4], DEC);
        card = String(serNum0) + "." + String(serNum1) + "." + String(serNum2) + String(serNum3) + "." + String(serNum4);
        Serial.println("card: " + card);
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print(card);

        //------------------------------sending ----------------------
        // Fill the sensorReading with the information from sensor
        // Connect to the server (your computer or web page)

        espclient.println("GET /arduino/sk/00000123"); // This

        if (espclient.connect(server, 4000)) {
          espclient.println("GET /arduino/auth/" + card); // This
          espclient.println(); // Empty line
          //espclient.println(); // Empty line
          String line = espclient.readString();
          Serial.print("response: ");
          Serial.println(line);
                         lcd.clear();
                         lcd.setCursor(0, 0);
                         lcd.print("Refreshing..");

                         espclient.println("Connection: close");
                         espclient.stop();    // Closing connection to server
        } else {
          // If Arduino can't connect to the server (your computer or web page)
          Serial.println("--> connection failed\n");
        }

      } else {
        /* If we have the same ID, just write a dot. */
        Serial.print(".");
      }
    }
  }

  rfid.halt();


}
