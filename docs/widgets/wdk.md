---

layout: default
title: WDK Reference
permalink: /widgets/wdk

---

## About WDK

WDK (short for **W**idget **D**evelopment **K**it), is a JavaScript library that provides some 3D Print Console features, and is designed to be included in 3D Print Console widgets.

You can include it in your widget HTML files like this:

``` html
<script type = "JavaScript" src = "/js/wdk.js"></script>
```

## Compatibility between WDK and 3D Print Console

| 3D Print Console Version | Included WDK Version |
| - | - |
| v2.3.0 or earlier | No WDK |
| v2.4.0 | WDK v1.0 |

## Properties

### WDK.version

_WDK Version: 1.0_

The version of wdk.js that is running.

### WDK.printers

_WDK Version: 1.0_

Array of all the printers in <span class = "File">printers.json</span>. For the properties of a printer object, see [this page]({{ site.url }}{{ site.baseurl }}/setup/printers).

### WDK.parameterList

_WDK Version: 1.0_

[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) array containing the parameters that have been passed to the widget HTML file.

### WDK.colours.primary

_WDK Version: 1.0_

The "brandColour" value defined in <span class = "File">config.json</span>. This is automatically set to a CSS variable called "<samp>--primary</samp>" in <span class = "File">widgets.css</span>.

### WDK.colours.secondary

_WDK Version: 1.0_

The "smallScreenLiveColour" value defined in <span class = "File">config.json</span>. This is automatically set to a CSS variable called "<samp>--secondary</samp>" in <span class = "File">widgets.css</span>.

### WDK.colours.headerFooterText

_WDK Version: 1.0_

The colour for the header and footer text defined in <span class = "File">config.json</span>. This is automatically set to a CSS variable called "<samp>--headerFooterTextColour</samp>" in <span class = "File">widgets.css</span>.

---

## Functions

### WDK.Hello

_WDK Version: 1.0_

Prints "Hello World!" to the debug console.

#### Parameters

N/A

#### Return Type

void

#### Example Usage

```javascript
WDK.Hello (); // Prints "Hello World!"
```

<br/>

### WDK.IsDotnet

_WDK Version: 1.0_

Checks if the server is running on [3D Print Console for .NET]({{ site.url }}{{ site.baseurl }}/dotnet).

#### Parameters

N/A

#### Return Type

boolean

#### Example Usage

```javascript  
if (WDK.IsDotnet () === true)
{
    // Something .NET specific.
}
else
{
    // Default 3D Print Console behaviour.
}
```

<br/>

### WDK.GetStatus (host, key)

_WDK Version: 1.0_

Gets the OctoPrint status on the OctoPrint instance specified by the host parameter. It will return "<samp>Network Error</samp>" if it cannot connect to OctoPrint.

**This function is asynchronous.**

#### Parameters

- host - URL of the OctoPrint instance for this printer.
- key - OctoPrint API key for the printer.

#### Return Type

string

#### Example Usage

```javascript
const url = "http://printer.example.com:5000"; // OctoPrint URL.
const apiKey = "abcdefghijklmnopqrstuvwxyz-0123456789101112"; // OctoPrint API key.

var myPrinterStatus = await WDK.GetStatus (url, apiKey);
alert ("My Printer currently has a status of " + myPrinterStatus);
```

<br/>

### WDK.GetCurrentFile (host, key)

_WDK Version: 1.0_

Gets the current file on the OctoPrint instance specified by the host parameter. It will return "<samp>Network Error</samp>" if it cannot connect to OctoPrint or "<samp>No File Selected</samp>" if no file is selected. This is the default when the printer turns on.

**This function is asynchronous.**

#### Parameters

- host - URL of the OctoPrint instance for this printer.
- key - OctoPrint API key for the printer.

#### Return Type

string

#### Example Usage

```javascript
const url = "http://printer.example.com:5000"; // OctoPrint URL.
const apiKey = "abcdefghijklmnopqrstuvwxyz-0123456789101112"; // OctoPrint API key.

var file = await WDK.GetCurrentFile (url, apiKey);
alert ("Now printing " + file + "...");
```

