# 3D Print Console

Control all your OctoPrint 3D Printers in one place with 3D Print Console!

## Features of 3D Print Console

- Most basic 3D Printing commands all in one place.
- Keep an eye on your prints with embedded webcam views.
- Print jobs are logged, including which device sent them.
- Controls can be disabled for a non-intearctable display.
- Printers can be locked by the admin(s) for important jobs.
 
## Getting Started

1. Set up [OctoPrint](https://octoprint.org/) for your 3D printer.
2. [Install Docker.](https://www.docker.com/get-started/)
3. Create a directory for your 3D Print Console installation.
4. Create a file inside your directory called ```docker-compose.yaml``` and copy the following into it:

  **docker-compose.yaml:**
  ```
  services:
    console:
      image:
      volumes:
        - "./data:/www/data:ro"
      ports:
        - "8000:80"
      restart: unless-stopped

    log:
      image:
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
            - "22:22"
        command: admin:YOUR_PASSWORD_HERE:::data
        restart: unless-stopped

    defaults:
      image:
      volumes:
        - "./data:/data"
  ```

5. Adjust the port settings to match the ones you want to use.
6. Replace ```YOUR_PASSWORD_HERE``` with your choice of password, preferably one that is not used for anything else. This will be used for accessing the config files and logs.
7. Run ```docker compose up``` or ```docker compose up -d```.
8. Open a web browser, and navigate to the IP / hostname and port of your ```console``` container, and check if it is running.
9. Do the same for the ```logs``` container.