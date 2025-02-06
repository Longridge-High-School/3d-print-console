async function Connect (host, key, port)
{
    const options =
    {
        method: "POST",
        mode: "cors",
        headers: new Headers ({"X-Api-Key": key, "Accept": "application/json", "Content-Type": "application/json"}),
        body: JSON.stringify ({"command": "connect", "port": port, "save": true, "autoconnect": true})
    };

    const response = await fetch (host + "/api/connection", options);
}

async function PowerOn ()
{
    clearTimeout (timeOutID);

    const response = await fetch ("/data/printers.json");
    printers = await response.json ();
    
    for (var i = 0; i < printers.length; i++)
    {
        console.log (i);
        
        if (i == 0)
        {
            alert ("Please make sure only " + printers [0].name +  " is switched on. All other printers should be switched off. When this is the case, press OK.");
        }
        else
        {
            alert ("Now turn on " + printers [i].name +  ", and press OK once the printer is fully loaded.");
        }

        await Connect (printers [i].host, printers [i].key, printers [i].port);
    }
    
    alert ("All printers should be reconnected after a few seconds.");
    window.location.reload (1);
}