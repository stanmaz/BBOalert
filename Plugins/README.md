# Plugins

Plugins are user configurable scripts. To install the plugin include in your data the following record :

    Javascript,https://github.com/stanmaz/BBOalert/blob/master/Plugins/stanmazPlugin.js

This plugin contains scripts which are disabled by default. The parameters of scripts may be modified by selecting the script from the "Plugin settings...'. The settings are preserved in the browser's cache and loaded at the next session. This plugin replaces many old scripts which ware included in your code. To avoid conflicts remove the old scripts with the same functionality.

The parameter names used in the configuration dialog boxes are generally self-explanatory but :

- <b>Miscellaneous simple scripts</b>
    -  <b>Disable alerts with casual partner</b> : if set the automatic alerts will be disabled for all partners not declared with any option. It is acceptable to create a dummy empty option just for this purpose. Example :

        Option,dummy,myID+partner1ID,myID+partner2ID
        

