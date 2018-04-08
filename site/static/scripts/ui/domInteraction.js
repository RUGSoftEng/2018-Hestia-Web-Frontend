/**
 * @fileOverview
 * @name domInteraction.js
 * This file contains functions to interact with the webpage to dynamically load devices.
 */

var SELECTED_DEVICE = null;
var SELECTED_SERVER = null;

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
 * Sets all children of a node to have a particular class.
 * @param {} node
 * @param {} className
 */
function setAllChildrenToClass(node, className) {
    var children = node.children;
    for (var i = 0; i < children.length; i++){
        children[i].className = className;
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
    var devices = getServerDevices(SELECTED_SERVER.address);
    devices.then(result => {
            console.log("Got devices from server: ");
            console.log(result);
            populateDevices(result);
        })
        .catch(err => {
            console.log(err);
        });
}

function updateServerList() {
    getUserServers(firebase, firebase.auth().currentUser).then(servers =>{
        populateServers(servers);
    });
}

//Updates the add device module by getting collections from the hestia server.
function updateAddDeviceModule() {
    getServerCollections(SELECTED_SERVER.address).then(collections => {
        console.log("Collections:");
        console.log(collections);
        populateServerCollectionsSelect(collections);
        updatePluginsSelect();
    });
}

//Updates the plugins selector after the collection has been selected.
function updatePluginsSelect(){
    var selectedCollection = document.getElementById("serverCollectionsSelect").value;
    getServerCollectionPlugins(SELECTED_SERVER.address, selectedCollection).then(plugins => {
        populatePluginsSelect(plugins);
        updateAddDeviceForm();
    });

}

//Refreshes the 'Add Device' input form after the plugin has been selected.
function updateAddDeviceForm(){
    console.log("Updating Add Device Form.");
    var selectedPlugin = document.getElementById("pluginsSelect").value;
    var selectedCollection = document.getElementById("serverCollectionsSelect").value;
    getPluginInfo(SELECTED_SERVER.address, selectedCollection, selectedPlugin).then(data => {
        ri = data.required_info;
        populateAddDeviceForm(ri);
    });
}

//Reads values from inputs and submits request for new device.
function submitNewDevice(){
    console.log("Adding new device");
    var selectedPlugin = document.getElementById("pluginsSelect").value;
    var selectedCollection = document.getElementById("serverCollectionsSelect").value;
    var form = document.getElementById("addDeviceForm");
    var inputs = form.getElementsByTagName("input");
    var payload = {
        "plugin_name": selectedPlugin,
        "collection": selectedCollection,
        "required_info": {}
    };
    //console.log(inputs);
    for (var i = 0; i < inputs.length; i++){
        if (inputs[i].type == "text"){
            payload["required_info"][inputs[i].id] = inputs[i].value;
        }
    }
    //console.log(payload);
    postDevice(SELECTED_SERVER.address, payload);
}

function populateAddDeviceForm(requiredInfo){
    var form = document.getElementById("addDeviceForm");
    console.log(form);
    removeChildren(form);
    for (var infoType in requiredInfo){
        var input = document.createElement("input");
        var label = document.createElement("label");
        input.type = "text";
        input.id = infoType;
        label.htmlFor = infoType;
        label.appendChild(document.createTextNode(infoType));
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
    }
    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Add";
    form.appendChild(submit);
}

function populatePluginsSelect(plugins){
    var pluginsSelect = document.getElementById("pluginsSelect");
    removeChildren(pluginsSelect);
    for (var i = 0; i < plugins.length; i++){
        var opt = document.createElement("option");
        var pName = plugins[i];
        opt.value = pName;
        opt.appendChild(document.createTextNode(pName));
        pluginsSelect.appendChild(opt);
    }
}

function populateServerCollectionsSelect(collections){
    var collectionsSelect = document.getElementById("serverCollectionsSelect");
    removeChildren(collectionsSelect);
    for (var i = 0; i < collections.length; i++){
        var opt = document.createElement("option");
        var cName = collections[i];
        opt.value = cName;
        opt.appendChild(document.createTextNode(cName));
        collectionsSelect.appendChild(opt);
    }
}

//Generates the html to view the list of servers.
function populateServers(servers){
    var serversListElem = document.getElementById("serverNamesList");
    removeChildren(serversListElem);

    for (var name in servers){
        var elem = document.createElement("li");
        elem.className = "device_row";
        elem.id = name;
        elem.onclick = function(){
            setAllChildrenToClass(serversListElem, "device_row");
            this.className = "device_row active";

            var server = servers[this.id];
            SELECTED_SERVER = server;
            SELECTED_DEVICE = null;

            updateDeviceList();
            updateAddDeviceModule();
        };
        elem.appendChild(document.createTextNode(name));
        serversListElem.appendChild(elem);
    }

    if (SELECTED_SERVER == null){
        if (serversListElem.firstChild != null){
            serversListElem.firstChild.click();
        }
    } else {
        document.getElementById(SELECTED_SERVER).click();
    }
}

/**
 * Generates the html to view all of the devices in data.
 * @param {} data
 */
function populateDevices(data){
    var namesListElem = document.getElementById("deviceNamesList");
    removeChildren(namesListElem);

    data.forEach(function(device) {
        var elem = document.createElement("li");
        elem.className = "device_row";
        elem.id = device.deviceId;
        elem.onclick = function() {
            setAllChildrenToClass(namesListElem, "device_row");
            elem.className = "device_row active";

            var dev = getDeviceById(elem.id, data);
            SELECTED_DEVICE = dev.deviceId;

            viewDeviceActivators(dev.name, dev.deviceId, dev.activators);
        };

        elem.appendChild(document.createTextNode(device.name));
        namesListElem.appendChild(elem);
    });

    if (SELECTED_DEVICE == null){
        if (namesListElem.firstChild != null){
            namesListElem.firstChild.click();
        }
    } else {
        document.getElementById(SELECTED_DEVICE).click();
    }
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
    //Sort the activators alphabetically.
    activators.sort(function(a, b){
    	var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
    	if (nameA < nameB) return -1;
    	if (nameA > nameB) return 1;
    	return 0;
    })
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