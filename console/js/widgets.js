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
        if (await CheckValidURL (camera.url))
        {
            container.innerHTML += `<div class = "Widget">
                                        <img src = "${camera.url}" alt = "${camera.title}" width = "${widgetWidth}" height = "${widgetHeight}" class = "Camera" onerror = "ReplaceBrokenCameraImage (this);"></img>
                                    </div>`;
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
            if (await CheckValidURL ("/data/widgets" + widget.url))
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

async function CheckValidURL (url)
{
    url = url.split ("?") [0]; // Remove any parameters from the URL.

    const options =
    {
        mode: "no-cors",
    };

    try
    {
        const response = await fetch (url, options);

        if (response.status === 404)
        {
            console.log ("404 - " + url);
            return false;
        }
        else if (response.status === 502)
        {
            console.log ("502 - " + url);
            return false;
        }
        else if (response.status === 403)
        {
            console.log ("403 - " + url);
            return false;
        }
        else
        {
            return true;
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

function ReplaceBrokenCameraImage (img)
{
    img.onerror = "";
    img.src = "/img/no_camera.png";
    return true;
}