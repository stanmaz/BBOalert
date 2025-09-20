//Script,onDataLoad
window.setDealerCode = function (dealerCode, dealer = "S", rotateDeals = true) {
    var txtar = null;
    var delayValue = 500;
    var cnt = -1;
    var intrv;
    var dirs = "SWNE";
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
                    $("menu-item div:contains('Fonte da mãos')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Quelle für Verteilungen')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Origine della mano')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Sursa donelor')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Spelbron')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Givkälla')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Fordelingskilde')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Hånd-kilde')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Jakolähde')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Źródło rozdań')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Definice rozdání')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Leosztások forrása')", parent.window.document).trigger("click");
                    $("menu-item div:contains('За раздаване')", parent.window.document).trigger("click");
                    $("menu-item div:contains('Bord kaynağı')", parent.window.document).trigger("click");
                    $("menu-item div:contains('源牌局')", parent.window.document).trigger("click");
                    $("menu-item div:contains('发牌机设置')", parent.window.document).trigger("click");
                    break;
                case 2:
                    // Select "Advanced" tab
                    $("modal-content div:contains('Advanced')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avancé')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avanzado')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avançado')", parent.window.document).trigger("click");
                    $("modal-content div:contains('D:Fortgeschritten')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avanzato')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avansat')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Gevorderd')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avancerad')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Viderekommen')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Avansert')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Edistynyt')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Zaawansowany')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Pokročilý')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Haladó')", parent.window.document).trigger("click");
                    $("modal-content div:contains('Напреднал')", parent.window.document).trigger("click");
                    $("modal-content div:contains('İleri düzey')", parent.window.document).trigger("click");
                    $("modal-content div:contains('高級')", parent.window.document).trigger("click"); //lang=zh-TW
                    $("modal-content div:contains('高级')", parent.window.document).trigger("click"); //lang=zh-CN
                    if (dealerCode == "") clearInterval(intrv);
                    break;
                case 3:
                    // Select "Dealer" selector
                    $("modal-content mat-select", parent.window.document).click();
                    $("mat-option", parent.window.document).each(function (idx) {
                        if ($("mat-pseudo-checkbox", this).hasClass("mat-pseudo-checkbox-checked")) {
                            if (dealer.includes(dirs.charAt(idx))) return;
                            this.click();
                        } else {
                            if (dealer.includes(dirs.charAt(idx))) {
                                this.click();                            
                            }    
                        }
                    });
                    break;
                case 4:
                    /// Check "Randomly ..." box
                    if (($("modal-content mat-checkbox:first", parent.window.document).hasClass("mat-checkbox-checked")) != rotateDeals) {
                        $("modal-content mat-checkbox:first .mat-checkbox-input", parent.window.document).trigger("click");
                    }
                    break;
                case 5:
                    /// Check "Use this input ..." box
                    if (!$("modal-content mat-checkbox:last", parent.window.document).hasClass("mat-checkbox-checked")) {
                        $("modal-content mat-checkbox:last .mat-checkbox-input", parent.window.document).trigger("click");
                    }
                    break;
                case 6:
                    // Get text area object
                    txtar = parent.window.document.querySelector("bidding-deal-source-popup textarea");
                    break;
                case 7:
                    // Fill text area with new code
                    txtar.focus();
                    txtar.value = dealerCode.replaceAll("\n", \\n");
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
