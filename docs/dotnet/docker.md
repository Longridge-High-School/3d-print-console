---

layout: default
title: Installing 3D Print Console for .NET using Docker
permalink: dotnet/setup/docker

---

1. Make sure OctoPrint is set up for your printers. You can find instructions [here]({{ site.url }}{{ site.baseurl }}/setup/#configuring-octoprint-for-3d-print-console).

2. Log into your server and install [Docker](https://www.docker.com/) if it is not already installed.

3. Create a new directory for your 3D Print Console for .NET installation.

4. Inside that directory, create a new directory called <span class = "File">data</span> and a new file called <span class = "File">log.txt</span>.

5. Create your <span class = "File">docker-compose.yaml</span> file. Here is an example:
  ```yaml
  services:
    console:
      image: longridgehighschool/3d-print-console-dotnet
      ports:
        - "5000:5000"
      environment:
        - RECORD_SERVER_LOGS=false
        - ADMIN_PASSWORD=YOUR_PASSWORD_HERE
      volumes:
        - ./data:/opt/3d-print-console-dotnet/wwwroot/data
        - type: bind
          source: ./log.txt
          target: /opt/3d-print-console-dotnet/log.txt
      restart: unless-stopped
  ```

6. Replace "YOUR_PASSWORD_HERE" with your choice of password that you do not use for anything else. You can also set more server options under "environment". See [this page]({{ site.url }}{{ site.baseurl }}/dotnet/serverconfig) for a full list.

7. Run the <span class = "Command">docker compose up -d</span> command to start 3D Print Console for .NET.

8. Using a browser, connect to your server on port 5000. You should see this:

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/dotnet/setup/console_initial.jpg" alt = "A completely unconfigured 3D Print Console for .NET instance.">

9. Click the link and sign in using password you set in Step 6.

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/dotnet/setup/login_initial.jpg" alt = "The Login screen.">

10. Click the yellow "Get Latest 3D Print Console" button and wait for it to download - it's normally very quick. When it's done, a sample printer and camera should appear in the relavent boxes above.

**3D Print Console for .NET is now installed! You can now add your printers, cameras and widgets, and then start printing.**

{% include warning.html content = "Never connect 3D Print Console for .NET directly to the internet!" %}