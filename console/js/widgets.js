const container = document.getElementById ("WidgetContainer");
var widgetWidth = 320;
var widgetHeight = 240;

if (localStorage.getItem ("WidgetSize"))
{
    SetWidgetSize (localStorage.getItem ("WidgetSize"));
}
else
{
    AddWidgetsFromFile ();
}

async function AddWidgetsFromFile ()
{
    const response1 = await fetch ("/data/cameras.json"); // Prioritise Cameras.
    cameras = await response1.json ();

    for (var camera of cameras)
    {
        if (CheckValidURL (camera.url))
        {
            container.innerHTML += `<div class = "Widget"><iframe src = "${camera.url}" title = "${camera.title}" allowfullscreen = "" frameborder = "0" width = "${widgetWidth}" height = "${widgetHeight}"></iframe></div>`;
        }
        else
        {
            container.innerHTML += `<div class = "Widget"><img src = "/img/no_camera.png" alt = "No Camera" width = "${widgetWidth}" height = "${widgetHeight}"></div>`;
        }
    }

    const response2 = await fetch ("/data/widgets.json");
    widgets = await response2.json ();

    for (var widget of widgets)
    {
        if (widget.enabled === "true")
        {
            if (CheckValidURL ("/data/widgets" + widget.url))
            {
                container.innerHTML += `<div class = "Widget"><iframe src = "/data/widgets${widget.url}?${widget.args}" title = "${widget.title}" allowfullscreen = "" frameborder = "0" width = "${widgetWidth}" height = "${widgetHeight}"></iframe></div>`;
            }
            else
            {
                container.innerHTML += `<div class = "Widget"><img src = "/img/no_widget.png" alt = "Error! Cannot find widget." width = "${widgetWidth}" height = "${widgetHeight}"></div>`;
            }
        }
    }
}

function CheckValidURL (url)
{
    try
    {
        const request = new XMLHttpRequest ();
        request.open ("GET", url, false);
        request.send (null);

        if (request.status === 200)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch
    {
        return false;
    }
}

function SetWidgetSize (size)
{
    switch (size)
    {
        case "Small":
            widgetWidth = 160;
            widgetHeight = 120;
            break;

        case "Large":
            widgetWidth = 640;
            widgetHeight = 480;
            break;

        default: // Default to Medium.
            widgetWidth = 320;
            widgetHeight = 240;
            break;
    }

    container.innerHTML = "";
    AddWidgetsFromFile ();
    localStorage.setItem ("WidgetSize", size);
}