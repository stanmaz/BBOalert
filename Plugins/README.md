# Plugins

Plugins are user configurable scripts. To install the plugin include in your data the following record :

    Javascript,https://github.com/stanmaz/BBOalert/blob/master/Plugins/stanmazPlugin.js

This plugin contains scripts which are disabled by default. The parameters of scripts may be modified by selecting the script from the "Plugin settings...'. The settings are preserved in the browser's cache and loaded at the next session. This plugin replaces many old scripts which were included in your code. To avoid conflicts remove the old scripts with the same functionality.

The script names used in the configuration dialog boxes are generally self-explanatory :

- <b>BBO event logging</b>
- <b>Modified suit colors</b>
- <b>Automatic prealert : the prealert shortcut is used when the opponents change</b>
- <b>Bidding timeout : automatically send a chat message when a bid takes too long</b>
- <b>Miscellaneous simple scripts</b>
    - Enable chat timestamp
    - Move table left
    - Remove icons from tabs
    - Large bidding box
    - Modified OK button : button text contains the actually selected bid
    - Swap bidding buttons : OK mmoved to the left side
    - Auto chat to opponents : chat destination forced to "Opponents" during the game. Otherwide is set to "Table"
    - <b>Disable alerts with casual partner</b> : if set the automatic alerts will be disabled for all partners not declared with any option. It is acceptable to create a dummy empty option just for this purpose. Example :

        Option,dummy,myID+partner1ID,myID+partner2ID
        
    - Disable alerts with casual partner
    - Remove Ads
    - T for 10

