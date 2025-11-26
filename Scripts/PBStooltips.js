//Script,onDataLoad
$("#BBOalertTooltipStyle").remove();
$(document.head).append(`<style id="BBOalertTooltipStyle">
            div.ui-tooltip {
                max-width: fit-content;
            }
            .bboalert {
                background-color: yellow;
            }
            .bboalert::first-line {
                font-weight: bold;
                text-decoration: underline; 
</style>.`);

$(document).tooltip({
    content: function () {
        return $(this).prop('title').replaceAll('\n', '<br />').replaceAll('\\n', '<br />');
    },
    classes: {
        "ui-tooltip": "bboalert"
    }
});

$("#adpanel2 button").each(function () {
    if ($(this).val() == "undefined") return;
    txt = $(this).val().split("%")[0].replace("\\n--- ", "");
    $(this).prop("title", txt);
});
//Script
