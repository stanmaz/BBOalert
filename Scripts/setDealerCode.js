//Script,onDataLoad
window.setDealerCode = function (dealerCode, dealer = "S", rotateDeals = true) {
    var txtar = null;
    var delayValue = 500;
    var cnt = -1;
    var intrv;
    intrv = setInterval(() => {
        try {
            cnt++;
            switch (cnt) {
                case 0:
                    // Close dialog if already open
                    $("modal-content button", parent.window.document)[0].dispatchEvent(new Event("click"));
                    break;
                case 1:
                    // Open dialog
                    $("menu-item div:contains('Deal source')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Source de la donne')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Fuente de la mano')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Quelle für Verteilungen')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Origine della mano')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Spelbron')", parent.window.document).trigger("click");
                    break;
                case 2:
                    // Select "Advanced" tab
                    $("modal-content div:contains('Advanced')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avancé')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avanzado')", parent.window.document).trigger("click");
                    $("modal-content div:contains('D:Fortgeschritten')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avanzato')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Gevorderd')", parent.window.document).trigger("click");
                    break;
                case 3:
                    // Select "Dealer" selector
                    $("modal-content mat-select", parent.window.document).click();
                    $("mat-option", parent.window.document).each(function (idx) {
                        let s = dealer.includes(this.textContent.charAt(1));
                        if (s != $("mat-pseudo-checkbox", this).hasClass("mat-pseudo-checkbox-checked")) {
                            this.click();
                        }
                    });
                    break;
                case 4:
                    /// Check "Randomly ..." box
                    if (($("modal-content mat-checkbox:contains('Randomly ')", parent.window.document).hasClass("mat-checkbox-checked")) != rotateDeals) {
                        $("modal-content mat-checkbox:contains('Randomly ') .mat-checkbox-input", parent.window.document).trigger("click");
                    }
                    break;
                case 5:
                    /// Check "Use this input ..." box
                    if (!$("modal-content mat-checkbox:contains('Use ')", parent.window.document).hasClass("mat-checkbox-checked")) {
                        $("modal-content mat-checkbox:contains('Use ') .mat-checkbox-input", parent.window.document).trigger("click");
                    }
                    break;
                case 6:
                    // Get text area object
                    txtar = parent.window.document.querySelector("bidding-deal-source-popup textarea");
                    break;
                case 7:
                    // Fill text area with new code
                    txtar.focus();
                    txtar.value = dealerCode;
                    txtar.focus();
                    break;
                case 8:
                    txtar.dispatchEvent(new Event('input'));
                    break;
                case 9:
                    // Close dialog
                    $("modal-content button", parent.window.document)[0].dispatchEvent(new Event("click"));
                    clearInterval(intrv);
                    break;
                case 15:
                    // Prevent andless loop
                    clearInterval(intrv);
                    break;
            }
        } catch {
        }
    }, delayValue);
};
//Script
