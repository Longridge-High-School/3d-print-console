async function CreateTable ()
{
    const response = await fetch ("/data/printers.json");
    printers = await response.json ();
    let content = "";

    for (var printer of printers)
    {
        try
        {
            const status = await GetStatus (printer.host, printer.key);
            let row = "";

            if (status == "Network Error")
            {
                var managementURL = printer.host;

                if (printer.managementURL != null)
                {
                    managementURL = printer.managementURL;
                }

                row += "<td style = 'text-align: center;'><h3>" + printer.name + "</h3><br><p><a href = '" + managementURL + "' target = '_blank'>Access Device</a></p></td>";
                row += "<td><b>Status:</b><br>⚠️ Network Error!<br><br></td>";

                if (!CheckKioskMode ())
                {
                    row += "<td colspan = 4></td>";
                }
                else
                {
                    row += "<td colspan = 3></td>";
                }

                content += `<tr style = "background-color: ${printer.background}">${row}</tr>`;
            }
            else
            {
                var managementURL = printer.host;

                if (printer.managementURL != null)
                {
                    managementURL = printer.managementURL;
                }

                row += `<td style = "text-align: center;"><h3>${printer.name}</h3><br><p><a href = "${managementURL}" target = "_blank">Access Device</a></p></td>`;
                row += `<td>
                                        <b>Status:</b>
                                        <br>` + status + `<br><br>
                                        ` + await GetJobStatus (printer.host, printer.key) + `
                                    </td>`;
                row += "<td><b>Current File:</b><br>" + await GetCurrentFile (printer.host, printer.key) + "</td>";
                row += `<td>
                                    <b>Filament Colour:</b><br>
                                    <svg width = "30" height = "30" xmlns = "http://www.w3.org/2000/svg">
                                        <pattern id = "pattern-checkers" x = "0" y = "0" width = "10" height = "10" patternUnits = "userSpaceOnUse">
                                            <rect fill = "grey" x = "0" width = "5" height = "5" y = "0"></rect>
                                            <rect fill = "white" x = "5" width = "5" height = "5" y = "0"></rect>
                                            <rect fill = "white" x = "0" width = "5" height = "5" y = "5"></rect>
                                            <rect fill = "grey" x = "5" width = "5" height = "5" y = "5"></rect>
                                        </pattern>
                                        <circle cx = "15" cy = "15" r = "10" stroke = "black" stroke-width = "2" fill = "url(#pattern-checkers)" />
                                        <circle cx = "15" cy = "15" r = "10" stroke = "black" stroke-width = "2" fill = "${printer.filament}" />
                                    </svg>
                                </td>`;
                if (printer.locked)
                {
                    if (!CheckKioskMode ())
                    {
                        row += `<td colspan = 2><div class = "LockedText">🔒 Printer Locked</div></td>`;
                    }
                }
                else
                {
                    if (!CheckKioskMode ())
                    {
                        if (status == "Ready to Print")
                        {
                            row += `<td><button onclick = 'Job (${printer.id}, "start");'>✅ Start Printing</button></td>`;
                        }
                        else if (status == "Paused")
                        {
                            row += `<td><button onclick = 'Job (${printer.id}, "pause");'>⏯️ Resume</button><br>`;
                            row += `<button onclick = 'Job (${printer.id}, "cancel");'>❌ Cancel</button><br>`;
                            row += `<button onclick = 'Job (${printer.id}, "restart");'>🔁 Restart</button></td>`;
                        }
                        else if (status == "Busy Printing")
                        {
                            row += `<td><button onclick = 'Job (${printer.id}, "pause");'>⏯️ Pause</button><br>`;
                            row += `<button onclick = 'Job (${printer.id}, "cancel");'>❌ Cancel</button></td>`;
                        }
                        else
                        {
                            row += `<td><div style = "vertical-align: center; text-align: center;">
                                        <div class = "loader"></div>
                                        <p><i>Please wait...</i></p>
                                    </div></td>`;
                        }

                        row += `<td>
                                            <input type = "file" accept = "` + printer.file + `" id = "file_` + printer.host + `" name = "file" onclick = "clearTimeout (timeOutID);">
                                            <br>
                                            <button onclick = "UploadFile (` + printer.id + `);">⬆️ Upload & Select File</button>
                                        </td>`;
                    }
                }

                content += `<tr style = "background-color: ${printer.background}">${row}</tr>`;
            }
        }
        catch (error)
        {
            let row = "";
            row += "<td style = 'text-align: center;'><h3>" + printer.name + "</h3><br><p><a href = '" + printer.host + "' target = '_blank'>Access Device</a></p></td>";
            row += `<td><b>Status:</b><br>⚠️ Offline<br><br><button onclick = "Connect ('${printer.host}', '${printer.key}', '${printer.port}');">Attempt to Reconnect</button></td>`;

            if (!CheckKioskMode ())
            {
                row += "<td colspan = 4></td>";
            }
            else
            {
                row += "<td colspan = 3></td>";
            }

            content += `<tr style = "background-color: ${printer.background}">${row}</tr>`;
        }
    }

    mainTable.innerHTML = content; // Write new table.
    
    SetRefresh (); // Reload data in 10 seconds.
}

