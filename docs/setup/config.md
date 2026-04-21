---

layout: default
title: Other Settings
permalink: /setup/config

---

{% include warning.html content = "If you are unfamiliar with JSON, it may be worth reading about it <a href = 'https://www.w3schools.com/js/js_json_syntax.asp'>here</a>." %}

3D Print Console has some other settings that are stored in the <span class = "File">config.json</span> file in the <span class = "File">data</span> directory. It contains the following properties:

| Property | What It Does | Optional |
| - | - | - |
| brandColour | The colour used for the header, footer and button highlights. | ❌ |
| smallScreenLiveColour | The colour used for the background when the cameras and widgets are being viewed on a small screen. Can also be used as a secondary colour by widgets. | ❌ |
| headerFooterTextColour | The colour used for the text in the header and footer. | ❌ |
| logServer | URL of the log server. | ❌ |
| maxFileNameLength | How long file names should be before they are cut off. Very long file names can break the UI. | ❌ |

{% include tip.html content = "If you don't see any changes, hard refresh the console page a few times." %}