# BBOalert

Automatic alert in Bridge Base Online service (www.bridgebase.com)

The software is still under development (Alpha release). 

We assume that you are familiar with BBO and CHROME.

## Purpose

During the bidding, conventional calls must be alerted and explained to the opponents. Playing artificial bidding systems on BBO is not practical because explaining each alerted call is time consuming and therefore frustrating for all participants.

BBOalert resolves this problem. Artificial bidding sequences can be predefined in a table. Opponents get the explanation automatically and immediately. Explanations entered manually during the game are recorded for future use.

## Installation

To install BBOalert manually in CHROME browser:
- download BBOalert project source files in a ZIP-container ("Clone or Download" button, then "Download ZIP")
- Navigate to the "Downloads" directory, open the ZIP-container and expand it. This will create a subdirectory "BBOalert-master" containing project's source files.
- open Chrome browser session with URL "chrome://extensions"
- make sure the Developer Mode is switched ON (in right-upper corner)
- click at "Load Unpacked" button and navigate to the "BBOalert-master" directory and confirm. BBOalert should appear on the list of installed extension create a bookmark with URL: "https://www.bridgebase.com/v3/?lang=en".

This software can be installed in Firefox browser directly :
- follow the link to https://addons.mozilla.org/addon/bboalert/.
- press "Add to Firefox" button
- accept the proposed default options

On Android devices, only Firefox browser supports extensions.

## Function

BBOalert communicates thru clipboard using CSV formatted text :
- at BBO startup, the clipboard must contain the table of alerted calls
- at the end of the BBO session, clipboard will contain the list of manually entered or modified alerts. You will be able to append this data at the end of the file.

The first line must begin with "BBOalert" keyword. Other lines should contain at least three text fields separated by commas:
  - bidding sequence preceding the alerted call including opponent's calls
  - your bidding call
  - explanation text

The calls should be coded using two-character keywords: 1C 1D 1H 1S 1N Db Rd --

The keyword -- is used for pass for better readability.
In the explanation field, comma must be avoided.
Each field may contain leading or trailing spaces or tabs for better readability during coding.
Fourth field is optional and may be used for comments

See 'sample.txt' file for more information.

## How to use

To use BBOalert you should :
- open the table file with your favorite text editor and keep it open until the end of the BBO session.
- select all text
- copy it to clipboard
- open BBO session using URL https://www.bridgebase.com/v3/?lang=en
- after you correctly login into BBO, the message should appear confirming that the table has been loaded from clipboard

If you alert manually during the game, the clipboard shall contain the text to be appended to the table file by pasting it. In the text editor, navigate to the end of the file, and do 'Paste', The records imported from BBO alert will contain a timestamp and the deal number. You can retrieve from BBO the deals to review the alerted calls before commiting the changes.

Instead of a simple text editor, I recommend to use Google Docs. This will enable you to :
- share the data with your partner in real time to be always in sync. Therefore you should make the document "Sharable" with write access for your partner. Do not forget to make a local backup copy.
- add supplementary text and using text processing features. BBOalert will ignore all irrelevant data while retrieving the data from the clipboard
- start eventually with the existing file describing your bidding system (I expect that you did it already). Then, you can insert  the BBOalert data anywhere in the text Remember : the file must begin with the "BBOalert" keyword.

