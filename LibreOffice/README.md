
# To encode BBOalert data with LibreOffice Writer

- Use the default ODF Text Document (.odt) (compressed/binary) or the Flat XML ODF Text Document (.fodt) (ASCII/uncompressed) format.
- Upload the document file to the web storage service of your choice. Recommended providers are **Dropbox** or **Github**. **Dropbox** is prefered because of automatic synchronisation between the local and the remote storage. **Google Drive** is not supported.
- Create a public URL for viewing and use that URL to import data into BBOalert (see https://github.com/stanmaz/BBOalert/tree/master?tab=readme-ov-file#web-storage-support).

# Features supported by BBOalert

- Normal text paragraphs are used as-is.
- Unordered lists define bidding sequences in a hierarchical way. The text line preceding a list defines the starting point of the bidding context.
- Tables: the first column is the bidding context, the second column is the call, and the third column is the call explanation.
- Frames can be used to group the data for better readability.
- Comments may be used to insert hidden (not printed) code.
- BBO suit codes can be converted to colored suit symbols using the `ReplaceCardSuitCodes` macro. To revert to BBO suit codes, use the `ReplaceSuitSymbols` macro. To enable the macros, install the extension:
  - Download the file: https://github.com/stanmaz/BBOalert/blob/master/LibreOffice/BBOalert.oxt
  - In LibreOffice choose Tools → Extensions → Add, select the downloaded `BBOalert.oxt` file, and restart LibreOffice.
  - If needed, enable macros in Tools → Options → LibreOffice → Security → Macro Security and set an appropriate security level.

Copy the link :

    https://github.com/stanmaz/BBOalert/blob/master/LibreOffice/LibreOfficeSampleData.odt
    
and execute the BBOalert command **Data/Paste (New)** to load the sample data file.


