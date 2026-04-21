---

layout: default
title: 3D Print Console for .NET Server Settings
permalink: /dotnet/serverconfig

---

This is a list of all the options for a 3D Print Console for .NET server:

| Key | Type | Default | Description |
| - | - | - | - |
| ADMIN_PASSWORD | String | admin | The password used to log in. |
| RECORD_SERVER_LOGS | Boolean | false | Should the server record logs? |
| LOG_PATH | String | log.txt | The path to the log file. |
| USING_PROXY | Boolean | false | Is the server behind a proxy? Proxies will affect the IP addresses recorded in the logs. |
| PROXY_IP | Comma-seperated IP Address list | 127.0.0.1 | A list of known proxy IP addresses, seperated with commas. |
| HTTP_PORT | Integer | 5000 | What port should the server listen for HTTP requests on? |
| HTTPS_PORT | Integer | 5001 | What port should the server listen for HTTPS requests on? |
| USE_HTTP | Boolean | true | Should the server listen for HTTP requests? |
| USE_HTTPS | Boolean | false | Should the server listen for HTTPS requests? |
| SSL_PATH | String | | The path to SSL certificate used for HTTPS connections. |
| SSL_PASSWORD | String | | The password for the SSL certificate used for HTTPS connections. **This is currently stored unencrypted - use with caution!** |

These can be saved as environment variables in <span class = "File">docker-compose.yaml</span> or as key-value pairs in <span class = "File">3d-print-console.cfg</span> in the format "KEY=value".

Which one you use depends on your installation. If you use <span class = "File">3d-print-console.cfg</span>, all settings can be edited from inside the app too.