async function AddCamerasFromFile ()
{
    const response = await fetch ("/data/cameras.json");
    cameras = await response.json ();

    for (var camera of cameras)
    {
        container.innerHTML += `<iframe src = "${camera.url}" title = "${camera.title}" allowfullscreen = "" frameborder = "0" width = "640" height = "480"></iframe><br>`;
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