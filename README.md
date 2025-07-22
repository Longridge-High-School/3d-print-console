# 3D Print Console

Control all your OctoPrint (or Moonraker using ```[octoprint_compat]```) 3D Printers in one place with 3D Print Console!

## Features of 3D Print Console

- Most basic 3D Printing commands all in one place.
- Keep an eye on your prints with embedded webcam views.
- Print jobs are logged, including which device sent them.
- Controls can be disabled for a non-intearctable display.
- Printers can be locked by the admin(s) for important jobs.
- Widget support.
 
## Getting Started

1. Set up [OctoPrint](https://octoprint.org/) for your 3D printer and create an API key.
2. [Install Docker.](https://www.docker.com/get-started/)
3. Create a directory for your 3D Print Console installation.
4. Create a file inside your directory called ```docker-compose.yaml``` and copy the following into it:

  **docker-compose.yaml:**
  ```
  services:
    console:
      image: longridgehighschool/3d-print-console
      volumes:
        - "./data:/www/data:ro"
      ports:
        - "8000:80"
      restart: unless-stopped

    log:
      image: longridgehighschool/3d-print-console-logs
      volumes:
        - "./data:/data"
      ports:
        - "9000:80"
      restart: unless-stopped

    sftp:
        image: markusmcnugen/sftp
        volumes:
            - ./data:/home/admin/data
        ports:
            - "9022:22"
        command: admin:YOUR_PASSWORD_HERE:::data
        restart: unless-stopped

    defaults: 
      image: longridgehighschool/3d-print-console-defaults
      volumes:
        - "./data:/data"
  ```

5. Adjust the port settings to match the ones you want to use.
6. Replace ```YOUR_PASSWORD_HERE``` with your choice of password, preferably one that is not used for anything else. This will be used for accessing the config files and logs.
7. Run ```docker compose up``` or ```docker compose up -d```.
8. Open a web browser, and navigate to the IP / hostname of your host and port of your ```console``` container, and check if it is running.
9. Do the same for the ```logs``` container.
10. Open your preferred SFTP client, and log into your host with the username ```admin``` and the password you set in Step 6.
11. Open the ```data``` directory, and then open ```printers.json```. It should look something like this:
```
[
    {
      "id": "0",
      "name": "Sample Printer",
      "host": "OCTOPRINT URL HERE",
      "filament": "rgb(12, 246, 0)",
      "key": "OCTOPRINT KEY HERE",
      "background": "DeepSkyBlue",
      "port": "/dev/ttyUSB0",
      "file": ".gcode",
      "locked": false
    }
]
```
12. Replace "Sample Printer" with a more fitting name.
13. Set the ```host``` value to be the URL of your OctoPrint server.
14. Set the ```filament``` value to a [HTML colour name](https://www.w3schools.com/TAGS/ref_colornames.asp) or an RGB value for your current filament colour. You can use RGBA for transparent filament.
15. Copy the API key you created in Step 1 into the ```key``` value.
16. Set the ```background``` value to any colour you like in the same way as in Step 14.
17. Set the ```port``` value to the USB port **on the OctoPrint server** that your printer is connected to. This will be something like "/dev/ttyUSB0" or "COM3".
18. Set the ```file``` value to match the extension your 3D printer expects. The default is ".gcode". **Make sure to include the "."!**
19. Save your changes.
20. Open ```cameras.json```.
21. Set the ```title``` value to any name you like, and set the ```url``` value to the URL of your webcam. If you haven't got this set up, delete the JSON object.
22. Save your changes.
23. Refresh the Console page, and your 3D printer should be visible and ready to accept jobs.