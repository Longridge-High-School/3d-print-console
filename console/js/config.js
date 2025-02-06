async function LoadConfig ()
{
    const response = await fetch ("/data/config.json");
    config = await response.json ();

    logServer = config.logServer;

    document.querySelector (":root").style.setProperty ("--brandColour", config.brandColour);
    document.querySelector (":root").style.setProperty ("--smallScreenLiveColour", config.smallScreenLiveColour);
}

var logServer;
LoadConfig ();