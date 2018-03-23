<center>
	<!-- Title image and text. -->
	<img src="images/hestiaLogo.png"/>
	<h1>Hestia Web Development Architecture Document</h1>
	<span style="font-style: italic; color: #b34700">Version 1.0</span>
</center>

### Clients
- F. te Nijenhuis
- L. Holdijk

### Authors
* A. Lalis
* T.K. Harrison
* R.T. Nijman
* P. Oetinger
* N. Dijkema
* E. Abdo
* R. Bell
* S. Oegema

### Teaching Assistant
Feiko Ritsema

## Introduction
The *Hestia* Home Automation System, developed by the clients, aims to make home automation simple again. The local server infrastructure that facilitates communication and control of the various peripherals in one's home has been implemented by the clients. In addition to this local server, an Android application has been pre-made by the client and is available for reference. As it stands users of Hestia are unable to access their home servers outside of their local network. This coupled with the lacking client side interfacing, limits ease of use and widespread adoption.

To improve on this, there are two main systems under consideration: the front-end (user interface with which the client interacts), and the back-end (which serves as a middleman between local Hestia servers and their users).

This document describes the functioning of these systems, their interaction, and motivates their underlying design choices.

### Overview
Our goal for this project is to create the web interface. This web interface, which is hosted on a central server, should allow users to log in and connect their local Hestia servers. This allows users to interact with their home automation system remotely.

A Hestia server is a *controller* that manages a set of *peripherals*. Those peripherals are the facilities to be automated. These could for instance be lights, locks, or any mumber of programmable devices. This is possible because Hestia is designed to be peripheral independent via a plugin infrastructure.

The clients have created this system using the REST API. This decouples our work from the underlying infrastructure of Hestia.

## General Overview of the System
The Hestia Web Interface can be divided into two main sub-systems as mentioned in the Introduction.
* Front-end user interface, with which the user interacts
* Back-end server that connects users to their local Hestia controllers and holds user and server information

## Website Front-End
Since the frontend of the website is the first aspect of the product that the customer will interact with, and will be one of the main sources of content or discontent throughout their user experience, a variety of design choices have to be made. 

The website will allow a user to log into their home server through a web server, and then manage the devices on their home server through a range of different controls, and do this in the knowledge that themselves and their information are being kept safe.

![Website Design](images/Hestia_login_concept.png  "Website Login Concept")

![Website Design](images/Hestia_dash_concept.png  "Website Dash Concept")

![Website Design](images/Hestia_control_concept.png  "Website Control Concept")

### Design choices
We decided that the user should decide which controller they are connecting to upon login, which prevents the added complexity caused by switching between controllers (note that this functionality could be added down the line). Thus, the main focus of the website will be on listing the devices managed by the controller, and on the operations that can be applied on them. These will mirror those already implemented by Hestia, such as renaming or deleting a device, but with more streamlined interfacing added, such as using buttons and sliders in order to change the activators of a device, instead of having to enter values.

#### Structural choices
The page is laid out in such a way that the user can easily cycle between personal information, their devices, the home servers information, and settings. Devices can also be grouped by the user, for example by what room they are in or their function (such as lights), which will help reduce complexity, as a large house or an office could have many of these devices.

