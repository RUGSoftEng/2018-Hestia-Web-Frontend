/**
 * @fileOverview
 * @name domInteraction.js
 * This file contains functions to interact with the webpage to dynamically load devices.
 */

var SELECTED_DEVICE = null;

/**
 * Removes all children from a node. Used in the gui.
 * @param {} node
 */
function removeChildren(node) {
    if (node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}

/**
 * Finds a device by its id in an array. Returns null if it is not found.
 * @param {} id
 * @param {} array
 * @returns {} json object
 */
function getDeviceById(id, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].deviceId == id) {
            return array[i];
        }
    }
    return null;
}

/**
 * Wrapper to update the re-populated the device list based on a promised json
 * object from the server.
 */
function updateDeviceList() {
    var devices = getServerDevices(document.getElementById("serverAddress").value);
    devices.then(result => {
            populateDevices(result);
        })
        .catch(err => {
            console.log(err);
        });
}

/**
 * Generates the html to view all of the devices in data.
 * @param {} data
 */
function populateDevices(data){
    LAST_DATA_RECEIVED = data;
    console.log("Populating devices:");
    console.log(data);
    var namesListElem = document.getElementById("deviceNamesList");
    removeChildren(namesListElem);

    //Insert placeholder in temporary payload input to add devices
    var inputPlaceholder = '{\n "plugin_name": "light",\n "collection": "mock",\n "required_info": {\n   "ip": "123",\n   "port": "456",\n   "name": "not_a_kitchen_light"\n  }\n}';
    document.getElementById("payload_input").value = inputPlaceholder;

    data.forEach(function(device) {
        var elem = document.createElement("li");
        elem.className = "device_row";
        elem.id = device.deviceId;
        elem.onclick = function() {
            var children = namesListElem.children;
            for (var i = 0; i < children.length; i++) {
                children[i].className = "device_row";
            }
            elem.className = "device_row active";

            var dev = getDeviceById(elem.id, data);
            SELECTED_DEVICE = dev.deviceId;

            viewDeviceActivators(dev.name, dev.deviceId, dev.activators);
        };

        elem.appendChild(document.createTextNode(device.name));
        namesListElem.appendChild(elem);
    });

    namesListElem.firstChild.click();
    SELECTED_DEVICE = namesListElem.firstChild.id;
}

/**
 * Generates the html to view a device with a particular deviceName and for its
 * associated activators. deviceId is passed so that we may interact with the
 * activators and know their device. This will be refactored.
 * @param {} deviceName
 * @param {} deviceId
 * @param {} activators
 */
function viewDeviceActivators(deviceName, deviceId, activators) {
    var activatorsElem = document.getElementById("activatorsList");
    var activatorsTitle = document.getElementById("activatorsTitle");
    activatorsTitle.firstChild.innerHTML = deviceName;
    removeChildren(activatorsElem);
    for (var i = 0; i < activators.length; i++) {
        var activator = activators[i];
        var elem = document.createElement("div");
        elem.className = "device_control_row";
        elem.appendChild(document.createTextNode(activator.name));
        switch (activator.type) {
            case "bool":
                var label = document.createElement("label");
                label.className = "switch";
                var input = document.createElement("input");
                input.type = "checkbox";
                input.name = deviceId;
                input.onclick = onToggleInteracted;
                input.id = activator.activatorId;
                input.checked = activator.state;
                label.appendChild(input);
                var span = document.createElement("span");
                span.className = "switchSlider round";
                label.append(span);
                elem.appendChild(label);
                break;
            case "float":
                var slideContainer = document.createElement("div");
                slideContainer.className = "slidecontainer";
                var input = document.createElement("input");
                input.type = "range";
                input.min = 0;
                input.max = 100;
                input.step = 10;
                input.name = deviceId;
                input.value = activator.state * 100; // TODO Based on object
                input.className = "slider";
                input.id = activator.activatorId;
                input.onchange = onSliderInteracted;
                slideContainer.appendChild(input);
                elem.appendChild(slideContainer);
                break;
            default:
                console.log("Unknown activator type: " + activator.type);
        }
        activatorsElem.appendChild(elem);
    }
}