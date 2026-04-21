---

layout: default
title: Setting up 3D Print Console
permalink: /setup

---

## Choosing your version of 3D Print Console

3D Print Console is available in 2 versions - 3D Print Console and [3D Print Console for .NET]({{ site.url }}{{ site.baseurl }}/dotnet). The experience for regular users is almost identical for both - the difference is in the server and the admin experience. The table below shows the full list of differences between the 2 versions:

| | 3D Print Console | 3D Print Console for .NET |
| - | - | - |
| Server | [darkhttpd](https://github.com/emikulic/darkhttpd) | [ASP .NET](https://dotnet.microsoft.com/en-us/apps/aspnet) |
| Server Platform | Docker | Docker and Windows |
| Admin GUI | ❌ | ✔️ |
| HTTPS Without a Proxy | ❌ | ✔️ |
| Log Viewer | ❌ | ✔️ |
| "hide-widgets" URL Parameter | ✔️ | ❌ |
| Non-interactable Display | ✔️ | ❌ |

If you would like to use 3D Print Console for .NET, please follow [the guide here]({{ site.url }}{{ site.baseurl }}/dotnet/setup/windows) for Windows or [the guide here]({{ site.url }}{{ site.baseurl }}/dotnet/setup/docker) for other operating systems using Docker **after** you have configured OctoPrint (see below).

## Configuring OctoPrint for 3D Print Console

**If you haven't set up Octoprint at all yet, please see their documentation [here](https://octoprint.org/download/)!**

1. Open the settings menu inside OctoPrint while logged in as an administrator.

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/setup/octoprint_menu_default.jpg" alt = "The OctoPrint settings menu.">

2. Go to "Access Control" under "Features".

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/setup/octoprint_menu_access_control.jpg" alt = "The OctoPrint Access Contol settings menu.">

3. Click "Add User".

4. Use your password to reauthenticate.

5. Enter a username and password for the 3D Print Console user. Make sure "Active" is ticked.

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/setup/octoprint_add_user_general.jpg" alt = "The OctoPrint Add User menu.">

6. Open the "Groups" tab and tick "Operator".

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/setup/octoprint_add_user_groups.jpg" alt = "The OctoPrint Add User menu.">

7. Open the "Additional permissions" tab and tick "Control".

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/setup/octoprint_add_user_additional.jpg" alt = "The OctoPrint Add User menu.">

8. Click the "Confirm" button. Use your password to reauthenticate if prompted.

9. Now select "Application Keys" under "Features".

10. From the dropdown menu, choose the user you just created. Set "Application identifier" to "3d_print_console".

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/setup/octoprint_menu_application_keys.jpg" alt = "The OctoPrint Application Keys settings menu.">

11. Click "Generate" and copy the API Key to a safe location - you'll need this for adding printers.

12. Press "Close" and select "API" under "Features".

13. Make sure "Allow Cross Origin Resource Sharing (CORS)" is ticked.

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/setup/octoprint_menu_api.jpg" alt = "The OctoPrint API settings menu.">

14. Click "Save" then restart your OctoPrint server.

{% include tip.html content = "You'll need to repeat this process for every printer you want to connect." %}

## Installing 3D Print Console

{% include tip.html content = "Make sure your users' devices can access your OctoPrint server(s) before you start." %}

1. Ensure [Docker](https://www.docker.com/get-started/) is installed on your server.

2. Create a directory on your server for your 3D Print Console installation.

3. Create a file inside your directory called <span class = "File">docker-compose.yaml</span> and copy the following into it:

    **docker-compose.yaml**

    ```yaml
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
                - "./logs:/data"
            ports:
                - "9000:80"
            restart: unless-stopped

        sftp:
            image: markusmcnugen/sftp
            volumes:
                - ./data:/home/admin/data
                - ./logs:/home/admin/logs
            ports:
                - "9022:22"
            command: admin:YOUR_PASSWORD_HERE:::data
            restart: unless-stopped

        defaults: 
            image: longridgehighschool/3d-print-console-defaults
            volumes:
                - "./data:/data"
                - "./logs:/logs"
    ```
4. Adjust the ports to match the ones you want to use. Use port 80 for the "console" container if 3D Print Console is the only app hosted by this server.

5. Replace "YOUR_PASSWORD_HERE" with your choice of password, preferably one that is not used for anything else. This will be used for accessing the config files and logs over SFTP.

6. Go to the <span class = "File">data</span> subdirectory of your 3D Print Console directory.

7. Open <span class = "File">config.json</span>.

8. Edit the following line to match the URL of your server and the port the "logs" container is running on (9000 by default):

    ```json
    "logServer": "http://localhost:9000"
    ```

    **Example:**
    ```json
    "logServer": "http://printfarm.example.com:9000"
    ```

9. Return to the root of your 3D Print Console installation and run the <span class = "Command">docker compose up -d</span> command to start 3D Print Console.

10. Open a browser, and go to the URL of your server, with the port you chose for your "console" container. You should now be presented with a clean 3D Print Console installation ready to set up.

<img class = "ImageLarge" src = "{{ site.url }}{{ site.baseurl }}/img/setup/new_console.jpg" alt = "The 3D Print Console interface." />

{% include warning.html content = "Never connect 3D Print Console directly to the internet!" %}

## Configuring your New 3D Print Console Installation

If you are logged into the server, you can edit the 3D Print Console files directly. They can be found in your 3D Print Console installation inside the <span class = "File">data</span> directory.

You can also connect to the server via SFTP using the settings configured in <span class = "File">docker-compose.yaml</span> and edit the configuration from there. You will need an SFTP client. [WinSCP](https://winscp.net/) is a good one for Windows.

- [See here for adding printers.]({{ site.url }}{{ site.baseurl }}/setup/printers)

- [See here for adding cameras.]({{ site.url }}{{ site.baseurl }}/setup/cameras)

- [See here for changing other settings.]({{ site.url }}{{ site.baseurl }}/setup/config)

- [See here for installing widgets.]({{ site.url }}{{ site.baseurl }}/widgets)