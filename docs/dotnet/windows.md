---

layout: default
title: Installing 3D Print Console for .NET on Windows
permalink: /dotnet/setup/windows

---

1. Make sure OctoPrint is set up for your printers. You can find instructions [here]({{ site.url }}{{ site.baseurl }}/img/setup/#configuring-octoprint-for-3d-print-console).

2. Log into your server.

3. Download and install [.NET Runtime 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).

4. Download and run the [3D Print Console for .NET installer](https://github.com/Longridge-High-School/3d-print-console-dotnet/releases/latest/download/3d-print-console-dotnet-win64.exe).

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/dotnet/setup/windows_installer.jpg" alt = "The 3D Print Console for .NET installer.">

5. Go to the folder where 3D Print Console for .NET was installed and run <span class = "File">3d-print-console-dotnet.exe</span>. You may have to allow it through the firewall.

6. Close the 3D Print Console for .NET window and restart your server.

7. Using a browser, connect to your server on port 5000. You should see this:

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/dotnet/setup/console_initial.jpg" alt = "A completely unconfigured 3D Print Console for .NET instance.">

8. Click the link and sign in using password "admin".

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/dotnet/setup/login_initial.jpg" alt = "The Login screen.">

9. Click the yellow "Get Latest 3D Print Console" button and wait for it to download - it's normally very quick. When it's done, a sample printer and camera should appear in the relavent boxes above.

10. Click "Server Settings" in the left-hand menu.

11. Scroll to the bottom of the page and enter a password that isn't "admin" and that you don't use for anything else, then click "Change Password and Log Out".

12. Click the "Settings" button and sign back in with your new password.

**3D Print Console for .NET is now installed! You can now add your printers, cameras and widgets, and then start printing.**

{% include warning.html content = "Never connect 3D Print Console for .NET directly to the internet!" %}