---

layout: default
title: Updating 3D Print Console
permalink: /updating

---

## Minor Updates

3D Print Console does not automatically update, so you must manually update it by connecting to your server, navigating to your 3D Print Console installation directory, and running these commands.

1. <span class = "Command">docker compose down</span>

2. <span class = "Command">docker compose pull</span>

3. <span class = "Command">docker compose up -d</span>


## Major Updates

Please check the release notes on [the GitHub repository](https://github.com/Longridge-High-School/3d-print-console/releases) before updating to a new major version, as you may need to adjust your configuration files. Otherwise the process is the same as for Minor Updates.