---

layout: default
title: Making a 3D Print Console Widget
permalink: /widgets/tutorial

---

{% include warning.html content = "These tutorials only apply to versions of 3D Print Console v2.4 or later!" %}

## How do widgets work and what can they do?

Widgets are written as HTML files, and are loaded into the main 3D Print Console page as [iframes](https://www.w3schools.com/tags/tag_iframe.ASP). Widgets are stored in the <span class = "File">/data/widgets</span> directory inside your 3D Print Console installation. They often contain more than 1 file, so each widget must have its own subdirectory which contains all its files. Some widgets also contain additional HTML pages that are not embedded in 3D Print Console themselves, but are linked to from the widget. This is how [3D Print Console Slicer]({{ site.url }}{{ site.baseurl }}/widgets/slicer) works.

Widgets can do anything that is possible with a [static web page](https://en.wikipedia.org/wiki/Static_web_page). 3D Print Console includes a custom stylesheet for widgets (<span class = "File">/css/widgets.css</span>), which makes a good starting point for making on-brand and correctly-scaled widgets. It also includes [WDK]({{ site.url }}{{ site.baseurl }}/widgets/wdk) (short for **W**idget **D**evelopment **K**it), which is a JavaScript library that provides some 3D Print Console features.

## Tutorial 1 - Creating a Hello World Widget

In this tutorial, we are going to make the classic first computer program - "Hello World" - as a 3D Print Console widget.

To start creating widgets, you will need a version of 3D Print Console to test your widgets on. We reccomend that this is hosted on your local PC rather than using a live server. You can clone or download [the main 3D Print Console repository](https://github.com/Longridge-High-School/3d-print-console), which contains a development <span class = "File">docker-compose.yaml</span> file to get you started. Your <span class = "File">/data</span> directory will be created when you start the server for the first time. You can also set up [3D Print Console for .NET]({{ site.url }}{{ site.baseurl }}/dotnet) on your local machine and use that instead.

{% include tip.html content = "If you don't want 3D Print Console for .NET to start automatically on your Windows PC, run <span class = 'Command'>sc delete 3d-print-console-dotnet</span> in an admin command prompt window after the installation is complete and then restart your computer." %}

Now create a new directory inside the <span class = "File">/data/widgets</span> directory. Name it <span class = "File">helloworld</span>. Then, create a file inside that called <span class = "File">hello.html</span>. This will be the HTML file for our widget.

Copy the following into <span class = "File">hello.html</span>:

``` html
<!DOCTYPE html>
<html lang = "en-gb">
    <head>
        <link rel = "stylesheet" type = "text/css" href = "/css/widgets.css"> <!-- Include the widget stylesheet -->
        <script type = "JavaScript" src = "/js/wdk.js"></script> <!-- Include WDK -->
    </head>
    <body>
        <!-- Your HTML Here -->
    </body>
</html>
```

Now, add this inside the &lt;body&gt; tags:

``` html
<h1>Hello World!</h1>
```

Open <span class = "File">/data/widgets.json</span> and add the following to make your new widget visible:

``` json
{
    "title": "Hello World",
    "url": "/helloworld/hello.html",
    "args": "",
    "enabled": "true"
}
```

{% include tip.html content = "You can also add the widget using the 3D Print Console for .NET web interface!" %}

Connect to your development 3D Print Console environment using your browser and admire your new widget. You may need to refresh the page a few times for it to become visible.

<img class = "ImageLarge" src = "{{ site.url }}{{ site.baseurl }}/img/widgets/hello_world.jpg" alt = "The completed Hello World widget." />

## Tutorial 2 - Stats Panel using WDK

{% include tip.html content = "Full source code for this widget is available at the bottom of this page." %}

In this tutorial, we will use WDK to create this Stats Panel widget:

<img class = "ImageSmall" src = "{{ site.url }}{{ site.baseurl }}/img/widgets/stats_panel_zoomed.jpg" alt = "The completed Stats Panel widget." />

To get started, create a new directory inside the <span class = "File">/data/widgets</span> directory and name it <span class = "File">stats</span>.

Inside that directory, create <span class = "File">stats.html</span> and <span class = "File">stats.js</span>.

Like in the Hello World tutorial, copy the following into <span class = "File">stats.html</span>:

``` html
<!DOCTYPE html>
<html lang = "en-gb">
    <head>
        <link rel = "stylesheet" type = "text/css" href = "/css/widgets.css">
        <script type = "JavaScript" src = "/js/wdk.js"></script>
    </head>
    <body>
    </body>
</html>
```

To get the "CLI look", we must add some custom CSS. Add a &lt;style&gt; and a &lt;/style&gt; tag inside the &lt;head&gt; tag.

Now, add the following CSS inside the &lt;style&gt; tags:

``` css
body
{
    color: white;
    background-color: black;
    font-family: monospace;
}
```

Inside the &lt;body&gt; tags, add this:

```html
<h1>📊 Stats</h1>
<div id = "Container">
    <!-- The stats we get from WDK will go in here. -->
</div>
```

Then, after the &lt;/body&gt; tag, add this line:
``` javascript
<script type = "text/JavaScript" src = "stats.js"></script>
```

Now, open <span class = "File">stats.js</span>.

Create 2 asynchronous functions - "LoadStats" and "CountConnectedPrinters".

``` javascript
async function LoadStats ()
{

}

async function CountConnectedPrinters ()
{

}
```

After the closing brace of "CountConnectedPrinters", create a constant called "container" refrencing the &lt;div&gt; we created before, then call the "LoadStats" function.

```javascript
const container = document.getElementById ("Container");
LoadStats ();
```

Inside the "LoadStats" function, add these lines to [get the WDK version]({{ site.url }}{{ site.baseurl }}/widgets/wdk#wdkversion) and [check if we are using 3D Print Console for .NET]({{ site.url }}{{ site.baseurl }}/widgets/wdk#wdkisdotnet):

```javascript
container.innerHTML += `<p>WDK Version: ${WDK.version}</p>`;
container.innerHTML += `<p>Using 3D Print Console for .NET: ${WDK.IsDotnet ()}</p>`;
```

Counting the number of active printers will be handled by our "CountConnectedPrinters" function. Call that function, and assign the result to a constant called "active". Make sure you await "CountConnectedPrinters".

``` javascript
const active = await CountConnectedPrinters ();
```

Counting the total number of printers is easier - we just get the length of [WDK.printers]({{ site.url }}{{ site.baseurl }}/widgets/wdk#wdkprinters):

``` javascript
const total = WDK.printers.length;
```

To display the values, we must add the values to "container.innerHTML".

```javascript
container.innerHTML += `<p>Printers Connected: ${active}/${total}</p>`;
```

Now, we need to add some code to "CountConnectedPrinters". Start by adding this line:

```javascript
await WDK.GetPrinters ();
```

[This function]({{ site.url }}{{ site.baseurl }}/widgets/wdk#wdkgetprinters-) makes sure that the [WDK.printers]({{ site.url }}{{ site.baseurl }}/widgets/wdk#wdkprinters) array is populated. This happens automatically when a page is loaded, but it may not have completed if it is called as the page is loading. We can fix this by calling it ourselves before we do anything involving printers using WDK.

{% include tip.html content = "You don't need to call &quot;WDK.GetPrinters&quot; if the page has already loaded (e.g. if your function is called by a button press)!" %}

Next, create a variable called "count" and set it to 0. This will (as the name suggests) store how many printers are connected.

```javascript
var count = 0;
```

Now, add the following code:

```javascript
for (printer of WDK.printers)
{
    if (await WDK.GetStatus (printer.host, printer.key) !== "Network Error")
    {
        count++;
    }
}
```

This code iterates through the [WDK.printers]({{ site.url }}{{ site.baseurl }}/widgets/wdk#wdkprinters) array, and calls "[WDK.GetStatus]({{ site.url }}{{ site.baseurl }}/widgets/wdk#wdkgetstatus-host-key)"" on each printer. If the returned string is not "Network Error" (i.e. no connection to printer), that printer is connected, although it may be busy. The strings returned by "[WDK.GetStatus]({{ site.url }}{{ site.baseurl }}/widgets/wdk#wdkgetstatus-host-key)"" are the same ones that are displayed in the "Status" panels on the main console page, although without any emojis.

Finally, finish off the function by returning the number of printers.

```javascript
return count;
```

Before we can test our widget, we must add it to the <span class = "File">/data/widgets.json</span> file as a JSON object like this:

``` json
{
    "title": "Stats Panel",
    "url": "/stats/stats.html",
    "args": "",
    "enabled": "true"
}
```

{% include tip.html content = "You can also add the widget using the 3D Print Console for .NET web interface!" %}

Connect to your development 3D Print Console environment using your browser and admire your new widget. You may need to refresh the page a few times for it to become visible.

<img class = "ImageLarge" src = "{{ site.url }}{{ site.baseurl }}/img/widgets/stats_panel_complete.jpg" alt = "The completed Stats Panel widget." />

### Source Files

<details>
    <summary><span class = "File">stats.html</span></summary>
    <pre>
        <code class = "language-html">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;link rel = &quot;stylesheet&quot; type = &quot;text/css&quot; href = &quot;/css/widgets.css&quot;&gt; &lt;!-- Include the base widget CSS --&gt;
        &lt;script type = &quot;text/JavaScript&quot; src = &quot;/js/wdk.js&quot;&gt;&lt;/script&gt; &lt;!-- Include WDK --&gt;
        &lt;style&gt; &lt;!-- CSS for that "CLI" look --&gt;
            body
            {
                color: white;
                background-color: black;
                font-family: monospace;
            }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;📊 Stats&lt;/h1&gt;
        &lt;div id = &quot;Container&quot;&gt;
            &lt;!-- The stats we get from WDK will go in here. --&gt;
        &lt;/div&gt;
    &lt;/body&gt;
    &lt;script type = &quot;text/JavaScript&quot; src = &quot;stats.js&quot;&gt;&lt;/script&gt;
&lt;/html&gt;
        </code>
    </pre>
</details>

<details>
    <summary><span class = "File">stats.js</span></summary>
    <pre>
        <code>
async function LoadStats ()
{
    container.innerHTML += `<p>WDK Version: ${WDK.version}</p>`;
    container.innerHTML += `<p>Using 3D Print Console for .NET: ${WDK.IsDotnet ()}</p>`;

    const active = await CountConnectedPrinters ();
    const total = WDK.printers.length;
    container.innerHTML += `<p>Printers Connected: ${active}/${total}</p>`;
}

async function CountConnectedPrinters ()
{
    await WDK.GetPrinters ();

    var count = 0;

    for (printer of WDK.printers)
    {
        if (await WDK.GetStatus (printer.host, printer.key) !== "Network Error")
        {
            count++;
        }
    }

    return count;
}

const container = document.getElementById ("Container");
LoadStats ();
        </code>
    </pre>
</details>
<br/>

{% include tip.html content = "You can do much more with WDK than shown here - check out <a href = '/3d-print-console/widgets/wdk'>the WDK Reference</a> for a full list." %}