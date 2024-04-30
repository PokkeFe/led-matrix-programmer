import usocket as socket
import uselect as select
import ubinascii
import network
from machine import Pin, SPI
import time
import max7219
import config

# Network Setup

sta_if = network.WLAN(network.STA_IF)
sta_if.active(True)
sta_if.connect(config.WIFI_SSID, config.WIFI_PASSWORD)

while not sta_if.isconnected():
    pass

print(sta_if.ifconfig())

print("Connected to Wi-Fi")

# Display Setup
led_pin = Pin("LED", Pin.OUT)
led_pin(1)

spi = SPI(0, baudrate=100000)

display = max7219.Matrix8x8(spi, Pin(17, Pin.OUT), 1)

display.fill(0)
display.brightness(0)
display.show()

# Function to set display from request
def handle_set_display_request(display_hexstring):
    # Reset the display
    display.fill(0)
    
    # Enable the pixels represented in the request bytestring
    bytes = ubinascii.unhexlify(display_hexstring.encode("utf-8"))
    for row in range(8):
        mask = 0b10000000
        x_coord = 0
        byte = bytes[row]
        for col in range(8):
            if byte & mask:
                display.pixel(x_coord, row, 1)
            mask = mask >> 1
            x_coord = x_coord + 1
    
    # Write the framebuffer to the device
    display.show()
    
# Function to handle incoming connections
def handle_request(client):
    
    request = client.recv(1024)
    decoded_request = request.decode("utf-8")

    # Get the desired state
    if b'POST /set' in request:
        body = decoded_request.split('\r\n\r\n')[1]
        handle_set_display_request(body)

    # Send the HTML response with the button
    response = f"""HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n
                  <html><body>
                  <h1>Hello, Pi Pico Web Server!</h1>
                  </body></html>"""

    client.sendall(response)

    # Close the connection
    client.close()


# Set up the server socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind(('0.0.0.0', 80))
server_socket.listen(5)

print("Server started. Listening on port 80")

# Create a list to monitor sockets for readability
sockets = [server_socket]



# Main Loop
while True:
    # Use select to wait for events on the sockets
    readable, _, _ = select.select(sockets, [], [])

    for sock in readable:
        if sock is server_socket:
            # New connection, accept it
            client, addr = server_socket.accept()
            sockets.append(client)
        else:
            # Data received on a client socket, handle the request
            handle_request(sock)
            sockets.remove(sock)

