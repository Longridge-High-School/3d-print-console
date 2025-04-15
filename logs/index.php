<?php

    if ($_SERVER ["REQUEST_METHOD"] == "POST")
    {
        $time = date ("Y/m/d H:i:s");
        $ip = htmlspecialchars ($_SERVER ["HTTP_X_FORWARDED_FOR"]); // Work around proxy. Ideally, this should be $_SERVER ["REMOTE_ADDR"].
        $entry = htmlspecialchars ($_POST ["entry"]);
        
        $file = fopen ("/data/log.txt", "a");
        fwrite ($file, $time . " - " . $ip . ' - ' . $entry . "\n");
        fclose ($file);

        if (filesize ("/data/log.txt") > (1024 * 2048)) // Maximum file size 2 Mb.
        {
            $contents = explode ("\n", file_get_contents ("/data/log.txt"));

            for ($i = 0; $i < 100; $i++)
            {
                array_shift ($contents); // Delete first 100 entries.
            }
            
            file_put_contents ("/data/log.txt", implode (PHP_EOL, $contents));
        }
    }
?>

<!DOCTYPE html>
<html lang = "en-gb">
    <head>
        <meta charset = "utf-8">
        <title>3D Printer Console Logging</title>
    </head>
    <body>
        <p>3D Printer Console logging is running!</p>
    </body>
</html>
    