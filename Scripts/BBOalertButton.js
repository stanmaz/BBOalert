//BBOalert,Replace BBOalert tab by a button Version 1.0
//Script,onDataLoad
$("#bboalert-button",parent.window.document).remove();
$('.connectionClass',parent.window.document).parent().append(`<div id="bboalert-button" style="height: 46px; width: 46px;">
<svg viewBox="0 0 170 170">
<rect style="fill:#0000ff;stroke-width:1.00145" id="rect156" width="170.91365" height="126.75913" x="-0.010153236" y="43.907539"></rect>
<text xml:space="preserve" style="font-style:normal;font-weight:bold;font-size:40px;line-height:1.25;font-family:sans-serif;fill:#ffffff;fill-opacity:1;stroke:none" x="41.885265" y="93.965851" id="text4208"><tspan id="tspan4206" x="41.885265" y="93.965851">BBO</tspan></text>
<text xml:space="preserve" style="font-style:normal;font-weight:bold;font-size:40px;line-height:1.25;font-family:sans-serif;fill:#ffffff;fill-opacity:1;stroke:none" x="37.915173" y="134.05565" id="text11098"><tspan id="tspan11096" x="37.915173" y="134.05565">Alert</tspan></text>
<rect style="fill:#0000ff;stroke-width:1.21547" id="rect30888" width="85.957748" height="20.775459" x="84.932518" y="23.367001"></rect>
<text xml:space="preserve" style="font-style:normal;font-weight:normal;font-size:16px;line-height:1.25;font-family:sans-serif;fill:#ffffff;fill-opacity:1;stroke:none" x="106.48234" y="40.3759" id="text42194"><tspan id="tspan42192" x="106.48234" y="40.3759" style="font-size:16px">Alert</tspan></text>
<rect style="fill:#ff0000;stroke-width:1.42699" id="rect62412" width="84.908524" height="20.849609" x="0.023992665" y="23.292852"></rect>
<text xml:space="preserve" style="font-style:normal;font-weight:normal;font-size:16px;line-height:1.25;font-family:sans-serif;fill:#ffffff;fill-opacity:1;stroke:none" x="27.264788" y="38.091408" id="text65176"><tspan id="tspan65174" x="27.264788" y="38.091408">Stop</tspan></text>
<rect style="fill:#008000" id="rect121122" width="74.317535" height="24.015348" x="48.270805" y="-0.2446395"></rect>
<text xml:space="preserve" style="font-size:16px;line-height:1.25;font-family:sans-serif;fill:#ffffff" x="66.822769" y="18.84252" id="text141696"><tspan id="tspan141694" x="66.822769" y="18.84252">Pass</tspan></text>
<rect style="fill:#ff0000" id="rect148238" width="48.301918" height="23.611641" x="122.58834" y="-0.2446395"></rect>
<rect style="fill:#0000ff;stroke-width:1.01631" id="rect148262" width="48.321392" height="24.015348" x="-0.050585855" y="-0.2446395"></rect>
<text xml:space="preserve" style="font-size:16px;line-height:1.25;font-family:sans-serif;fill:#ffffff" x="141.21513" y="15.970279" id="text153080"><tspan id="tspan153078" x="141.21513" y="15.970279">X</tspan></text>
<text xml:space="preserve" style="font-size:16px;line-height:1.25;font-family:sans-serif;fill:#ffffff" x="16.923542" y="16.994904" id="text157330"><tspan id="tspan157328" x="16.923542" y="16.994904">XX</tspan></text>
</svg>
</div>`
);
$("#bboalert-button",parent.window.document).click(toggleOptions);
$("#bboalert-tab",parent.window.document).hide();
//Script
