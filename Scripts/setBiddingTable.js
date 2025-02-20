//BBOalert Set Bidding Table 1.0
//Script,setBiddingTable
var delayValue = 500;
Promise.resolve()

// From Thorvald
    .then(() => {
         const homeButton = $("nav-bar button", BBOcontext()).eq(0);
			const isDisabled = homeButton.prop('disabled');

			if (isDisabled) {
				console.log("The home button is disabled.");
			} else {
				console.log("The home button is enabled.");
            homeFound = true;
				alert("You must be at the BBO Home page to start a table.")
            throw new Error("Go Home.");
			}
    })


    // Press "Practice" button
    .then(() => $(".menuGrid navigation-list-button .navClass", BBOcontext()).eq(4).click())
    .then(() => delay(delayValue))
    // press "Start a table"
    .then(() => $(".menuGrid navigation-list-button .navClass", BBOcontext()).eq(tableType).click())

    // press "Start a Teaching table"
    // .then(() => $(".menuGrid navigation-list-button .navClass", BBOcontext()).eq(13).click())

    // press "Start a Bidding table"
    .then(() => $(".menuGrid navigation-list-button .navClass:visible", BBOcontext()).eq(0).click())
    .then(() => delay(delayValue))
    // click table switches. Eventually remove unwanted portions of code.
    // Disallow kibitzers
    .then(() => $("table-options-panel .toggleDivClass ion-toggle", BBOcontext()).eq(0).click())
    .then(() => delay(delayValue))
    // Disallow kibitzers to chat with players
    .then(() => $("table-options-panel .toggleDivClass ion-toggle", BBOcontext()).eq(1).click())
    .then(() => delay(delayValue))
    // Set "Permission required to kibitz"
    .then(() => $("table-options-panel .toggleDivClass ion-toggle", BBOcontext()).eq(2).click())
    .then(() => delay(delayValue))
    // Set "Permission required to play"
    .then(() => $("table-options-panel .toggleDivClass ion-toggle", BBOcontext()).eq(3).click())
    .then(() => delay(delayValue))
    // Make the table "Invisible"
    .then(() => $("table-options-panel .toggleDivClass ion-toggle", BBOcontext()).eq(4).click())
    .then(() => delay(delayValue))
    // press "Start Table" button
    .then(() => $("start-table-screen .buttonRowClass button", BBOcontext()).eq(2).click())
    .then(() => delay(3000))
    // set your user ID in all four directions
    // "South"
    .then(() => $("bridge-screen .nameDisplayClass", BBOcontext()).eq(0).click())
    .then(() => delay(delayValue))
    .then(() => $("bridge-screen menu-item", BBOcontext()).eq(0).children().click())
    .then(() => delay(delayValue))
    // "West"
    .then(() => $("bridge-screen .nameDisplayClass", BBOcontext()).eq(1).click())
    .then(() => delay(delayValue))
    .then(() => $("bridge-screen menu-item", BBOcontext()).eq(0).children().click())
    .then(() => delay(delayValue))
    // "North"
    .then(() => $("bridge-screen .nameDisplayClass", BBOcontext()).eq(2).click())
    .then(() => delay(delayValue))
    .then(() => $("bridge-screen menu-item", BBOcontext()).eq(0).children().click())
    .then(() => delay(delayValue))
    // "East"
    .then(() => $("bridge-screen .nameDisplayClass", BBOcontext()).eq(3).click())
    .then(() => delay(delayValue))
    .then(() => $("bridge-screen menu-item", BBOcontext()).eq(0).children().click())

function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
//Script
Shortcut,SBT,%setBiddingTable%


