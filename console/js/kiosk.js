function CheckKioskMode ()
{
    address = window.location.search;
    parameterList = new URLSearchParams (address);

    if (parameterList.get ("mode") === "kiosk" && parameterList.has ("mode"))
    {
        return true;
    }
    else
    {
        return false;
    }
}

if (!CheckKioskMode ())
{
    document.head.insertAdjacentHTML ("beforeend", `<link rel = "stylesheet" href = "/css/small.css" />`); // Don't use 4:3 UI in Kiosk Mode.
}