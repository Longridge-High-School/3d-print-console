---

layout: default
title: 3D Print Console Slicer
permalink: /widgets/slicer

---

{% include tip.html content = "The Slicer widget is not included by default - an admin must install it before it can be used." %}

{% include warning.html content = "3D Print Console Slicer takes a long time to slice complex models and cannot do more than 1 model at once." %}

## Slicing a Model

1. Click the green "Slice Models" button on the right-hand side of your 3D Print Console page. If you are using a small screen, you may need to click the "Cameras and Widgets" button first. 3D Print Console Slicer will open.

    <img class = "ImageLarge" src = "{{ site.url }}{{ site.baseurl }}/img/widgets/slicer_full.jpg" alt = "The 3D Print Console Slicer interface." />

2. If you want to print something other than the 3D Print Console logo, click "Choose File" on the bottom-right, and pick a file. It may take some time to load, depending on the size.

3. Your model should appear in the "Preview" window. You can click and drag on it to pan around.

4. Use the "Settings" panel to change the settings for this print. Supported printers are listed [below](#supported-printers). 3D Print Console Slicer saves your settings when you slice a model so you don't have to constantly set them.

5. When you are happy with your settings, click the green "Slice" button and wait for 3D Print Console Slicer to slice your model. This may take a long time, depending on the complexity of the model. For models with lots of layers or a very high number of triangles, consider using a slicing program that is installed on your computer.

6. Once 3D Print Console Slicer has sliced your model, click the button that has appeared next to the printer you want to send it to. This will send it to the printer, **but not start the print!** Make sure you press the "Start" button in 3D Print Console. If you don't want to send it to a printer connected to 3D Print Console, you can download your GCODE file by clicking the yellow "Download GCODE" button.

## Supported Printers

[Polyslice](https://jgphilpott.github.io/polyslice/), which is the library that 3D Print Console Slicer is based on, supports the following printers:

- Creality Ender 3
- Creality Ender 3 V2
- Creality Ender 3 Pro
- Creality Ender 3 S1
- Creality Ender 5
- Creality Ender 6
- Creality CR10
- Creality CR10S5
- Creality CR6SE
- Creality K1
- Creality K1 Max
- Prusa I3 MK3 S
- Prusa Mini
- Prusa MK4
- Prusa XL
- Bambu Lab X1 Carbon
- Bambu Lab P1P
- Bambu Lab A1
- Bambu Lab A1 Mini
- Anycubic I3 Mega
- Anycubic Kobra
- Anycubic Viper
- Anycubic Photon Mono X
- Elegeoo Neptune 3
- Elegoo Neptune 3 Pro
- Elegoo Neptune 4
- Elegoo Neptune 4 Pro
- Artillery Sidewinder X1
- Artillery Sidewinder X2
- Artillery Genius
- Sovol SV06
- Sovol SV06 Plus
- Voron 24
- Ultimaker S5
- Flashforge Creator Pro
- Flashforge Adventurer 3
- Raise3D Pro 2
- Makerbot Replicator Plus
- Qidi X Plus
- Monoprice Select Mini V2
- LulzBot Mini 2
- LulzBot TAZ 6
- Kingroon KP3S
- Anker Make M5