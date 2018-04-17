/**
 * @fileOverview
 * @name eventHandler.js
 * The file contains functions which are called when user interface events take place.
 * It depends on functions provided by serverComms.js to send and receive data.
 */

/**
 * Is a wrapper for the function our toggles calls. We currently have only one
 * type of toggle so the name is bad.
 */
function onToggleInteracted() {
    toggle(SELECTED_SERVER.address, this.name, this.id, this.checked);
}

/**
 * Is a wrapper for the function our sliders calls. We currently have only one
 * type of slider so the name is bad.
 */
function onSliderInteracted() {
    dimmer(SELECTED_SERVER.address, this.name, this.id, this.value / 100);
}

/**
 * Is a wrapper for the function our button calls. We currently have only one
 * functionality for the buttons so the name is bad.
 */
function onClickInteracted() {
    postDevice(SELECTED_SERVER.address, document.getElementById("payload_input").value);
}