async function LoadConfig ()
{
    const response = await fetch ("/data/config.json");
    config = await response.json ();

    logServer = config.logServer;

    document.querySelector (":root").style.setProperty ("--brandColour", config.brandColour);
    document.querySelector (":root").style.setProperty ("--smallScreenLiveColour", config.smallScreenLiveColour);
    document.querySelector (":root").style.setProperty ("--headerFooterTextColour", config.headerFooterTextColour);
}

var logServer;
LoadConfig ();