<br/>

### WDK.GetPrinters ()

_WDK Version: 1.0_

Updates [WDK.printers](#wdkprinters). Although this is called automatically when the widget loads, it may not have completed by the time other scripts on the page want to do something. You can call it again from your script to ensure it has run before you use WDK.printers.

**This function is asynchronous.**

#### Parameters

N/A

#### Return Type

void

#### Example Usage

```javascript
await WDK.GetPrinters ();

foreach (printer of WDK.printers)
{
    // Do something to each printer here.
}
```

<br/>

### WDK.GetBrandColours ()

_WDK Version: 1.0_

Updates [WDK.colours.primary](#wdkcoloursprimary), [WDK.colours.secondary](#wdkcolourssecondary) and [WDK.colours.headerFooterText](#wdkcoloursheaderfootertext) from the <span class = "File">config.json</span> file. This is run automatically when the widget loads.

**This function is asynchronous.**

#### Parameters

N/A

#### Return Type

void

#### Example Usage

```javascript
await WDK.GetBrandColours ();
```

<br/>

### WDK.GetPrinterByID (id)

_WDK Version: 1.0_

Gets the printer that has the specified ID. If more than one printer has the same ID (which will break 3D Print Console), it will return the first one.

#### Parameters

- id - ID of the printer.

#### Return Type

printer

#### Example Usage

```javascript
var printer = WDK.GetPrinterByID (id);
alert (printer.name);
```

<br/>

### WDK.SendGcodeString (id, gcode, name)

_WDK Version: 1.0_

Sends a GCODE script to the specified printer. This does not start the print job!

**This function is asynchronous.**

#### Parameters

- id - The printer to send the GCODE to.
- gcode - The GCODE to send as a string.
- name - The file name (without extension) that will be visible in 3D Print Console and OctoPrint.

#### Return Type

void

#### Example Usage

```javascript
const gcode = "G28"; // G28 = Home All Axes.
const id = 1;
await WDK.SendGcodeString (id, gcode, "HomeAllAxes");
await WDK.Start (id);
```

<br/>

### WDK.SendGcodeURL (id, url, name)

_WDK Version: 1.0_

Fetches a GCODE script from a URL and then sends it to the specified printer. This does not start the print job!

**This function is asynchronous.**

#### Parameters

- id - The printer to send the GCODE to.
- url - The URL of the GCODE to be printed.
- name - The file name (without extension) that will be visible in 3D Print Console and OctoPrint.

#### Return Type

void

#### Example Usage

```javascript
const url = "/data/widgets/gcode-library/gcode/EN4_3D_Print_Console.gcode"; // GCODE Library widget sample file.
const id = 2;
await WDK.SendGcodeURL (id, url, "3D_Print_Console_Logo");
await WDK.Start (id);
```

<br/>

### WDK.Start (id)

_WDK Version: 1.0_

Starts printing the current file on the specified printer.

**This function is asynchronous.**

#### Parameters

- id - ID of the printer.

#### Return Type

void

#### Example Usage

```javascript
await WDK.Start (id);
```

<br/>

### WDK.Pause (id)

_WDK Version: 1.0_

Pauses the current job on the specified printer.

**This function is asynchronous.**

#### Parameters

- id - ID of the printer.

#### Return Type

void

#### Example Usage

```javascript
await WDK.Pause (id);
```

<br/>

### WDK.Cancel (id)

_WDK Version: 1.0_

Cancels the current job on the specified printer.

**This function is asynchronous.**

#### Parameters

- id - ID of the printer.

#### Return Type

void

#### Example Usage

```javascript
await WDK.Cancel (id);
```

<br/>

### WDK.Restart (id)

_WDK Version: 1.0_

Restarts the current job on the specified printer.

**This function is asynchronous.**

#### Parameters

- id - ID of the printer.

#### Return Type

void

#### Example Usage

```javascript
await WDK.Restart (id);
```