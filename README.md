# simple-network-storage
Dead simple file storage app over a private network. Store and share files rapidly over the local network without using any cloud service.

### Build 
Install python deps and the build frontend app.

## Server configuration:

1. Ensure server machine is connected to the router with a static private IP.
2. Run ```./serve.sh``` in ```backend/``` to start the file server. Server starts on port 8000

## Access the server on the client:
1. Ensure client is connected to the same private network as the server.
2. Enter <server_ip>:8000 in the client's browser to access the web app.

**Optional**

Create the following entry in the /etc/hosts file of the client machine
```
<server_ip>:8000 <fake_domain_of_your_choice>.com
```
The server can now be accessed using <fake_domain_of_your_choice>.com over the same private network.

You can now upload files to the app from any client and download it from any other.