async function GetStatus (host, key)
{
    const options =
    {
        method: "GET",
        headers: new Headers ({"X-Api-Key": key}),
    };

    try
    {
        const response = await fetch (host + "/api/printer?exclude=temperature,sd", options);
        data = await response.json ();
    }
    catch
    {
        return "Network Error".toString ();
    }

    if (data.state.flags.error == "true")
    {
        return data.state.error;
    }
    else if (data.state.flags.cancelling)
    {
        return "Cancelling...";
    }
    else if (data.state.flags.pausing)
    {
        return "Pausing...";
    }
    else if (data.state.flags.resuming)
    {
        return "Resuming...";
    }
    else if (data.state.flags.finishing)
    {
        return "Finishing Job...";
    }
    else if (data.state.flags.printing)
    {
        return "Busy Printing";
    }
    else if (data.state.flags.paused)
    {
        return "Paused";
    }
    else if (data.state.flags.ready)
    {
        return "Ready to Print";
    }
    else
    {
        return data.state.text;
    }
}

async function GetJobStatus (host, key)
{
    const options =
    {
        method: "GET",
        headers: new Headers ({"X-Api-Key": key}),
    };

    try
    {
        const response = await fetch (host + "/api/job", options);
        data = await response.json ();
    }
    catch
    {
        return "Network Error!";
    }

    var completion = data.progress.completion;
    var printTime = data.progress.printTime;
    var printTimeLeft = data.progress.printTimeLeft

    if (completion == null)
    {
        completion = 0;
    }

    if (printTime == null)
    {
        printTime = 0;
    }

    if (printTimeLeft == null)
    {
        printTimeLeft = "Unknown";
    }
    else
    {
        printTimeLeft = new Date (printTimeLeft * 1000).toISOString ().slice (11, 19);
    }

    return "<div class = 'JobStatus'><b>Progress:</b> " + Math.round (completion) + "%<br><b>Time Taken:</b> " + new Date (printTime * 1000).toISOString ().slice (11, 19) + "<br><b>Estimated Time Remaining:</b> " + printTimeLeft + "</div>";
}

async function UploadFile (id)
{
    host = printers [id].host;
    key = printers [id].key;

    fileElement = document.getElementById ("file_" + host);

    if (fileElement.files [0].name != null)
    {
        await WriteLog ("Uploaded file " + fileElement.files [0].name + " to " + printers [id].name + ".");

        form = new FormData ();
        form.append ("file", fileElement.files [0], fileElement.files [0].name);
        form.append ("select", "true")

        const options =
        {
            method: "POST",
            headers: new Headers ({"X-Api-Key": key}),
            body: form
        };

        const response = await fetch (host + "/api/files/local", options);

        location.reload ();
    }
}

async function GetCurrentFile (host, key)
{
    const options =
    {
        method: "GET",
        headers: new Headers ({"X-Api-Key": key}),
    };

    try
    {
        const response = await fetch (host + "/api/job", options);
        data = await response.json ();
    }
    catch
    {
        return "Network Error!";
    }

    if (data.job.file.name === null)
    {
        return "No File Selected";
    }
    else
    {
        return data.job.file.name;
    }
}

async function Job (id, command)
{
    host = printers [id].host;
    key = printers [id].key;

    await WriteLog (`Ran command "${command}" on ${printers [id].name}.`);

    const options =
    {
        method: "POST",
        mode: "cors",
        headers: new Headers ({"X-Api-Key": key, "Accept": "application/json", "Content-Type": "application/json"}),
        body: JSON.stringify ({"command": command})
    };

    const response = await fetch (host + "/api/job", options);
    location.reload ();
}

async function WriteLog (message)
{
    form = new FormData ();
    form.append ("entry", message);

    const options =
    {
        method: "POST",
        mode: "cors",
        headers: new Headers (),
        body: form
    };

    const response = await fetch (logServer, options);
}

var printers;
const mainTable = document.getElementById ("MainTable");
CreateTable ();