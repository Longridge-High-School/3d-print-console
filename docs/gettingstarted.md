---

layout: default
title: Getting Started with 3D Print Console
permalink: /gettingstarted

---

{% include tip.html content = "If you haven't set up 3D Print Console yet, please see the guide <a href = './setup'>here</a>." %}

## Preparing your Model for Printing

To 3D print a model, you must slice it first. Slicing turns the model into a set of thin layers that the printer can build by stacking them on top of each other. This is done using slicing software like Ultimaker Cura, Prusa Slicer, Orca Slicer or [3D Print Console Slicer]({{ site.url }}{{ site.baseurl }}/widgets/slicer). Your software will generate a GCODE file, which normally ends with ".gcode". You can upload this to 3D Print Console to print it.

Your slicing software will give you options about how you want to slice your model. Here are some of the more common ones:

### Layer Height

Layer height is how thick the layers that make up your printed model are. A lower layer height looks better, but takes much longer to print.

{% include warning.html content = "This is always 0.2mm in 3D Print Console Slicer." %}

### Printer Model

Different printers need different settings for them to work properly. Many slicing programs will have presets for common models of printer.

### Filament Type

There are many different materials that can be used for 3D printing. Each one has different melting points. Your printer should be at the correct temperature for your filament, otherwise it will be too solid to print or burn rather than melting. Some slicing programs contain profiles for specific brands of filament too, where the temperature has been optimised for that exact material.

### Infill Pattern

This is the pattern used for the internal structure of your printed model. The infill pattern can affect the strength of your model, how long it takes to print and how much material it uses. Different programs have different options available.

### Infill Density

This controls how much of the inside of your printed model is empty space. Choosing a low setting saves time, money and weight, but a higher setting gives you a much stronger final product.

### Supports

Models with overhangs must be supported, otherwise the printer won't have anything to build the overhanging layer on top of. You can disable supports if your model has small overhangs or if the angle of the supports is 45° or less.

### Adhesion

Adhesion is a thin layer around the bottom of your print to help it stick to the bed of your printer. Enable this when your prints don't stick.

{% include warning.html content = "This isn't available in 3D Print Console Slicer." %}

## Printing your Model

1. Open 3D Print Console and choose the printer you want to print from. It should have a status of "Ready to Print" and the bed should be clear.

2. Click the button that says "Choose File" or "Browse...".

    <img class = "ImageLarge" src = "{{ site.url }}{{ site.baseurl }}/img/gettingstarted/choose_file.jpg" alt = "The &quotChoose File&quot buttton.">

3. Use the file browser to select your sliced GCODE file.

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/gettingstarted/explorer.jpg" alt = "Choosing a file in Windows Explorer.">

4. Click "Upload and Select File" and wait for the file to upload. Depending on the size of the file, this can take some time.

    <img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/gettingstarted/upload_select.jpg" alt = "The &quotUpload and Select&quot buttton.">

5. Click "Start Printing" to begin your print job.

    <img class = "ImageLarge" src = "{{ site.url }}{{ site.baseurl }}/img/gettingstarted/start.jpg" alt = "The console with an uploaded file ready to start printing.">

The status of the printer will change to "Busy Printing" and it will begin printing your file. You can monitor the progess of your print from inside 3D Print Console or watch it with a camera (if one is connected).