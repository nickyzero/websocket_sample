# websocket_sample
This is a sample web application for webOS. 
You can learn about how to use websocket in web application and how to use lunaservice api for web application.

This sample is not including websocket server. If you want to run this sample application completely, you must have or know an websocket serverenvironment.  

# Setting CLI and environment
You have to install CLI and set environment before packaging, installing and launching.
* http://webosose.org/develop/sdk-tools/cli/overview/

# Modifying application
You have to modify websocket server's URI on websocket.js before packaging your application. 

# Packaging application
You can make a package this application using CLI command
> websocket_sample$ ares-package .

# Installing application
You can install application package to webOS. The target is a name of device. 
> websocket_sample$ ares-install -d target com.sample.websocket_1.0.0_all.ipk

# Launching application
You can run the application remotely.
> websocket_sample$ ares-launch -d target com.sample.websocket