#### Aesthetical choices
The design overall will be quite minimalist, with some elements such as colour taken from the Hestia logo. Aside from the main Hestia logo, the icons used are from [Material Icons database](https://material.io/icons/), which provides a large set of intuitive, user friendly icons. 


## Website Back-End
The backend of the webapp will serve as a middleman between the web frontend and the user's controller. This means that there needs to be an interface to be able to send queries to the server. Furthermore, a user database is required in order to maintain a secure environment in which users may only have permission to interact with systems they own. Unauthorized access to server data, user data, or any other sensitive information is completely forbidden.

### Design decisions
For the design of the webapp we initially chose to implement PHP since there was familiarity in the team with PHP. Thus, a concise webpage was setup using HTML and PHP. This website was designed to test querying a Hestia webserver (for instance a *GET* request). After the initial webpage was created we decided to implement the webpage in Python using Flask. There are two primary reasons for this:

1. The clients are familiar with working with both Python and Flask as they implemented Hestia using these tools.
2. It adds to consistency throughout the Hestia project.
3. Python appears to allow for rapid development with simpler deployment than PHP and Apache server.

However, we are currently unsure on whether Python and Flask will hinder scalable deployment when compared to using PHP.

Creating a custom relational database schema and authentication system, and making it secure, is very costly in both time and resources. Since these services are also available through Firebase, we have decided on using Google's Firebase platform for our database needs, as explained in the next section.

#### What is Firebase?
[Firebase](https://firebase.google.com/) is a platform that offers a rather complete backend solution. It offers an authentication service called Firebase Authentication. Users can login using passwords, phone numbers, and popular identity providers such as Google and Facebook. Furthermore, Firebase gives a realtime database.

Firebase has free and paid versions, where the free version allows up to 100 Simultaneous connections. During development of the Hestia system, this will clearly suffice. However, it has to be considered that a paid plan is going to be required once Hestia grows. Pricing is available through: *https://firebase.google.com/pricing/* 

During development it is essential to design the system in such a way that switching from Firebase to an alternative service does not incur large infrastructural cost.

### Functionality of the webapp
Currently, we have developed a server that serves as the liaison between the Hestia local controller and the user's interface. Below we show a small section of the code in Python followed by explanation.

```
@app.route('/request', methods=['POST'])
def apiRequestHandler():
    json = request.get_json()
    url = json["query"]
    method = json["method"]
    payload = None
    if ("payload" in json):
    	payload = json["payload"]
    	print(payload)
    return routeRequest(method, url, payload)
```

The front-end website will interact with this server exclusively through sending JSON objects in the payload of POST requests. These objects contain the following information.

* *query*: The endpoint that the client intends to send a request to, on the Hestia local controller.
* *method*: The method by which the user wishes to send the request.
* *payload*: The payload is an optional item in the request that when supplied, is used for requests which require additional information, such as POSTing to /devices/ to create a new device, or updating a device's name. The exact content of the payload is identical in structure to the payload that would naturally be received by the 

Every time a query is done on the webpage, the server gets a request where the */request* is being pinged. The above piece of code breaks down what the information consists of. Firstly, it gets a JSON object, where the *url* variable is set to be the URL, such that it can access either plugins or devices. Secondly, a certain method is set in the data that is being sent, such as GET, POST, PUT, or DELETE. Furthermore, depending on the method, there may be a payload, which contains the *body* of the message. For instance, for posting a new device, this would consist of a name, an ip, and a port number. Also, the corresponding plugin is required, which in this case also has to be part of the message sent from the webapp to our server. This differs from for instance a GET request, which simply requires a URL and the method.

Based on this information we have a function routeRequest, which follows up with the corresponding action, and sends the appropriate data. 
```
def routeRequest(method, query, payload):
	result = ""
	if (method == "GET"):
		result = requests.get(query, verify=False).text
	elif (method == "POST"):
		result = requests.post(query, verify=False, json=payload).text
	elif (method == "PUT"):
		result = requests.put(query, verify=False, json=payload).text
	elif (method == "DELETE"):
		result = requests.delete(query, verify=False).text
	else:
		result = "Invalid REST method."
	return result
```
Currently, the verify flag is set to `False`, as there is no secure connection to the site yet, which obviously has to be changed. What the code above does is, based on the method, it will send a package with corresponding information to the corresponding URL, and return the result of that request back to the client who originally sent the request.


## Glossary
Below are defined terms used in the architecture document:

* *Controller*: The local Hestia Server in a user's house. The controller simply runs the Hestia Server previously developed by the client, and has a unique IP address and port number.

* *Peripheral*: A peripheral is any device which can be connected to the Hestia system via a plugin. For example, a Phillips Hue light bulb would constitute a peripheral.

* *User*: A user is someone who has installed a Hestia controller in their home, and accesses the website to control their system.

* Hello world.

## Change Log

| Who           |       When | Where          | What                                                                           |
| :---          |       :--- | :---           | :---                                                                           |
| Troy Harrison | 2018-03-12 | Whole document | Created initial document.                                                      |
| Andrew Lalis  | 2018-03-12 | Whole document | Updated content for document.                                                  |
| Rens Nijman   | 2018-03-12 | Front-End      | Add structure for front-end section.                                           |
| Rens Nijman   | 2018-03-12 | Back-End       | Add structure for back-end section.                                            |
| Rens Nijman   | 2018-03-12 | Whole document | More introduction and back-end.                                                |
| Andrew Lalis  | 2018-03-12 | Glossary       | Added glossary.                                                                |
| Phil Oetinger | 2018-03-13 | Whole Document | Cleaned up the grammar, removed redundant sentences, expanded upon some points |
| Roman Bell    | 2018-03-13 | Frontend       | Added content regarding the frontend section                                   |
| Rens Nijman   | 2018-03-13 | Back-end       | Added section on our server's functionality                                    |
| Andrew Lalis  | 2018-03-13 | Back-end       | Revised a few things.                                                          |
| Troy Harrison | 2018-03-13 | Whole Document | Cleaned up document.                                                               |
