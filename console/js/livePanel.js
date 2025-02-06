function OpenLivePanel ()
{
    clearTimeout (timeOutID);
    document.getElementById ("LivePanel").style.visibility = "visible";
    document.getElementById ("BackButton").style.visibility = "visible";
}

function CloseLivePanel ()
{
    location.reload ();
}