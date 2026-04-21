---

layout: default
title: Widgets
permalink: /widgets

---

{% include tip.html content = "3D Print Console widgets have <a href = 'https://github.com/Longridge-High-School/3d-print-console-widgets'>their own GitHub repository</a> where you can download them." %}

## What are widgets?

Widgets are small addons for 3D Print Console that expand what it can do. As of April 2026, the following widgets are available:

- **Document Viewer** - adds custom text and image content to 3D Print Console.
- **GCODE Library** - stores GCODE files inside 3D Print Console itself so they can be printed again quickly.
- **Performance Monitor** - can display the performance of a server or a printer that contains an SBC.
- **Slicer** - slice STL files and send them to 3D Print Console all from in your browser.

## How do I install widgets?

### Using 3D Print Console

Widgets in 3D Print Console are stored in the <span class = "File">/data/widgets</span> directory inside your 3D Print Console installation. To install a widget, download the ZIP file linked on this page, extract the files, and copy the **directory** to your <span class = "File">/data/widgets</span> directory. For example, the path for Document Viewer would be <span class = "File">/data/widgets/document-viewer</span>.

If you refresh 3D Print Console now, you won't see anything. This is because you need to tell 3D Print Console what to do with the widget. To do this, open the <span class = "File">/data/widgets.json</span> file in your 3D Print Console installation. If you don't have any widgets, it will look like this:

```json
[

]
```

To configure a widget, create a new JSON object inside the "[ ]"s. An example for each widget is included on this page in the relavent section below. Here is another example for Document Viewer:

```json
{
    "title": "Sample Text",
    "url": "/document-viewer/document-viewer.html",
    "args": "url=/data/widgets/document-viewer/files/sample.md",
    "enabled": "true"
}
```

Here is what each line does:

| Line | Description |
| - | - |
| ```"title": "Sample Text",``` | A friendly name for this widget. It is not normally visible but can be picked up by screen readers. |
| ```"url": "/document-viewer/document-viewer.html",``` | The path to the HTML file for the widget. This won't need to be changed from the sample config for each widget shown in the widget list. |
| ```"args": "url=/data/widgets/document-viewer/files/sample.md",``` | Arguments passed to this widget in the format "name1=value1&name2=value2...", like a URL. Also like URLs, they must be [URL encoded](https://www.w3schools.com/tags/ref_urlencode.ASP). In the case of Document Viewer, this is the URL of the file to load. |
| ```"enabled": "true"``` | If this widget is visible or not. Widgets with "enabled" set to "false" will not be displayed, but still exist in the config file. |

If you want more than one copy of the same widget, just create another JSON object in <span class = "File">/data/widgets.json</span>. Remember to include commas between objects.

{% include tip.html content = "If your widget is not appearing after adding it to the <span class = 'File'>/data/widgets.json</span> file, try force-refreshing 3D Print Console a few times" %}

{% include warning.html content = "Some widgets may require additional setup - please see their section in <a href = 'https://github.com/Longridge-High-School/3d-print-console-widgets'>the GitHub repository</a> for more information!" %}

### Using 3D Print Console for .NET

3D Print Console for .NET has a widget manager to make installing and configuring widgets easier. To access it, sign in with the admin password, and click on "Widgets" in the menu.

To open the widget repository, click "Download More Widgets". If you already have a widget downloaded on your local computer, click "Upload Widget as .ZIP" and choose the archive that contains your widget. Once it has uploaded, it will appear in the folder list, like the ones below:

<img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/widgets/dotnet_installed_widgets.jpg" alt = "The list of installed widgets in 3D Print Console for .NET.">

Once you have installed a widget, you can add it to the console by clicking the blue "Add New Widget" button. A new widget will appear in the list.

<img class = "ImageLarge" src = "{{ site.url }}{{ site.baseurl }}/img/widgets/dotnet_new_widget.jpg" alt = "A new widget in 3D Print Console for .NET.">

Then, you will need to fill in the details of the widget. The name is the title used for _this specific instance of this widget_. This is not normally visible, but can be picked up screen readers. The Widget HTML File is the part of the widget that is visible in the console. The creator of the widget will tell you what this needs to be set to. If a widget requires some configuration, it may need it's "Arguments" field filling in. What exactly this should contain will be explained in the widget documentation, but it should be in the format "name1=value1&name2=value2...", like a URL. Also like URLs, they must be [URL encoded](https://www.w3schools.com/tags/ref_urlencode.ASP). Tick the "Enabled?" checkbox to show the widget in the console, or leave it unchecked to hide it.

<img class = "ImageLarge" src = "{{ site.url }}{{ site.baseurl }}/img/widgets/dotnet_mem_disk_example.jpg" alt = "An example of a fully configured widget.">

**An example of a fully configured widget.**

You can use the "Move Up" and "Move Down" buttons to change where a widget appears in the list. Widgets that are higher in the list appear nearer the top of the console.

Make sure you save your changes!

{% include warning.html content = "Some widgets may require additional setup - please see their section in <a href = 'https://github.com/Longridge-High-School/3d-print-console-widgets'>the GitHub repository</a> for more information!" %}

{% include tip.html content = "If your widget is not appearing after adding it to the <span class = 'File'>/data/widgets.json</span> file, try force-refreshing 3D Print Console a few times" %}

## How do I make my own widgets?

Please see the guide [here]({{ site.url }}{{ site.baseurl }}/widgets/wdk).