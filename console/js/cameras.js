async function AddCamerasFromFile ()
{
    const response = await fetch ("/data/cameras.json");
    cameras = await response.json ();

    for (var camera of cameras)
    {
        if (CheckCameraOperational (camera.url))
        {
            container.innerHTML += `<iframe src = "${camera.url}" title = "${camera.title}" allowfullscreen = "" frameborder = "0" width = "640" height = "480"></iframe><br>`;
        }
        else
        {
            container.innerHTML += `<img class = "CameraError" src = "/img/no_camera.png" alt = "No Camera" width = "640" height = "480"><br><br>`;
        }
    }
}

const slider = document.getElementById ("ScaleSlider");
const container = document.getElementById ("CameraContainer");

AddCamerasFromFile ();

if (localStorage.getItem ("cameraScale") != null)
{
    slider.value = localStorage.getItem ("cameraScale");
}

UpdateCameraScale ();

function UpdateCameraScale ()
{
    localStorage.setItem ("cameraScale", slider.value);
    container.style.transform = "scale(" + slider.value / 100 + ")";
}

function CheckCameraOperational (url)
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