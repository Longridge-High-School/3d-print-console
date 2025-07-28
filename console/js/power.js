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

    location.reload ();
}