# Script library

The scriptLib.js file contains functions that can be used in BBOalert data.

To load the library the data should contain the record :

    //Javascript,https://raw.githubusercontent.com/stanmaz/BBOalert/master/Scripts/stanmazLib.js
    
The library contains functions modifying the BBO user interface. With each feature an inline script is presented enabling this feature.
 
The effects of different functions :

![](./images/Screen01.png)
  
## Features

### Hover tabs

    //Script,onAnyMutation,stanmazLib.HOVER_BBOALERT_TAB(true);
    
HOVER_BBOALERT_TAB function enables toggeling the BBOalert tab by simply moving the mouse :

- BBOalert tab is displayed when the mouse pointer enters it
- BBOalert tab is hidden when the mouse pointer enters a BBO tab

### Card Colors

    //Script,onAnyMutation,stanmazLib.CARD_COLORS(true);
    
CARD_COLORS function modifies card symbol colors to help color blind players.

### Rearrange the table

    //Script,onAnyMutation,stanmazLib.DEAL_TOOLBAR_RIGHT();
    
The table is moved to the left side of the screen leaving more space.

### Remove icons from tabs

    //Script,onAnyMutation,stanmazLib.REMOVE_ICONS_FROM_TABS();

The icons occupy space on the tabs. This can prevent in some cases BBOalert tab to be displayed correctly.

### Large bidding box

    //Script,onAnyMutation,stanmazLib.LARGE_BIDDING_BOX(true);
    
On smaller screens large bidding box may be useful to avoid bidding errors.

### Modified bid confirmation button

    //Script,onAnyMutation,stanmazLib.NEW_OK_BUTTON();
    
The selected bid replaces the OK text on the bid confirmation button

![](./images/Modified OK Button.png)

### Backspace buttons

    //Script,onAnyMutation,stanmazLib.BACKSPACE_BUTTONS(false);
    
The backspace buttons on the BBOalert button panel can be removed to free one row of buttons.





  
