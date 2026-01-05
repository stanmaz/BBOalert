# TamperMonkey scripts

## How to install a script

- make sure the <b>TamperMonkey</b> browser extension is installed
- open the script file and press the <b>Raw</b> button
- press <b>Install</b>

## Script : LoveBridge Vugraph PBN

- open the https://vugraph.lovebridge.com/ page
- select <b>Running or Final Score/results</b> and press <b>Boards</b> (team events)
- select the starting board number and the segment number
- add to the page URL :
    - <b>&new</b> to clear the logfile cache before running the script
    - <b>&add</b> to run the script without clearing the cache
- reload the page. The script will open pages for each board one-by-one and will add PBN data to the cache, until no more boards are available.

Example :

Original URL : https://vugraph.lovebridge.com/screen/tbricfed/118292?screen=frequency&board=1&round=1

Modified URL : https://vugraph.lovebridge.com/screen/tbricfed/118292?screen=frequency&board=1&round=1&new<br>
or           : https://vugraph.lovebridge.com/screen/tbricfed/118292?screen=frequency&board=1&round=1&add
