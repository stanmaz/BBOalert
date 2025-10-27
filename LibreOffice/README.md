# To encode BBOalert Data with LibreOffice Writer
- Make sure you use the **Flat XML ODF Text Document (.fodt)** ASCII format instead of the default **ODF Text Document (.odt)** binary format.
- Upload the file to the web storage site of your choice. Preferred are **GitHub** or **Dropbox**. **GoogleDrive** is not recommended because the `.fodt` files are relatively large and can easily exceed the limit of 250kb supported by BBOalert.
- Create the public URL for viewing and use this URL for importing data into BBOalert (see https://github.com/stanmaz/BBOalert/tree/master?tab=readme-ov-file#web-storage-support)

# Features supported by BBOalert
- Normal text paragraphs are used as they are.
- Unordered lists are used to define bidding sequences in a hierarchical way. The text line preceding the list defines the starting point of the bidding context.
- Tables: The first column is the bidding context, the second column is the call and third column is used for call explanation.
- Frames may be used to encompass the data for better readability.
- Comments may be used to insert hidden (not printed) code.
- BBO suit codes can be converted to colored suit symbols using the **ReplaceCardSuitCodes** macro. To revert to BBO suit codes, use the **ReplaceSuitSymbols** macro. To enable the macros, install the LibreOffice extension:
    - Download the file: https://github.com/stanmaz/BBOalert/blob/master/LibreOffice/BBOalert.oxt
    - Execute in LibreOffice the menu commands **Tools -> Extensions -> Add** and select the downloaded `BBOalert.oxt` file. Restart LibreOffice to enable the macros.

