var timeOutID;
var refreshCounter = 0;

function SetRefresh ()
{
    timeOutID = setTimeout (function ()
    {
        if (refreshCounter === 5) // Refresh the page every 5 reloads.
        {
            location.reload (); // Refresh the page.
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