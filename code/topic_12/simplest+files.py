import socket

HOST, PORT = '', 8080

listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
listen_socket.bind((HOST, PORT))
listen_socket.listen(1)
print(f'Serving HTTP on port {PORT} ...')
while True:
    client_connection, client_address = listen_socket.accept()
    request_data = client_connection.recv(1024).decode('utf-8')
    print(request_data)

    infile = open('httpdocs/index.html')
    content = infile.read()
    infile.close()

    http_response = ("HTTP/1.1 200 OK\n\n"+content).encode() 
    client_connection.sendall(http_response)
    client_connection.close()
listen_socket.close()

