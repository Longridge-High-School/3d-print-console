/*
*   *************************************
*   *   WIDGET DEVELOPMENT KIT (WDK)    *
*   *************************************
*
*   A library for making 3D Print Console widgets.
*   Licensed under the MIT License.
*   See below for version number.
*/

const WDK =
{
    version: 1.0,
    printers: [],
    parameterList: new URLSearchParams (),
    colours:
    {
        primary: "",
        secondary: "",
        headerFooterText: ""
    },

    Hello: function ()
    {
        console.log ("Hello World!");
    },

    IsDotnet: function ()
    {
        if (sessionStorage.getItem ("IS_3D_PRINT_CONSOLE_DOTNET") == "true")
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    GetStatus: async function (host, key)
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
        catch
        {
            return "Network Error".toString ();
        }
    },

    GetCurrentFile: async function (host, key)
    {
        const options =
        {
            method: "GET",
            headers: new Headers ({"X-Api-Key": key}),
        };

        try
        {
            const response = await fetch (host + "/api/job", options);
            var data = await response.json ();
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
    },

    GetPrinters: async function ()
    {
        const response = await fetch ("/data/printers.json");
        this.printers = await response.json ();
    },

    GetBrandColours: async function ()
    {
        const response = await fetch ("/data/config.json");
        const config = await response.json ();

        document.querySelector (":root").style.setProperty ("--primary", config.brandColour);
        document.querySelector (":root").style.setProperty ("--secondary", config.smallScreenLiveColour);
        document.querySelector (":root").style.setProperty ("--headerFooterTextColour", config.headerFooterTextColour);

        this.colours.primary = config.brandColour;
        this.colours.secondary = config.smallScreenLiveColour;
        this.colours.headerFooterText = config.headerFooterTextColour;
    },

    GetPrinterByID: function (id)
    {
        for (var printer of this.printers)
        {
            if (printer.id == id)
            {
                return printer;
            }
        }
    },

    SendGcodeString: async function (id, gcode, name)
    {
        var host = this.GetPrinterByID (id).host;
        var key = this.GetPrinterByID (id).key;

        const gcodeBlob = new Blob ([new TextEncoder ().encode (gcode)], {type : "text/plain;charset=utf-8"});

        form = new FormData ();
        form.append ("file", gcodeBlob, name + ".gcode");
        form.append ("select", "true")

        const options =
        {
            method: "POST",
            headers: new Headers ({"X-Api-Key": key}),
            body: form
        };

        await fetch (host + "/api/files/local", options);
    },

    SendGcodeURL: async function (id, url, name)
    {
        const response = await fetch (url);
        const gcode = await response.text ();
        await this.SendGcodeString (id, gcode, name);
    },

    Start: async function (id)
    {
        const printer = this.GetPrinterByID (id);

        const options =
        {
            method: "POST",
            mode: "cors",
            headers: new Headers ({"X-Api-Key": printer.key, "Accept": "application/json", "Content-Type": "application/json"}),
            body: JSON.stringify ({"command": "start"})
        };

        await fetch (printer.host + "/api/job", options);
    },

    Pause: async function (id)
    {
        const printer = this.GetPrinterByID (id);

        const options =
        {
            method: "POST",
            mode: "cors",
            headers: new Headers ({"X-Api-Key": printer.key, "Accept": "application/json", "Content-Type": "application/json"}),
            body: JSON.stringify ({"command": "pause"})
        };

        await fetch (printer.host + "/api/job", options);
    },

    Cancel: async function (id)
    {
        const printer = this.GetPrinterByID (id);

        const options =
        {
            method: "POST",
            mode: "cors",
            headers: new Headers ({"X-Api-Key": printer.key, "Accept": "application/json", "Content-Type": "application/json"}),
            body: JSON.stringify ({"command": "cancel"})
        };

        await fetch (printer.host + "/api/job", options);
    },

    Restart: async function (id)
    {
        const printer = this.GetPrinterByID (id);

        const options =
        {
            method: "POST",
            mode: "cors",
            headers: new Headers ({"X-Api-Key": printer.key, "Accept": "application/json", "Content-Type": "application/json"}),
            body: JSON.stringify ({"command": "restart"})
        };

        await fetch (printer.host + "/api/job", options);
    }
};

WDK.GetPrinters ();
WDK.GetBrandColours ();
WDK.parameterList = new URLSearchParams (window.location.search);