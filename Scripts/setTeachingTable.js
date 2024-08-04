//BBOalert, Set Teaching Table v1.3.1
//Script,setTeachingTable
var delayValue = 500;
Promise.resolve()
    // press "Home" button
    .then(() => $("nav-bar button", BBOcontext()).eq(1).click())
    .then(() => delay(delayValue))
    // close dialog box if any
    .then(() => $("server-prompt button",window.parent.document).eq(0).click())
    .then(() => delay(delayValue))
    // Press "Practice" button
    .then(() => $(".menuGrid navigation-list-button .navClass", BBOcontext()).eq(4).click())
    .then(() => delay(delayValue))
    // press "Start a Teaching table"
    .then(() => $(".menuGrid navigation-list-button .navClass:visible", BBOcontext()).eq(1).click())
    .then(() => delay(delayValue*2))
    // click table switches. Eventually remove unwanted portions of code.
    .then(() => $("table-options-panel .optionGrid ion-toggle", BBOcontext()).click())
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
/*
    // set your user ID in all four directions
    // "South"
    //    .then(() => $(".nameBarClass :contains(South - Sit!)", BBOcontext()).eq(0).click()).then(() => delay(delayValue))
 //   .then(() => $("bridge-screen menu-item", BBOcontext()).eq(0).children().click()).then(() => delay(delayValue))

Shortcut,STT,%setTeachingTable%
*/
