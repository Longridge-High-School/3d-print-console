var timeOutID;
var refreshCounter = 0;
var lastInteractionTime;

window.addEventListener ("load", function ()
{
    document.body.addEventListener ("mousemove", UpdateLastInteractionTime);
    document.addEventListener ("click", UpdateLastInteractionTime);
    document.addEventListener ("scroll", UpdateLastInteractionTime);
    document.onkeydown = UpdateLastInteractionTime;
});

function SetRefresh ()
{
    timeOutID = setTimeout (function ()
    {
        console.log ("You have ~" + (50 - (refreshCounter * 10)) + " seconds until the refresh check.");

        if (refreshCounter === 5) // Try and refresh the page every 5 reloads.
        {
            if (Date.now () - lastInteractionTime < 50000) // Check if the user has interacted with the page recently to try and avoid reloading while they're trying to do something.
            {
                CreateTable (); // Regenerate the table.
                refreshCounter = 0; // Try again later.
            }
            else
            {
                location.reload (); // Refresh the page.
            }
        }
        else
        {
            refreshCounter++;
            CreateTable (); // Regenerate the table.
        }
    }, 10000);
}

function ClearRefresh ()
{
    clearTimeout (timeOutID);
}

function UpdateLastInteractionTime ()
{
    lastInteractionTime = Date.now ();
}