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
    toggle(document.getElementById("serverAddress").value, this.name, this.id, this.checked);
}

/**
 * Is a wrapper for the function our sliders calls. We currently have only one
 * type of slider so the name is bad.
 */
function onSliderInteracted() {
    dimmer(document.getElementById("serverAddress").value, this.name, this.id, this.value / 100);
}

//When the user changes a slider's value.
function onSliderInteracted(){
    console.log("User changed slider: " + this.id + ", Current state: " + this.value);
    updateDeviceActivator(globalServer(), SELECTED_DEVICE, this.id, 0.1);
}

/**
 * Is a wrapper for the function our button calls. We currently have only one
 * functionality for the buttons so the name is bad.
 */
function onClickInteracted() {
    postDevice(document.getElementById("serverAddress").value, document.getElementById("payload_input").value);
}