<center>
	<!-- Title image and text. -->
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
The *Hestia* Home Automation System, developed by the clients, aims to make home automation simple again. The local server infrastructure that facilitates communication and control of the various peripherals has been implemented by the clients. In addition to this local server, an Android application has been pre-made by the client and is available for reference. The local server lacks consumer side interfacing, which limits the ease of use and hinders widespread usage outside of the local network.

To create this client side interface, there are two main systems under consideration: the front-end (user interface with which the client interacts), and the back-end (which serves as a middleman between local Hestia controllers and users on the website).

This document describes in detail how both of these sub-systems work, how they interact with each other, and motivates the design choices underlying.


### Overview
Our goal for this project is to create the web interface. This web interface, which is hosted on a central server, should allow users to log in and connect their local Hestia servers. This allows users to intereact with their home automation system remotely.

A Hestia server is a *controller* that manages a set of *peripherals*. Those peripherals are the facilities to be automated. These could for instance be lights, locks, or any mumber of programmable devices. This is possible because the design created by the client is peripheral independent because the Hestia server manages that peripheral through its own corresponding plugin.

The clients have created this system using the REST API. This decoupling makes the development process less complicated; furthermore, it allows for development independent of the server. 

## General Overview of the System
The Hestia Web Interface can be divided into two main sub-systems as mentioned in the Introduction.
* Front-end user interface, with which the user interacts
* Back-end server that connects users to their local Hestia controllers and holds user and server information

## Website Front-End
Since the frontend of the website is the first aspect of the product that the customer will interact with, and will be one of the main sources of content or discontent throughout their user experience, a variety of design choices have to be made. The website will allow a user to log into their home server through a web server, and then manage the devices on their home server through a range of different controls, and do this in the knowledge that themselves and their information are being kept safe.

![Website Design](images/Hestia login concept.png  "Website Front-End Design")

### Design choices
We decided that the user should decide which home server they are connecting to upon login, which prevents the added complexity caused by switching between servers (although this could be added later on). Therefore the main focus of the website will be on the list of devices present within this server (which can be found through GET), and on the operations that can be applied to them. These will mirror those already implemented by Hestia, such as renaming or deleting a device, but more functionality added, such as using buttons and sliders in order to change the activators of a device, instead of having to enter values.
#### Structural choices
The page is laid out in such a way that the user can easily cycle between personal information, their devices, the home servers information, and settings. Devices can also be grouped by the user, for example by what room they are in or their function (such as lights), which will help reduce complexity, as a large house or an office could have very many of these devices
#### Aesthetical choices
The design overall will be quite minimalist, with some elements such as colour taken from the Hestia logo. The logos we use, besides the main Hestia logo, have been taken from the Material Icons database (https://material.io/icons/), which provides a large set of intuitive, user friendly icons. 


## Website Back-End
The backend of the webapp will serve as a middleman between the web frontend and the user's controller (local server). This means that there needs to be an interface to be able to send queries to the server. Furthermore, a user database is required in order to maintain a secure environment in which users may only have permission to interact with systems they own. Unauthorized access to server data, user data, or any other sensitive information is completely forbidden.

### Design decisions
For the design of the webapp we initially chose to implement PHP since there is familiarity in the team with PHP. Thus, a concise webpage was setup using HTML and PHP. This website was designed to test querying the Hestia webserver (for instance a *get* request). After the initial webpage was created we decided to implement the webpage in Python using Flask. Though we have less experience with Python and Flask, this decision will provide extra benefits. 

The main benefit to using Flask over PHP is that the client, having created the local server in Flask, is already familiar with the server and python. Using this same setup creates more consistency and allows for easier transition once the product is finished.

As a final remark on this topic, it is not absolutely clear yet whether PHP would be better suited for this job than Python. This is therefore an issue that requires more research and discussion with the client.

Creating a custom relational database schema and authentication system, and making it secure, is very costly in both time and resources. Since these services are also available through Firebase, we have decided on using Google's Firebase platform for our database needs, as explained in the next section.

#### What is Firebase?
[Firebase](https://firebase.google.com/) is a platform that offers a rather complete backend solution. It offers an authentication service called Firebase Authentication. Users can login using passwords, phone numbers, and popular identity providers such as Google and Facebook. Furthermore, Firebase gives a realtime database.

Firebase has free and paid versions, where the free version allows up to 100 Simultaneous connections. During development of the Hestia system, this will clearly suffice. However, it has to be considered that a paid plan is going to be required once Hestia grows. Pricing is available through: *https://firebase.google.com/pricing/* 

During development it is essential to design the system in such a way that switching from Firebase to an alternative service does not incur large infrastructural cost.

### The server as a middleman
Currently, we have developed a server that serves as the liaison between the Hestia server and the user's interface. Below we show a small ection of the code in Python.

```
@app.route('/request', methods=['POST'])
def apiRequestHandler():
    json = request.get_json()
    url = json["query"]
    method = json["method"]
    payload = json["payload"]
    return routeRequest(method, url, payload)
```

Every time a query is done on the webpage, server sees that the */request* is being pinged. The above piece of code breaks down what the information consists of. Firstly, it gets a JSON objects, where the *url* variable is set to be the URL, such that it can access either plugins or devices. Secondly, a certain method is set in the data that is being sent, such as GET, POST, PUT, or DELETE. Furthermore, depending on the method, there may be a payload, which contains the *body* of the message. For instance, for posting a new device, this would consist of a name, an ip, and a port number. Also, the corresponding plugin is required, which in this case also has to be part of the message sent from the ebapp to our server. This differs from for instance a GET request, which simply requires a URL and the method. 

Based on this information we have a function routeRequest, which follows up with the corresponding action, and sends the appropriate data.

```
def routeRequest(method, query, payload):
	switcher = {
		'GET': requests.get(query, verify=False).text,
		'POST': requests.post(query, verify=False, json=payload).text,
		'PUT': requests.put(query, verify=False, json=payload).text,
		'DELETE': requests.delete(query, verify=False).text,
	}
	return switcher.get(method, 'Invalid REST method');
```


##Glossary
Below are defined terms used in the architecture document:

* *Controller*: The local Hestia Server in a user's house. The controller simply runs the Hestia Server previously developed by the client, and has a unique IP address and port number.

* *Peripheral*: A peripheral is any device which can be connected to the Hestia system via a plugin. For example, a Phillips Hue light bulb would constitute a peripheral.

* *User*: A user is someone who has installed a Hestia controller in their home, and accesses the website to control their system.

# TO DO
Have not discussed 2m concurrent users requirement. This can be kept in consideration for development but needs further discussion with client.

## Change Log

| Who            |       When  | Where          | What                                |
| :---           |       :---  | :---           | :---                                |
| Troy Harrison  |  2018-03-12 | Whole document | Created initial document.           |
| Andrew Lalis   |  2018-03-12 | Whole document | Updated content for document.       |
| Rens Nijman    |  2018-03-12 | Front-End      | Add structure for front-end section.|
| Rens Nijman    |  2018-03-12 | Back-End       | Add structure for back-end section. |
| Rens Nijman    |  2018-03-12 | Whole document | More introduction and back-end.     |
| Andrew Lalis | 2018-03-12 | Glossary | Added glossary. |
| Phil Oetinger  |  2018-03-13 | Whole Document | Cleaned up the grammar, removed redundant sentences, expanded upon some points |
| Roman Bell     |  2018-03-13 | Frontend | Added content regarding the frontend section |
