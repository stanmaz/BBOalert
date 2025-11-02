# BBOalert

Version : 9.1

**Table Of Content**

  * [Purpose](#purpose)
  * [Installation](#installation)
  * [Menus](#menus)
  * [Data import/export](#data-importexport)
  * [Recommended way of using BBOalert](#recommended-way-of-using-bboalert)
  * [Alert button](#alert-button)
  * [Data file format](#data-file-format)
    + [Examples](#examples)
      - [Opening bid](#opening-bid)
      - [Development](#development)
      - [Development with opponents overcall](#development-with-opponents-overcall)
      - [Overcall](#overcall)
    + [Advanced features](#advanced-features)
      - [Seat-dependent openings](#seat-dependent-openings)
      - [Continued context](#continued-context)
      - [Markdown lists](#markdown-lists)
      - [Continuation line](#continuation-line)
      - [Long explanation text](#long-explanation-text)
      - [Wildcards](#wildcards)
      - [Regular Expressions - RegEx](#regular-expressions---regex)
    + [User definable scripts](#user-definable-scripts)
    + [Optional code](#optional-code)
    + [Partnership options](#partnership-options)
    + [Trusted code](#trusted-code)
    + [Auction control tags](#auction-control-tags)
    + [Keyboard Shortcuts](#keyboard-shortcuts)
    + [Button Shortcuts](#button-shortcuts)
    + [Alias](#alias)
    + [Full Disclosure BSS file support](#full-disclosure-bss-file-support)
    + [Using BBO convention card to share data](#using-bbo-convention-card-to-share-data)
    + [Web storage support](#web-storage-support)
      - [Google Docs](#google-docs)
      - [Google Drive](#google-drive)
      - [OneDrive](#onedrive)
      - [Github](#github)
      - [Dropbox](#dropbox)
      - [Blogger](#blogger)
      - [BBOalert data](#bboalert-data)
      - [Scripts](#scripts)

For recent changes see the release notes:

https://docs.google.com/document/d/e/2PACX-1vQ_8Iv9HbBj4nWDXSY_kHsW1ZP_4c4dbOVO0GLuObJc1vFu_TBg9oV6ZJXMWd_tLITOj7i6WaJBeZJI/pub

We assume that you are familiar with BBO.

BBOalert is a browser extension that minimizes manual operations required by the alerting procedure while playing bridge on BBO (www.bridgebase.com).

It records alerted calls and automatically alerts the recorded calls.

It offers advanced features such as:
- efficient coding of alerts using wildcards, RegEx expressions and user scripts
- declaring conventions in optional blocks of code that can be turned on and off
- declaring which conventions you play with which partner
- seat-dependent openings and development
- vulnerability-dependent openings and development
- keyboard and button shortcuts and abbreviations
- Full Disclosure BSS file support
- adding custom features using JavaScript
- sharing your data using Google Drive, OneDrive, Dropbox or GitHub storage

If you decide to use BBOalert, join the users community on Facebook: https://www.facebook.com/groups/706384146770707/

Facebook should be used to report bugs, propose enhancements and ask questions.

## Purpose

Tired of repeating the same explanations when alerting your bids on BBO? If so, this browser extension is your friend.

During the bidding, conventional calls must be alerted and explained to the opponents. Playing artificial bidding systems on BBO is not practical because explaining every alerted call is time-consuming.

BBOalert solves this problem. Artificial bidding sequences can be predefined in a table. Opponents get the explanation automatically and immediately. Explanations entered manually during a game are also recorded for later reuse.

BBOalert has similar functionality to the old "Full Disclosure" tool, which is no longer supported by BBO. One difference should be emphasized:

- "Full Disclosure" aimed at a formal and complete description of a bidding system to be maintained on the BBO server. Its code is complex and not easy to read.
- BBOalert is strictly for personal use and is designed to automate disclosure of specific agreements. The simplicity of the code makes it readable and maintainable.

The program can read old "Full Disclosure" BSS files. This helps many users of the old Windows/Flash Full Disclosure tool to migrate to the HTML version without losing Full Disclosure functionality.

BBOalert is useful for all types of BBO users:

- casual players without a regular partner: the common bidding system for many BBO users is SAYC. In such a case, only a few bids should be alerted pro forma because all players are expected to understand the common agreements.
- 'natural' players with a regular partner: SAYC is simple but inefficient in many situations. Adding some gadgets gives obvious advantages. BBOalert will help document particular agreements and make alerting easier.
- 'artificial' players with a regular partner: playing an artificial system on BBO is otherwise impractical because almost every bid should be alerted and explained. BBOalert automates that.

## Installation

This extension can be installed using the links below:

- Firefox: https://addons.mozilla.org/en-US/firefox/addon/bboalert  
  The following supplementary action is required to enable clipboard operations:
    - Open about:config and accept the security warnings
    - Search for the clipboard keyword
    - Set dom.events.asyncClipboard.readText and dom.events.testing.asyncClipboard to true

![](./images/FirefoxClipboardPermissions.png)

- Chrome: https://chrome.google.com/webstore/detail/bboalert/bjgihidachainhhhilkeemegdhehnlcf

If you discover a serious bug in the program:
- report it to the BBOalert community on Facebook
- to revert to previous versions:
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/bboalert/versions
   - Chrome: see [installing Chrome extension from ZIP file](./oldChromeVersions)

After you start BBO, the screen should look like this (note the red/blue panel at the right):

![](./images/BBOalertOk.png)

At the right side of the page, an additional 'BBOalert' tab is created. Clicking that tab will toggle the BBOalert panel display. This tab is only partially integrated with the regular BBO tabs:

- it shares the same display area
- selecting the BBOalert tab will not deselect the open BBO tab
- selecting a BBO tab will turn the BBOalert tab off

BBOalert creates four panels:

- "Data": the default panel containing:
   - "Data" menu for importing and exporting data
   - "Settings" menu for enabling/disabling features
   - a text area to display program messages
- "Options": to enable/disable user-definable optional blocks of data
- "Shortcuts": to access user-definable text shortcut buttons
- "Documents": to display release notes and imported documents

The panels can be selected by clicking the corresponding buttons at the top of the panel.

### Menus

The "Data" menu contains commands related to data input/output:

- Paste (New): read new data from the clipboard
- Paste (Append): append additional data from the clipboard
- Clear: erase all data
- Copy All: write all data to the clipboard
- Copy New: write data related to the manual alerts to the clipboard
- Copy Log: write log data to the clipboard. Log data should be provided with a bug report related to unexpected bid explanations retrieved from the data
- Copy Original: write the original data entered with the Paste (New) command
- Clear Recent URLs: clear the list of URLs previously entered with Paste (New)
- Bidding Scenarios: loads data for practicing typical bidding scenarios. See https://github.com/ADavidBailey/Practice-Bidding-Scenarios/blob/main/README.md for details

The "Settings" menu contains commands to enable/disable features:

- Shortcuts: if enabled, the "Shortcuts" panel will appear automatically at the start of text entry (chat or explanation text)
- Hover BBOalert Tabs: if enabled, the BBOalert panels are selected by moving the mouse over the corresponding button at the top of the BBOalert panel
- Hover BBO Tabs: if enabled, the BBO tabs at the right side are selected by moving the mouse over the tab
- Collapse Options: if enabled, mutually exclusive blocks of data are grouped together and only the selected block is shown. This feature is particularly useful to save space on the panel
- Disable recording: if set, manual alerts are not recorded
- Disable auto-alerts: if set, automatic alerting mechanism is disabled
- Silent startup: if set, BBOalert will remain hidden while starting the BBO session
- BBOalert button: if set, a button will be used instead of the tab to toggle the BBOalert panel
- Deferred alerts: if set, automatic alert explanations will happen only on demand by opponents

It is recommended to get familiar with the basic BBOalert functions by following the included tutorial.

Through the "Plugin settings..." menu additional self-explanatory utilities can be enabled and configured:
- BBO event logging: produces a CSV log file containing all relevant events with timing information. Useful as evidence of slow play.
- Modified suit colors: allows customization of suit colors. [Standard HTML color names](https://www.w3schools.com/html/html_colors.asp) or rgb(...) code may be used.

![](./images/ModifiedSuitColors.png)

- Automatic prealert: The text defined with the PREALERT shortcut will be sent as chat when opponents change. Instead of PREALERT you may use your own shortcut name.
- Bidding timeout: automatically produces chat messages when the opponents exceed the defined time limits.
- Miscellaneous simple scripts:
    - Enable chat timestamp: adds a timestamp to each new chat message
    - Move table left: pushes the table area to the left side of the screen to maximize the space reserved for the BBOalert panel
    - Large bidding box: maximizes the size of the bidding box

![](./images/LargeBiddingBox.png)

    - Modified OK button: The OK text is replaced by the actually selected call for better control before confirming.
    - Swap bidding buttons: The OK button is moved to the left side of the bidding box, PASS, DBL, RDBL and ALERT buttons to the right side.
    - Auto chat to opponents: the chat destination will be automatically set to OPPONENTS between the auction begin and the last trick played; thereafter it will be set back to TABLE.
    - Disable alerts with casual partner: automatic alerts will be disabled when you play with a partner not defined in any OPTION partnership.
    - T for 10: T will be used instead of 10 on card symbols.

## Data import/export

BBOalert uses the clipboard to import or export data. Using the clipboard instead of direct file access gives the user the freedom of choice of text editing tool. The code can be edited as a simple ASCII text file.

To import data:
- open the data file using your favorite text editor (see section: 'Data file format')
- select all text (usually with Ctrl-A)
- copy it to the clipboard (usually with Ctrl-C)
- select "Paste (New)" from the "Data" menu on the blue BBOalert panel

## Recommended way of using BBOalert

- BBOalert requires BBO in split screen mode (Account + Settings + Split Screen).
- It is recommended to enable 'Confirm Bids' (Account + Settings + Confirm Bids). This gives you the opportunity to verify if the explanation is correct before sending it to the opponents.
- Data is saved in the browser cache and is recalled automatically at the next session. Use 'Paste (New)' only if the data has changed or if the cache has been cleared.
- 'Paste (Append)' allows you to add code to previously pasted data. This makes it practical to split data into separate files for openings, development, overcalls, and shortcuts.
- Only BBOalert native code can be appended, not BSS data. However, appending BBOalert native data to previously imported BSS data is allowed.
- With the 'Copy New' command you can copy manual alerts to the clipboard and paste them at the end of your data file. The records imported this way will contain a timestamp and the deal number.
- BBOalert was designed initially for BBO in English and then adapted to other languages. If you discover incompatibilities of BBOalert with BBO in your language:
   - switch to https://www.bridgebase.com/v3/?lang=en
   - report the problem to stanmaz.git@gmail.com

We use the "You only alert once" principle. All you need to do in the beginning is to play and alert if necessary. Your explanations will be recorded in the browser cache and in the clipboard.

It is more efficient to prepare data in advance with a text editor and paste this data into BBOalert. It is unnecessary to code your entire system at once; work incrementally.

You and your partner should use the same data. The simple but inefficient method is to edit the data locally and share the file as an email attachment. The best way of sharing data is by using cloud storage or GitHub as described below.

## Alert button

Turning 'Alert' ON and OFF will erase the explanation text. Thereafter you are free to enter a new explanation text that will be recorded.

## Data file format

Comma separated value (CSV) format is used for each record.

The file must begin with the header record:

   BBOalert[,<user text>]

Where:

- BBOalert is the mandatory keyword
- <user text> is optional free text. Typically used to express the version of the data. It will be displayed after data import. HTML codes \<br> (line break) and \<b> (bold text) are allowed. Example:

      BBOalert,My System<br>Version <b>52</b>

Alerted calls should contain at least three text fields separated by commas:

    <context>,<call>,<explanation>[,optional text ignored by BBOalert]

where "context" is the bidding sequence preceding the "call". In those two fields we use two-character self-explaining tokens:

    1C 1D 1H 1S 1N Db Rd 2C 2D ....

To increase readability of the code:
- we use '--' token for pass instead of 'Pa'
- outside of the data records free text is allowed for documentation purposes
- leading and trailing spaces and tabs are allowed in all fields
- spaces are allowed in the context field

### Examples

#### Opening bid

    ,1N,12-14p balanced

Note:
- empty "context" field in the first record, because there is no bid before the opening
- any passes preceding the opening are ignored

#### Development

    1N--,2C,Stayman can be weak
    1N--2C--,2D,No 4 card major

Note: -- codes mean pass by opponents

#### Development with opponents overcall

    1HDb,Rd,9+p misfit !H penalty redouble

#### Overcall

    1D,2D,Major two-suiter

### Advanced features

#### Seat-dependent openings

An empty "context" field means seat-independent opening. By using leading -- codes you can define seat-dependent openings. Placed after the seat-independent opening code, it will override it for the specific situation.

    ,1S,12-21p 5+!S,    This is the normal opening for all seats
    ----,1S,8-21 5+!S,    except after two passes. It can be weaker
    ----1S--,2C,Drury,    in such a case Drury is used

The preferred alternative method of coding seat-dependent openings is presented in the "Optional code" section.

#### Continued context

If the context is identical with the previous record, the '+' character can be used in the "context" field.

Example: instead of

    1N--,    2C,    Stayman
    1N--,    2D,    Texas !H
    1N--,    2H,    Texas !S

you can write

    1N--,    2C,    Stayman
    +,       2D,    Texas !H
    +,       2H,    Texas !S

#### Markdown lists

Bidding sequences can be coded as hierarchical lists. Markdown unordered list syntax applies. Example:

    ,1N,15-17p
    - 2C Stayman
        - 2D no 4-card major
            - 2H weak major two-suiter
    - 2D Transfer

Rules:
- The starting point of the tree must be coded in the normal way (context,call,explanation)
- Indentation:
    - Level 1 must start with a hyphen with no leading spaces
    - Level N indentation = (N-1)x4 spaces (exactly a multiple of 4) and a hyphen
- Within the list the call and its explanation should be separated by space(s) and/or tab(s), not by a comma
- By default opponents are assumed to pass. If they don’t, add their bid before your bid separated by a comma. Example of a 2C response after RHO’s double:

    ,1N,15-17p
    - Db,2C to play

An asterisk may be used instead of a hyphen.

#### Continuation line

To increase readability, it is possible to split a long record over more than one line. When a record ends with a backslash, it is concatenated with the next record. Example: instead of

      (1N--|2N--|2C--2D--2N..),               3C,     Puppet Stayman

you can write:

      (1N--|\
       2N--|\
       2C--2D--2N..),               3C,     Puppet Stayman

#### Long explanation text

If you need more than about 69 characters to explain an alerted call, place a '#' character in the middle of the text. It will split the text into two parts: the first part will be used as the alert explanation visible on the table and the second part will be sent as a chat message to the opponents.

Example:

    1S,2C,Please read chat for explanation#Natural overcall with at least a decent 5-card suit

The chat message will be sent automatically. Make sure that chat messages are addressed to the opponents. Your partner is not supposed to read your auto-alert.

#### Wildcards

When the meaning of the call is not influenced by an eventual overcall, wildcards can be used in the "context" field. This can make the code more readable and more compact. Two-character wildcards are supported.

    1N__,2H,Transfer->!S

This means: whatever the opponents do, 2H remains a mandatory transfer to 2S. Otherwise code should be provided for all possible overcalls made by the opponents.

#### Regular Expressions - RegEx

Both "context" and "call" fields can also be formatted as regular expressions (RegEx) for matching the actual bidding context.

RegEx can be used in two forms:

- explicit by enclosing the string between slashes: the matched strings may have different length (partial match)
- implicit without slashes: the matched strings should be of the same length (full match)

RegEx is a powerful mechanism. In BBOalert we use primarily groups of string matching patterns. Example:

      (1N--|2N--|2C--2D--2N..),               3C,     Puppet Stayman

This means that the 3C call is defined in one record as Puppet Stayman in three similar situations:
- after 1NT opening
- after 2NT opening
- after 2C-2D-2NT sequence

Further development can be coded as:

      (1N--3C--|2N--3C--|2C--2D--2N--3C--),       3D,    at least one 4 card major
      +,                                          3H,    5 card !H
      +,                                          3S,    5 card !S
      +,                                          3N,    no 4+ card major

For matching a single character, brackets may be used. Example where after either 1H or 1S opening, Jacoby 2NT raise is used:

      1[HS]--,2N,+12HCP and 4+ card fit

Avoid using the '*' wildcard in regular expressions for context matching as it can match strings of any length and lead to unpredictable results. In BBOalert, '*' and '_' are treated specially and will be converted internally.

If the 'context' field starts and ends with a slash, it is interpreted as a pure RegEx. Common patterns useful for contexts:

      //                            match any string
      /^startString/                match starting string
      /endString$/                  match ending string
      /^startString.*endString$/    match both
      /^String$/                    exact match

Examples:

      //,4N,Blackwood 5 key cards               ,after any bidding sequence 4NT is Blackwood
      /^1N/,4N,Quantitative slam try            ,except after 1NT opening
      /4N--$/,5C,1 or 4 key cards               ,response to Blackwood
      /4N--$/,5D,0 or 3 key cards
      /4N--$/,5H,2 key cards without trump Queen
      /4N--$/,5S,2 key cards with trump Queen
      /Db$/,--,to play doubled                  ,in any case pass after double is to play
      /Db$/,Rd,forcing; may be SOS              ,but redouble is forcing
      /^(1N|1N----)$/,Db,for penalties

When the <call> field contains a regex group listing possible bids with different explanations, the explanations can be listed in the same record as supplementary comma-separated fields.

Example:

    1N--,(2C|2D|2H|2S),Stayman,Texas !H,Texas !S,Texas !C

Wildcards and regular expressions are powerful features to make more compact code, but must be used carefully.

### User definable scripts

This feature requires knowledge of RegEx and JavaScript.
Portions of the text can be replaced by the result returned by a user-definable script. The script name is enclosed between two % characters.

Scripts may be used in fields:
- bidding context
- call
- explanation text
- shortcut text
- button text

Example data file:

      BBOalert
      Script,X,R = C.match(makeRegExp(CR))[1];
      Script,Y,R = C.match(makeRegExp(CR))[2];
      1([HS])--,2N,+12HCP and 4+!%X%
      1([HS])2([CD]),2N,11-12HCP misfit !%X% stopper !%Y%

Note: X and Y are arbitrary script names; there are no specific limitations.

The script should use variables:
- CR : <context> field
- C : actual bidding context
- BR : <call> field
- B : actual call (bid)
- R : string to be returned

The script may use the makeRegExp function, which transforms the string into a RegExp object. BBOalert wildcards _ and * will be replaced by dots where appropriate.
- Each statement must end with ;
- To span the script over multiple lines use \ at the end of the line

More information about scripting can be found in the "Scripting in BBOalert.pdf" file.

Scripting allows custom data syntax. This feature is experimental; see the Scripts/CustomSyntax folder for details.

### Optional code

Many players use SAYC as a common base system, but opponents may use other systems (ACOL, French Standard, etc.). To handle that, BBOalert supports optional blocks of code that can be enabled or disabled.

The keyword 'Option' followed by the option name starts an optional block. The block ends when another Option block is started or when a bare 'Option' keyword closes the group. The selectable options will appear in the Options menu.

Example of mutually exclusive options:

```
Option,vs1NT weak
... code for overcalls after weak 1NT opening
Option,vs1NT strong
... code for overcalls after strong 1NT opening
```

You can also create mutually exclusive options to enable/disable recorded alerts by default. For example:

```
Option,Recorded OFF
... (default: do not enable recorded alerts)
Option,Recorded ON 
... (enable recorded alerts)
Option
```

Optional blocks of data can also be used for:
- vulnerability-dependent openings by using @n or @v tags (our vulnerability) or @N or @V (opponent's vulnerability)
- seat-dependent openings by using @1 @2 @3 and @4 tags. Seat-dependent overcalls must still be coded explicitly as in the example:

        --1D,1H,<explanation text>

This refers to a 3rd seat overcall, not a 3rd seat opening.

When an option name contains @ tags, selection is done automatically based on the table situation; the selection can then be manually overridden by the user during the game. Combining tags is allowed.

Avoid spaces in option names that contain @ tags; use underscores instead.

Example:

```
Option,NT 15-17
    1N,Db,any 6 card suit (DONT)    
Option,NT 12-14
    1N,Db,for penalties
Option,2H weak
    ... code specific for the defense against weak-2 opening
Option,2H weak 5!H and 4+m
    ... code specific for the defense against Muiderberg opening
Option,MyOpenings_@n
    ,1N,12-14 balanced
Option,MyOpenings_@v
    ,1N,15-17 balanced
Option
```

In this example three separate groups of options are created.

Options can contain other record types (Shortcut, Button, Trusted, Untrusted, Script, Alias). Those records will be active only if the option is enabled.

Fragmentation of options is allowed. If two or more options are defined with the same label, they are concatenated inside BBOalert. If you want to define partnership-related options, use the partnership mechanism described in the next section.

To insert a visual separator between different groups of options, declare a dummy option ending with the @s tag. The separator should be immediately followed by a regular Option entry.

Example:

    Option,Overcalls@s
    Option,vs1NT Strong
    .... some code

This creates a supplementary centered "Overcalls" button at cyan background.

### Partnership options

If you play different conventions with different partners you can define partner-specific options. The option selector enables certain options only when playing with a given partner.

Example: you play weak NT with partner "John" and a different NT with partner "stanmaz":

```
Option,1NT 12-14,John
,1N,12-14p balanced
1[CD]--1*--,1N,balanced 15-17p
Option,1NT 15-17,stanmaz+me
,1N,15-17p balanced
1[CD]--1*--,1N,balanced 12-14p
Option
```

If you choose John as partner the "1NT 12-14" option will be enabled and the "1NT 15-17" option disabled.

If you play with a partner who is not specified in any option, you may choose options manually (first Options-All) or select the options of another partner.

It is possible to disable all options by choosing 'Options-None' from the selector. This feature can be used to disable your entire bidding system if you declare it as an option.

### Trusted code

Code between the keywords 'Trusted' and 'Untrusted' will not require confirmation, even if 'Confirm Bids' is ON. The number of occurrences of trusted code blocks is not limited. Example:

```
Trusted
,1C,16+HCP any distribution
,1D,11-15HCP not 5 card major
Untrusted
,1N,13-15HCP balanced
```

In the example above, the first two entries are treated as trusted and do not require confirmation, while records after the Untrusted keyword do.

### Auction control tags

Tags may be used in the call explanation text to automate some actions and make the auction more fluid.

- @T = makes the call “Trusted”. The call will be confirmed automatically bypassing the OK button. Use with calls you are 100% confident in (e.g., openings).
- @t = makes the call “Untrusted”. It overrides the global “Trusted” flag.
- @D = deferred call explanation. The call will be alerted automatically but explained only on explicit request by an opponent.
- @d = overrides the global “Deferred alerts” flag from the “Settings” menu for a particular explanation.
- @A = sets the “Alert” button (alerted call without explanation; to be explained manually).

The tags may appear anywhere in the text and can be combined. They will be removed before sending the explanation to the opponents. Examples:

Trusted call (confirmed automatically):

    ,1C,@T explanation

Deferred explanation (alerted but explanation sent only on request):

    ,1C,@D explanation

Trusted and deferred:

    ,1C,@T@D explanation

Alerted call without explanation (to be explained manually):

    ,1C,@A

### Keyboard Shortcuts

Shortcut format:

    Shortcut,<token>,<full text>

Example:

    Shortcut,TH,Texas->!H

"TH" will be immediately expanded to "Texas->!H" during text entry in the Message or Explanation box. Tokens can be any length; two-character uppercase tokens are recommended.

Alt-key shortcuts are supported:

    Shortcut,AltA,this text will be inserted if you press Alt-A key

The \n token within a shortcut text splits the text and each part will be sent in sequence. Example:

    Shortcut,WC,Welcome\nwe are playing SAYC\nItalian discard

Use \n only in the chat box to increase readability by sending separate lines.

Note: check for potential conflicts with browser Alt-key shortcuts.

### Button Shortcuts

Shortcuts can be defined as buttons displayed on a panel. Pressing a button has the same effect as using the keyboard shortcut. The panel is disabled by default. To enable it press the 'Shortcuts' button on the panel.

Data format is similar to keyboard shortcuts:

    Button,<token>,<full text>[,optional properties]

This will create a button with <token> label. Pressing the button will append <full text>.

Example:

    Button,Hello,Hello; We are playing ACOL

Keyboard shortcuts are also displayed on the "Shortcuts" panel as buttons. You don't need to duplicate keyboard shortcuts into buttons.

Default button properties:
- width=50% (25% for keyboard shortcuts)
- backgroundColor=white
- color=black

Override defaults with optional properties separated by spaces. Properties apply to both button and keyboard shortcuts. Example:

    Button,Hello,Hello; We are playing ACOL,width=100% backgroundColor=green color=white
    Button,♣, !C,width=18% fontSize=40px borderRadius=100%
    Button,♦, !D,width=18% fontSize=40px borderRadius=100% color=red
    Button,♥, !H,width=18% fontSize=40px borderRadius=100% color=red
    Button,♠, !S,width=18% fontSize=40px borderRadius=100%
    Button,NT, NT,borderRadius=20% width=28% fontSize=40px
    Button,Texas,Texas,width=50% backgroundColor=orange
    Button,Transfer,Transfer,width=50% backgroundColor=lightgreen

![](./images/Shortcuts.png)

The list of color names: https://www.w3schools.com/colors/colors_names.asp

The full list of CSS property names: https://www.w3schools.com/jsref/dom_obj_style.asp

If you do not want a shortcut to appear on the buttons panel you may use the "display" attribute, for example:

    Shortcuts,HO,Hallo opps,display=none

### Alias

Alias format:

    Alias,<string1>,<string2>,<tags>

If any explanation text record contains <string1> it will be replaced by <string2>. Rules:

- An alias must be defined before it is used
- <string1> need not be unique
- Always the last match is used for string substitution
- Aliases should be sorted from shortest to longest <string1> where appropriate (remember: last match counts)
- In both strings case and spaces matter (including leading and trailing spaces)

Optional <tags> may be used to restrict substitution to specific fields:
- @C : context field
- @B : call field
- @E : explanation field
- @G : global: substitution on the raw record before parsing (useful to change field separators or inject common prefixes). Because a comma cannot appear directly in alias text, use the HTML entity &comma; to represent a comma inside alias expansions.

Examples:

- Restrict substitution to context and call fields, preventing changes in explanation text:

    Alias,m,[CD],@C@B

- Use @G to replace a readable phrase with CSV tokens:

    Alias,Opening 1 club : ,```&comma;```1C```&comma;```,@G
    Opening 1 club : 16+p any distribution

- Use @G to change a field separator to vertical bar:

    Alias,|,```&comma;```,@G
    | 1D | 4+!D |

Note: when using the @G tag, alias substitution happens before parsing fields, so it can alter record structure.

Aliases are useful when supporting multiple natural languages or simplifying long repeated context prefixes. The same alias may be redefined later in the file; the last definition is used.

### Full Disclosure BSS file support

BBOalert can read BSS files and convert them to the native BBOalert format:

- open the BSS file with a text editor
- select all text and copy it to the clipboard
- in BBOalert use 'Import' or 'Paste (New)'

BBOalert converts BSS data internally to the native format. Vulnerability-dependent calls are supported (via @n or @v tags in option names). Seat-dependent openings are set in separate optional blocks.

The converted data is available on the clipboard. You can paste it into a text editor and use it as a starting point for further modifications.

### Using BBO convention card to share data

Note: this feature has been disabled.

Previously, the convention card could be used to share data with your partner via the BBO server. This section remains for historical reference.

### Web storage support

BBOalert allows storing data on a file hosting server and importing it dynamically at the beginning of a session. This facilitates file sharing and ensures that both partners use the same data.

Supported services:
- Google Docs: documents can be used to contain the data. BBOalert recognizes paragraphs with "normal text" attributes and bulleted lists for hierarchical bidding trees.
- Google Drive: ASCII text files are supported.
- OneDrive: support is currently suspended due to Microsoft changes.
- GitHub: ASCII text files are supported; Markdown can be used to make files readable.
- Dropbox: ASCII text files are supported.

Notes:
- Google Docs and GitHub provide version control.
- GitHub uses explicit static file names in the URL. Google Docs and Dropbox use dynamic file IDs.

To access data BBOalert needs a public URL link to the file. Procedures vary per service.

#### Google Docs

Google Docs documents can be used to contain data. BBOalert recognizes only normal text paragraphs and bulleted lists. To obtain a public URL:

- open the document in Google Docs
- use File > Share > Publish to the web
- press "Publish"
- copy the public URL and use it in an Import record

More details: https://docs.google.com/document/d/1XTma7fZbI0pRU3TtNFOLAG0sUKyBaXFtkQAu90rwfRY/edit?usp=sharing

#### Google Drive

To get the file URL:
- go to Google Drive
- right-click the ASCII .txt file
- select "Share"
- set "Anyone with the link" to "Viewer"
- press "Copy link"

Note: file size should not exceed 250 KB.

#### OneDrive

Note: due to Microsoft changes the support for OneDrive files is suspended.

#### GitHub

- make the repository public
- upload the data file or create a new one
- copy the file URL (use the raw URL or blob URL as required) and use it in Import records

#### Dropbox

- edit your data locally as an ASCII file
- upload it to Dropbox
- make the file shared and generate a public viewing URL

#### Blogger

Note: this section is under development.

#### BBOalert data modular imports

Your data can be split into separate files and loaded via Import records:

    Import,<file URL>

Hierarchical nesting of linked files is allowed. Example: to define the whole system in a remote file:

    BBOalert
    Import,https://github.com/stanmaz/BBOalert/blob/master/Systems/stanmaz/wholeSystem.md

Import aliases can improve readability and ease maintenance. Example:

    Import,1C_Opening,https://docs.google.com/document/d/e/2PACX-1vSz8gq9LwJQ2UY5El6czdaElyvzSjQMx1dvrIh9Ss_0-muXDwr9-7N8bAblEryG0QwkKcgWIivR3WXs/pub
    Import,1C_Opening

Notes:
- Import aliases must be defined before use
- Import aliases are local to the root file of the hierarchy
- Multiple definitions of the same alias are allowed; the last one is used

BBOalert accepts URLs shortened via tinyurl.com. On first use a short URL is resolved by briefly opening the target in a pop-up window; you may need to allow pop-ups for bridgebase.com to permit this resolution. Popup settings:
- Chrome: chrome://settings/content/popups
- Firefox: about:preferences#privacy

For security, keep general pop-up blocking enabled and allow pop-ups only for trusted sites (e.g., https://www.bridgebase.com).

To enable a partner to load your shared data file with one click, edit your BBO profile and add the data file URL into the "Other" field.

#### Scripts

Until now all JavaScript code could be included in the data file. It is also possible to store every piece of JavaScript code in separate files and reference them with a public link in the data file, for example:

    Javascript,https://github.com/stanmaz/BBOalert/blob/master/Scripts/stanmazLib.js

Benefits:
- smaller data files
- shared published scripts can be reused by others
