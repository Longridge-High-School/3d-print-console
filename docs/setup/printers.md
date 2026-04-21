---

layout: default
title: Adding Printers
permalink: /setup/printers

---

{% include warning.html content = "If you are unfamiliar with JSON, it may be worth reading about it <a href = 'https://www.w3schools.com/js/js_json_syntax.asp'>here</a>." %}

When you open <span class = "File">printers.json</span> for the first time, you will see a file that looks like this:

```json
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

Each object (the { }s and everything inside them) represents 1 printer with all it's properties.

Here is what all the properties mean:

| Property | What It Does | Optional |
| - | - | - |
| id | Numeric ID of this printer. These should all be consecutive. | ❌ |
| name | Name of this printer shown on the console. | ❌ |
| host | URL of the OctoPrint server that this printer uses. | ❌ |
| filament | Colour of filament currently in this printer. This can be a [name](https://www.w3schools.com/tags/ref_colornames.asp), an RGB value, or a hex colour code. You'll need to change this when you change the filament. | ❌ |
| key | OctoPrint API key for this printer. | ❌ |
| background | Colour of the background shown on console. This can be a [name](https://www.w3schools.com/tags/ref_colornames.asp), an RGB value, or a hex colour code. | ❌ |
| managementURL | A URL for the OctoPrint web UI if it is not accessible via the URL specified in the "host" property. | ✔️ |
| port | The OctoPrint port this printer is connected to. It may look like these examples: "/dev/ttyS0" (Linux), "COM3" (Windows) or "/tmp/printer" (OctoKlipper). You can find this by logging into OctoPrint and clicking "Connect". | ❌ |
| file | The file extension used for files uploaded to this printer. Don't forget the "."! This should normally be ".gcode".| ❌ |
| locked | If this printer can be used. Must be either true or false. Locked printers are visible on the console, but they can't recieve new jobs or have their current jobs paused or cancelled. | ❌ |

To add more than 1 printer, place a "," after the closing brace of the printer object, and add another object underneath it. You can have as many printers as you want.

{% include tip.html content = "If you don't see any changes, hard refresh the console page a few times." %}