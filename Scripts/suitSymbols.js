function onOpen() {
  var ui = DocumentApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Custom Menu')
      .addItem('Letters->Symbols', 'menuItem1')
      .addItem('Symbols->Letters', 'menuItem2')
      .addToUi();
}

function menuItem1() {
  suitSymbols();
}

function menuItem2() {
  suitCharacters();
}

function suitSymbols() {
  var body = DocumentApp.getActiveDocument().getBody();
  
  replaceStringAndSetColor(body, "!C", "♣", "#00a000", 13);
  replaceStringAndSetColor(body, "!D", "♦", "#ffa500", 13);
  replaceStringAndSetColor(body, "!H", "♥", "#ff0000", 13);
  replaceStringAndSetColor(body, "!S", "♠", "#0000ff", 13);
}

function suitCharacters() {
  var body = DocumentApp.getActiveDocument().getBody();
  
  replaceStringAndSetColor(body, "♣", "!C", "#000000", 10);
  replaceStringAndSetColor(body, "♦", "!D", "#000000", 10);
  replaceStringAndSetColor(body, "♥", "!H", "#000000", 10);
  replaceStringAndSetColor(body, "♠", "!S", "#000000", 10);
}

function replaceStringAndSetColor(body, str, replacement, color, fontsize) {
    var foundElement = body.findText(str);
    while (foundElement != null) {
      var foundText = foundElement.getElement().asText();
      var start = foundElement.getStartOffset();
      var end = foundElement.getEndOffsetInclusive();
      foundText.setForegroundColor(start, end, color);
      foundText.setFontSize(start, end, fontsize);
      foundElement = body.findText(str, foundElement);
    }
    body.replaceText(str, replacement);
}
