---

layout: default
title: Adding Cameras
permalink: /setup/cameras

---

{% include warning.html content = "If you are unfamiliar with JSON, it may be worth reading about it <a href = 'https://www.w3schools.com/js/js_json_syntax.asp'>here</a>." %}

{% include tip.html content = "Make sure your cameras are set up in OctoPrint first! Please see <a href = 'https://octoprint.org/download/'> their website</a> for details." %}

Cameras in 3D Print Console are defined in <span class = "File">cameras.json</span>. Like <span class = "File">printers.json</span>, it is an array of JSON objects. Camera objects must have the following properties:

| Property | What It Does | Optional |
| - | - | - |
| name | Name of this camera. | ❌ |
| url | URL of the camera stream. | ❌ |

To add more than 1 camera, place a "," after the closing brace of the camera object, and add another object underneath it. You can have as many cameras as you want.

{% include warning.html content = "Having a lot of cameras defined in cameras.json but not connected can cause 3D Print Console to load slowly." %}

{% include tip.html content = "If you don't see any changes, hard refresh the console page a few times." %}