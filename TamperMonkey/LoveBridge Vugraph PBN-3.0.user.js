// ==UserScript==
// @name         LoveBridge Vugraph PBN
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Dumps PBN by scraping visible page elements on LoveBridge
// @author       Gemini
// @match        https://vugraph.lovebridge.com/screen/*
// @match        https://vugraph.lovebridge.com/error/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    function downloadTextAsFile(text, fileName) {
	var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
	// 1. Create a Blob URL
	var url = URL.createObjectURL(blob);

	// 2. Create a link element
	var a = document.createElement('a');

	// 3. Set attributes
	a.href = url;
	a.download = fileName;
	a.style.display = 'none'; // Hide the link

	// Append to body (necessary for a.click() to work in some browsers)
	document.body.appendChild(a);

	// 4. Trigger click
	a.click();

	// 5. Clean up - Remove the element and revoke the URL
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
    }
    var PBNlog = "";

    if (window.location.href.endsWith("new")) {
        console.log("PBN clear");
        localStorage.setItem("lovebridgePBN", "");
        var win = open(window.location.href.replace("new", "add"));
        console.log("Open " + win.location.href);
    } else if (window.location.href.endsWith("add")) {
        var tmr = setInterval(function() {
            try {
                var event = document.body.querySelector(".screen--main-event").textContent;
                var round = $("a.btn-page-selected.round-btn").text();
                if (round != "") event = event + " /Round=" + round;
                console.log("event = " + event);
                if ($("span:contains('Board:')").length == 0) throw new Error("");
                var boardNr = $("span:contains('Board:')").next().text();
                if ($("span:contains('Dealer:')").length == 0) throw new Error("");
                var dealer = $("span:contains('Dealer:')").next().text().charAt(0);
                if ($("span:contains('Vulnerable:')").length == 0) throw new Error("");
                var vulnerable = $("span:contains('Vulnerable:')").next().text().replaceAll("-", "");
                if (vulnerable == "NONE") vulnerable = "None";
                if (vulnerable == "ALL") vulnerable = "All";
                var deal = $(".frequency-card:eq(1)").find(".frequency-block-text").get(0).textContent + "." +
                           $(".frequency-card:eq(1)").find(".frequency-block-text").get(1).textContent + "." +
                           $(".frequency-card:eq(1)").find(".frequency-block-text").get(2).textContent + "." +
                           $(".frequency-card:eq(1)").find(".frequency-block-text").get(3).textContent + " " +
                           $(".frequency-card:eq(3)").find(".frequency-block-text").get(0).textContent + "." +
                           $(".frequency-card:eq(3)").find(".frequency-block-text").get(1).textContent + "." +
                           $(".frequency-card:eq(3)").find(".frequency-block-text").get(2).textContent + "." +
                           $(".frequency-card:eq(3)").find(".frequency-block-text").get(3).textContent + " " +
                           $(".frequency-card:eq(5)").find(".frequency-block-text").get(0).textContent + "." +
                           $(".frequency-card:eq(5)").find(".frequency-block-text").get(1).textContent + "." +
                           $(".frequency-card:eq(5)").find(".frequency-block-text").get(2).textContent + "." +
                           $(".frequency-card:eq(5)").find(".frequency-block-text").get(3).textContent + " " +
                           $(".frequency-card:eq(2)").find(".frequency-block-text").get(0).textContent + "." +
                           $(".frequency-card:eq(2)").find(".frequency-block-text").get(1).textContent + "." +
                           $(".frequency-card:eq(2)").find(".frequency-block-text").get(2).textContent + "." +
                           $(".frequency-card:eq(2)").find(".frequency-block-text").get(3).textContent;
                console.log("boardNr = " + boardNr);
                console.log("dealer = " + dealer);
                console.log("vulnerable = " + vulnerable);
                console.log("deal = " + deal);
                clearInterval(tmr);
                console.log("PBN add");
                PBNlog = localStorage.getItem("lovebridgePBN");
                PBNlog = PBNlog + `
[Event "${event}"]
[Board "${boardNr}"]
[Dealer "${dealer}"]
[Vulnerable "${vulnerable}"]
[Deal "N:${deal}"]
        `;
                localStorage.setItem("lovebridgePBN", PBNlog);
                var board = 1000;
                var urlarr = window.location.href.split("&");
                urlarr.forEach((element) => {
                    console.log(element);
                    if (element.startsWith("board")) {
                        board = parseInt(element.split("=")[1]);
                        console.log("actual " + board);
                    }
                });
                board++;
                console.log("next = " + window.location.href.replace("board="+(board-1).toString(), "board="+board.toString()));
                open(window.location.href.replace("board="+(board-1).toString(), "board="+board.toString()));
              window.close();
            } catch {}
        }, 100)

    } else if (window.location.href.includes("error")) {
        console.log("PBN save");
        PBNlog = localStorage.getItem("lovebridgePBN");
        downloadTextAsFile(PBNlog, "lovebridge.pbn")
        window.close();
    }
})();