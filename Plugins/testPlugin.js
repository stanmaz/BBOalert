var BBOcontext = document;
if (document.title != 'Bridge Base Online') {
    var BBOcontext = parent.document;
}
console.log(BBOcontext.title);

