window.BBOcontext = document;
if (document.title != 'Bridge Base Online') {
    window.BBOcontext = parent.document;
}
console.log(BBOcontext.title);
