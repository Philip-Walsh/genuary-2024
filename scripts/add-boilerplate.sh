#!/bin/bash

for folder in */; do
    folder=${folder%/}
    echo "Creating files in folder: $folder"
    
    echo '<!DOCTYPE html>' > "$folder/index.html"
    echo '<html lang="en">' >> "$folder/index.html"
    echo '  <head>' >> "$folder/index.html"
    echo '    <meta charset="UTF-8">' >> "$folder/index.html"
    echo '    <meta name="viewport" content="width=device-width, initial-scale=1.0">' >> "$folder/index.html"
    echo "    <title>$folder</title>" >> "$folder/index.html"
    echo '    <link rel="stylesheet" href="main.css">' >> "$folder/index.html"
    echo '  </head>' >> "$folder/index.html"
    echo '  <body>' >> "$folder/index.html"
    echo '    <script src="main.js"></script>' >> "$folder/index.html"
    echo '  </body>' >> "$folder/index.html"
    echo '</html>' >> "$folder/index.html"

    touch "$folder/main.js"
    touch "$folder/main.css"

    echo "Files created in $folder"
done
